import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/model/Doctor';
import { environment } from 'src/environments/environment';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public getDoctors(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(environment.backendServerUrl + "/doctor/all", {headers: this.authenticationService.generateAuthorizationHeader()});
  }

}