import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ambulance } from 'src/app/model/Ambulance';
import { environment } from 'src/environments/environment';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
  })
  export class AmbulanceService {
  
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
  
    public getAmbulances(): Observable<HttpResponse> {
      return this.http.get<HttpResponse>(environment.backendServerUrl + "/ambulance/all", {headers: this.authenticationService.generateAuthorizationHeader()});
    }
  
}