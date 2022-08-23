import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css']
})
export class AppComponent {
  title = 'Coivd-19 App';

  constructor(public authenticationService: AuthenticationService) { }

  logout() {
    this.authenticationService.logOut();
  }

}
