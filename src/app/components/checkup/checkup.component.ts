import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ambulance } from 'src/app/model/Ambulance';
import { Checkup } from 'src/app/model/Checkup';
import { Doctor } from 'src/app/model/Doctor';
import { User } from 'src/app/model/User';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { AmbulanceService } from 'src/app/service/ambulance/ambulance.service';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { CheckupSerivce } from 'src/app/service/checkup/checkup.serivce';
import { DoctorService } from 'src/app/service/doctor/doctor.service';
import { Utils } from 'src/app/util/Utils';

@Component({
  selector: 'app-checkup',
  templateUrl: './checkup.component.html',
  styleUrls: ['./checkup.component.css']
})
export class CheckupComponent implements OnInit {

  public doctors: Doctor[];
  public ambulances: Ambulance[];

  checkupForm: FormGroup;

  private flag: boolean;

  constructor(private authenticationService: AuthenticationService, private checkupService: CheckupSerivce, private ambulanceService: AmbulanceService, private doctorService: DoctorService, private router: Router, private formBuilder: FormBuilder) { 
    sessionStorage.setItem("page", "checkup");

    this.checkupForm = formBuilder.group({
      ambulance: new FormControl('', Validators.required),
      doctor: new FormControl('', Validators.required)
    });

    this.flag = false;
  }

  ngOnInit(): void {
    if(!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.doctorService.getDoctors().subscribe({
      next: (response: HttpResponse) => {
        this.doctors = response.data.values as Doctor[];
        this.setDoctorDefault();
      },
      error: (error) => {
        alert(error.error);
      }
    });

    this.ambulanceService.getAmbulances().subscribe({
      next: (response: HttpResponse) => {
        this.ambulances = response.data.values as Ambulance[];
        this.setAmbulanceDefault();
      },
      error: (error) => {
        alert(error.error);
      }
    });
  }

  public createCheckup() {
    if(!this.flag) {
      let ambulanceId = this.checkupForm.get('ambulance')!.value as number;
      let doctorId = this.checkupForm.get('doctor')!.value as number;

      let doctor = new Doctor();
      doctor.id = doctorId;

      let ambulance = new Ambulance();
      ambulance.id = ambulanceId;

      let checkup = new Checkup();

      let user = new User();
      user.id = Number(this.authenticationService.getUserId());

      checkup.userDto = user;
      checkup.ambulanceDto = ambulance;
      checkup.doctorDto = doctor;

      this.flag = true;

      this.checkupService.createCheckup(checkup).subscribe({
        next: (response: HttpResponse) => {
          alert(response.message);
          this.router.navigate(['/home']);
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

  private setAmbulanceDefault() {
    this.checkupForm.patchValue({
      ambulance: this.ambulances[0].id
    });
  }

  private setDoctorDefault() {
    this.checkupForm.patchValue({
      doctor: this.doctors[0].id
    });
  }
}
