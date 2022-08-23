import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/model/Country';
import { User } from 'src/app/model/User';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { CountryService } from 'src/app/service/country/country.service';
import { UserService } from 'src/app/service/user/user.service';
import { Utils } from 'src/app/util/Utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;

  user: User;

  countries: Country[];

  private userId: String;

  private flag: boolean;

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private countryService: CountryService, private router: Router, private formBuilder: FormBuilder) { 
    sessionStorage.setItem("page", "profile");

    this.userId = this.authenticationService.getUserId();

    this.flag = false;

    this.profileForm = formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
  });
  }

  ngOnInit(): void {
    if(!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.countryService.getCountries().subscribe({
      next: (response: HttpResponse) => {
        this.countries = response.data.values as Country[];
      },
      error: (error) => {
        alert(error.error);
      }
    });

    this.userService.getUserById(this.userId).subscribe({
      next: (response: HttpResponse) => {
        this.user = response.data.value as User;
        this.setData();
        alert(response.message);
      },
      error: (error) => {
        let httpResponse = error.error as HttpResponse;
        
        if(httpResponse === null) {
          alert(error.message);
        } else {
          Utils.printErrorMessage(error.error as HttpResponse);
        }
      }
    });
  }

  public updateUserData() {
    if(!this.flag) {
      if(Utils.checkInput(this.profileForm)) {
        return;
      }

      this.user.firstName = this.profileForm.get('firstName')!.value;
      this.user.lastName = this.profileForm.get('lastName')!.value;
      this.user.email = this.profileForm.get('email')!.value;
      this.user.phone = this.profileForm.get('phone')!.value;
      this.user.gender = this.profileForm.get('gender')!.value;
      this.user.age = this.profileForm.get('age')!.value;
      
      let countryId = this.profileForm.get('country')!.value as number;

      let country = new Country();
      country.id = countryId;

      this.user.countryDto = country;

      this.flag = true;

      this.userService.updateUser(this.user).subscribe({
        next: (response: HttpResponse) => {
          alert(response.message);
          this.flag = false;
        },
        error: (error) => {
          let httpResponse = error.error as HttpResponse;
          
          if(httpResponse === null) {
            alert(error.message);
          } else {
            Utils.printErrorMessage(error.error as HttpResponse);
          }

          this.flag = false;
        }
      });
    }
  }

  private setData() {
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      age: this.user.age,
      email: this.user.email,
      phone: this.user.phone,
      gender: this.user.gender,
      country: this.user.countryDto.id
    });
  }

}
