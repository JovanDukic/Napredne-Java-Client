import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Checkup } from 'src/app/model/Checkup';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { SearchRequest } from 'src/app/network/SearchRequest';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { CheckupSerivce } from 'src/app/service/checkup/checkup.serivce';
import { Utils } from 'src/app/util/Utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public checkups!: Checkup[];

  public pipe = new DatePipe('en-US');

  public searchField: FormControl;
  public searchType: FormControl;

  constructor(private checkupSerivce: CheckupSerivce, public authenticationService: AuthenticationService, private router: Router) {
    if(!this.authenticationService.isAdmin()) {
      sessionStorage.setItem("page", "home");
    }
    

    this.searchField = new FormControl("");
    this.searchType = new FormControl("Doctor");
  }

  ngOnInit(): void {
    if(!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  public moveToCovidTestPage(checkup: Checkup) {
    sessionStorage.setItem("checkupId", String(checkup.id));
    this.router.navigate(['/covidTests']);
  }

  public search() {
    let pattern = this.searchField!.value;
    let searchType = this.searchType!.value;

    let searchRequest = new SearchRequest();

    searchRequest.recordId = Number(this.authenticationService.getUserId());
    searchRequest.pattern = pattern;
    searchRequest.searchType = searchType;

    this.checkupSerivce.checkupSearch(searchRequest).subscribe({
      next: (response: HttpResponse) => {
        this.checkups = response.data.values as Checkup[];
      },
      error: (error: HttpErrorResponse) => {
        let httpResponse = error.error as HttpResponse;
        
        if(httpResponse === null) {
          alert(error.message);
        } else {
          Utils.printErrorMessage(error.error as HttpResponse);
        }
      }
    });
  }

  public deleteCheckup(checkup: Checkup, event) {
    event.stopPropagation();

    var dialog = confirm("Are you sure you want to delete checkup " + checkup.id + " ?");
    if (dialog) {
      this.sendDeleteRequest(checkup);
    }
  }

  private loadData() {
    this.checkupSerivce.getCheckupsByUser(this.authenticationService.getUserId()).subscribe({
      next: (response: HttpResponse) => {
        this.checkups = response.data.values as Checkup[];
      },
      error: (error: HttpErrorResponse) => {
        let httpResponse = error.error as HttpResponse;
        
        if(httpResponse === null) {
          alert(error.message);
        } else {
          Utils.printErrorMessage(error.error as HttpResponse);
        }
      }
    });
  }

  private sendDeleteRequest(checkup: Checkup) {
    this.checkupSerivce.deleteCheckup(checkup).subscribe({
      next: (response: HttpResponse) => {
        this.loadData();
        alert(response.message);
      },
      error: (error: HttpErrorResponse) => {
        let httpResponse = error.error as HttpResponse;
        
        if(httpResponse === null) {
          alert(error.message);
        } else {
          Utils.printErrorMessage(error.error as HttpResponse);
        }
      }
    });
  }

}
