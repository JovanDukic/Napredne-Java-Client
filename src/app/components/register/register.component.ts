import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/model/Country';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { CountryService } from 'src/app/service/country/country.service';
import { RegisterRequest } from 'src/app/network/RegisterRequest';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { Utils } from 'src/app/util/Utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../styles.css']
})
export class RegisterComponent implements OnInit {

  public countries!: Country[];

  registerForm: FormGroup;

  private registerRequest!: RegisterRequest;

  private flag: boolean;

  constructor(private countryService: CountryService, private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    sessionStorage.setItem("page", "register");

    this.registerForm = formBuilder.group({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
    });

    this.registerRequest = new RegisterRequest();

    this.flag = false;
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (response: HttpResponse) => {
        this.countries = response.data.values as Country[];
        this.setComboBoxes();
      },
      error: (error) => {
        alert(error.error);
      }
    });
  }

  register() {
    if(!this.flag) {
      if(Utils.checkInput(this.registerForm)) {
        return;
      }

      this.registerRequest.firstName = this.registerForm.get('firstName')!.value;
      this.registerRequest.lastName = this.registerForm.get('lastName')!.value;
      this.registerRequest.username = this.registerForm.get('username')!.value;
      this.registerRequest.password = this.registerForm.get('password')!.value;
      this.registerRequest.email = this.registerForm.get('email')!.value;
      this.registerRequest.phone = this.registerForm.get('phone')!.value;
      this.registerRequest.gender = this.registerForm.get('gender')!.value;
      this.registerRequest.age = this.registerForm.get('age')!.value;
      
      let countryId = this.registerForm.get('country')!.value as number;
  
      let country = new Country();
      country.id = countryId;

      this.registerRequest.countryDto = country;

      this.flag = true;
  
      this.authenticationService.register(this.registerRequest).subscribe({
        next: (response: HttpResponse) => {
          Utils.printMessage(response);
          this.flag = false;
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          Utils.printErrorMessage(error.error as HttpResponse);
          this.flag = false;
        }
      });
    }
  }

  private setComboBoxes() {
    this.registerForm.patchValue({
      gender: "male",
      country: this.countries[0].id
    });
  }

}
