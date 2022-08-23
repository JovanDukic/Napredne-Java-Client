import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CovidTest } from 'src/app/model/CovidTest';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { SearchRequest } from 'src/app/network/SearchRequest';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { CovidTestService } from 'src/app/service/covidTest/covidTest.service';
import { Utils } from 'src/app/util/Utils';

@Component({
  selector: 'app-covid-tests',
  templateUrl: './covid-tests.component.html',
  styleUrls: ['./covid-tests.component.css']
})
export class CovidTestsComponent implements OnInit {

  private checkupId: string;

  public covidTests: CovidTest[];

  public pipe = new DatePipe('en-US');

  public searchField: FormControl;
  public searchType: FormControl;

  constructor(public authenticationService: AuthenticationService, private covidTestService: CovidTestService, private router: Router) {
    if(!this.authenticationService.isAdmin()) {
      sessionStorage.setItem("page", "covidTests");
    }

    this.checkupId = sessionStorage.getItem("checkupId");

    this.searchField = new FormControl("");
    this.searchType = new FormControl("Test type");
  }

  ngOnInit(): void {
    if(!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  public search() {
    let pattern = this.searchField!.value;
    let searchType = this.searchType!.value;

    let searchRequest = new SearchRequest();

    searchRequest.recordId = Number(sessionStorage.getItem("checkupId"));
    searchRequest.pattern = pattern;
    searchRequest.searchType = searchType;

    this.covidTestService.covidTestSearch(searchRequest).subscribe({
      next: (response: HttpResponse) => {
        this.covidTests = response.data.values as CovidTest[];
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

  public deleteCovidTest(covidTest: CovidTest, event) {
    event.stopPropagation();

    var dialog = confirm("Are you sure you want to delete covid test " + covidTest.id + " ?");
    if (dialog) {
      this.sendDeleteRequest(covidTest);
    }
  }

  private loadData() {
    this.covidTestService.getCovidTestByCheckup(this.checkupId).subscribe({
      next: (response: HttpResponse) => {
        this.covidTests = response.data.values as CovidTest[];
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

  private sendDeleteRequest(covidTest: CovidTest) {
    this.covidTestService.deleteCovidTest(covidTest).subscribe({
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
