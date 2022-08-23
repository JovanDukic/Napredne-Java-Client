import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Checkup } from 'src/app/model/Checkup';
import { CovidTest } from 'src/app/model/CovidTest';
import { HttpResponse } from 'src/app/network/HttpResponse';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { CovidTestService } from 'src/app/service/covidTest/covidTest.service';
import { Utils } from 'src/app/util/Utils';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  testForm: FormGroup;

  checkupId: string;

  private flag: boolean;

  public radioSelected = "PCR";

  constructor(private authenticationService: AuthenticationService, private covidTestService: CovidTestService, private router: Router, private formBuilder: FormBuilder) { 
    sessionStorage.setItem("page", "test");

    this.checkupId = sessionStorage.getItem("checkupId");

    this.testForm = formBuilder.group({
      testType: new FormControl('', Validators.required),
    });

    this.flag = false;
  }

  ngOnInit(): void {
    if(!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  public createCovidTest() {
    if(!this.flag) {
      let testType = this.testForm.get('testType')!.value;

      let covidTest = new CovidTest();
      covidTest.testType = testType;

      let checkup = new Checkup();
      checkup.id = Number(this.checkupId);

      covidTest.checkupDto = checkup;

      this.flag = true;

      this.covidTestService.createCovidTest(covidTest).subscribe({
        next: (response: HttpResponse) => {
          alert(response.message);
          this.router.navigate(['/covidTests']);
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

}
