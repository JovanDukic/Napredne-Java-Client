import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AmbulanceService } from './service/ambulance/ambulance.service';
import { UserService } from './service/user/user.service';
import { CountryService } from './service/country/country.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from './service/doctor/doctor.service';
import { AuthenticationService } from './service/authentication/authentication.service';
import { HomeComponent } from './components/home/home.component';
import { CheckupComponent } from './components/checkup/checkup.component';
import { TestComponent } from './components/test/test.component';
import { CovidTestsComponent } from './components/covid-tests/covid-tests.component';
import { CheckupSerivce } from './service/checkup/checkup.serivce';
import { CovidTestService } from './service/covidTest/covidTest.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AmdinComponent } from './components/amdin/amdin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CheckupComponent,
    TestComponent,
    CovidTestsComponent,
    ProfileComponent,
    AmdinComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AmbulanceService, UserService, CountryService, DoctorService, CheckupSerivce, CovidTestService, AuthenticationService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
