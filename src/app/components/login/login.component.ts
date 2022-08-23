import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { LoginRequest } from 'src/app/network/LoginRequest';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { Utils } from 'src/app/util/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  private loginRequest: LoginRequest;

  private flag: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    sessionStorage.setItem("page", "login");

    this.loginForm = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.loginRequest = new LoginRequest();

    this.flag = false;
  }

  ngOnInit(): void { }

  login() {
    if(!this.flag) {
      if(Utils.checkInput(this.loginForm)) {
        return;
      }

      this.loginRequest.username = this.loginForm.get('username')!.value;
      this.loginRequest.password = this.loginForm.get('password')!.value;

      this.flag = true;

      this.authenticationService.login(this.loginRequest).subscribe({
        next: (response: HttpResponse) => {
          Utils.printMessage(response);
          this.authenticationService.setSessionData(response);
          this.flag = false;

          if(this.authenticationService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (error: HttpErrorResponse) => {
          Utils.printErrorMessage(error.error as HttpResponse);
          this.flag = false;
        }
      })
    }
  }

}
