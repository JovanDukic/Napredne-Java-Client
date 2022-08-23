import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from 'src/app/network/HttpResponse';

@Injectable({
    providedIn: 'root'
  })
  export class CountryService {

    constructor(private http: HttpClient) { }
  
    public getCountries(): Observable<HttpResponse> {
      return this.http.get<HttpResponse>(environment.backendServerUrl + "/country/all");
    }
  
}