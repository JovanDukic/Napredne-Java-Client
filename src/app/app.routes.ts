import { Routes } from '@angular/router';
import { AmdinComponent } from './components/amdin/amdin.component';
import { CheckupComponent } from './components/checkup/checkup.component';
import { CovidTestsComponent } from './components/covid-tests/covid-tests.component';
import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TestComponent } from './components/test/test.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent},
    { path: 'checkup', component: CheckupComponent},
    { path: 'covidTests', component: CovidTestsComponent},
    { path: 'test', component: TestComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'admin', component: AmdinComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];