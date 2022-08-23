import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { SearchRequest } from 'src/app/network/SearchRequest';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { UserService } from 'src/app/service/user/user.service';
import { Utils } from 'src/app/util/Utils';

@Component({
  selector: 'app-amdin',
  templateUrl: './amdin.component.html',
  styleUrls: ['./amdin.component.css']
})
export class AmdinComponent implements OnInit {

  public users: User[];

  public searchField: FormControl;
  public searchType: FormControl;

  constructor(private userService: UserService, public authenticationService: AuthenticationService, private router: Router) { 
    sessionStorage.setItem("page", "admin");

    this.searchField = new FormControl("");
    this.searchType = new FormControl("USERNAME");
  }

  ngOnInit(): void {
    if(!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadData();
  }

  public moveToCheckupsPage(user: User) {
    sessionStorage.setItem("userId", String(user.id));
    this.router.navigate(['/home']);
  }

  public search() {
    let pattern = this.searchField!.value;
    let searchType = this.searchType!.value;

    let searchRequest = new SearchRequest();

    searchRequest.recordId = Number(this.authenticationService.getUserId());
    searchRequest.pattern = pattern;
    searchRequest.searchType = searchType;

    this.userService.userSearch(searchRequest).subscribe({
      next: (response: HttpResponse) => {
        this.users = response.data.values as User[];
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

  public deleteUser(user: User, event) {
    event.stopPropagation();

    var dialog = confirm("Are you sure you want to delete user " + user.username + " ?");
    if (dialog) {
      this.sendDeleteRequest(user);
    }
  }

  private loadData() {
    this.userService.getAllUsers().subscribe({
      next: (response: HttpResponse) => {
        this.users = response.data.values as User[];
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

  private sendDeleteRequest(user: User) {
    this.userService.deleteUser(user).subscribe({
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
