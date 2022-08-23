import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { RegisterRequest } from 'src/app/network/RegisterRequest';
import { LoginRequest } from 'src/app/network/LoginRequest';
import { AuthenticationResponse } from 'src/app/network/AuthenticationResponse';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {

    constructor(private http: HttpClient) { }
  
    public register(registerRequest: RegisterRequest): Observable<HttpResponse> {
      return this.http.post<HttpResponse>(environment.backendServerUrl + "/authentication/register", registerRequest);
    }

    public login(loginRequest: LoginRequest): Observable<HttpResponse> {
        return this.http.post<HttpResponse>(environment.backendServerUrl + "/authentication/login", loginRequest);
    }

    public setSessionData(httpResponse: HttpResponse) {
        let authenticationResponse = httpResponse.data.value as AuthenticationResponse;
        sessionStorage.setItem("authorizationToken", authenticationResponse.authorizationToken);
        sessionStorage.setItem("admin", String(authenticationResponse.admin));
        sessionStorage.setItem("userId", String(authenticationResponse.userId));
    }

    public isAdmin(): boolean {
        return sessionStorage.getItem("admin") == "true";
    }

    public getUserId(): string {
        return sessionStorage.getItem("userId");
    }

    public generateAuthorizationHeader(): HttpHeaders {
        return new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem("authorizationToken"));
    }

    public logOut() {
        sessionStorage.clear();
    }

    public isLoggedIn(): boolean {
        return this.getUserId() !== null;
    }

    public getPage(): string {
        return sessionStorage.getItem("page");
    }
   
}