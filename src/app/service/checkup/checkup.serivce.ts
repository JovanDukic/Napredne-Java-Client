import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { AuthenticationService } from '../authentication/authentication.service';
import { Checkup } from 'src/app/model/Checkup';
import { SearchRequest } from 'src/app/network/SearchRequest';

@Injectable({
    providedIn: 'root'
  })
export class CheckupSerivce {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    public getCheckupsByUser(userId: string): Observable<HttpResponse> {
        return this.http.get<HttpResponse>(environment.backendServerUrl + "/checkup/user/" + userId, {headers: this.authenticationService.generateAuthorizationHeader()});
    }

    public createCheckup(checkup: Checkup): Observable<HttpResponse> {
        return this.http.post<HttpResponse>(environment.backendServerUrl + "/checkup/create", checkup, {headers: this.authenticationService.generateAuthorizationHeader()});
    }

    public checkupSearch(searchRequest: SearchRequest): Observable<HttpResponse> {
        return this.http.post<HttpResponse>(environment.backendServerUrl + "/checkup/search", searchRequest, {headers: this.authenticationService.generateAuthorizationHeader()});
    }

    public deleteCheckup(checkupDto: Checkup): Observable<HttpResponse> {
        return this.http.post<HttpResponse>(environment.backendServerUrl + "/checkup/delete", checkupDto, {headers: this.authenticationService.generateAuthorizationHeader()});
      }
  
}