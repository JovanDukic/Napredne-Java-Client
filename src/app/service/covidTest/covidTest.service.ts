import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { AuthenticationService } from '../authentication/authentication.service';
import { CovidTest } from 'src/app/model/CovidTest';
import { SearchRequest } from 'src/app/network/SearchRequest';

@Injectable({
  providedIn: 'root'
})
export class CovidTestService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public createCovidTest(covidTest: CovidTest): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(environment.backendServerUrl + "/covidTest/create", covidTest, {headers: this.authenticationService.generateAuthorizationHeader()});
  }

  public getCovidTestByCheckup(checkupId: string): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(environment.backendServerUrl + "/covidTest/checkup/" + checkupId, {headers: this.authenticationService.generateAuthorizationHeader()});
  }

  public covidTestSearch(searchRequest: SearchRequest): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(environment.backendServerUrl + "/covidTest/search", searchRequest, {headers: this.authenticationService.generateAuthorizationHeader()});
  }

  public deleteCovidTest(covidTestDto: CovidTest): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(environment.backendServerUrl + "/covidTest/delete", covidTestDto, {headers: this.authenticationService.generateAuthorizationHeader()});
  }

}