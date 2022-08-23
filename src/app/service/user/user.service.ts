import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { SearchRequest } from 'src/app/network/SearchRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public getAllUsers(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(environment.backendServerUrl + "/user/all" , {headers: this.authenticationService.generateAuthorizationHeader()});
  }

  public getUserById(userId: String): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(environment.backendServerUrl + "/user/" + userId, {headers: this.authenticationService.generateAuthorizationHeader()});
  }

  public updateUser(user: User): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(environment.backendServerUrl + "/user/update", user, {headers: this.authenticationService.generateAuthorizationHeader()});
  }

  public userSearch(searchRequest: SearchRequest): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(environment.backendServerUrl + "/user/search", searchRequest, {headers: this.authenticationService.generateAuthorizationHeader()});
  }

  public deleteUser(userDto: User): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(environment.backendServerUrl + "/user/delete", userDto, {headers: this.authenticationService.generateAuthorizationHeader()});
  }

}
