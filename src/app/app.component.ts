import { Component, ApplicationRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStore } from './helpers/user.store';
import { AuthenticationService } from './helpers/authentication.service';
import { Router } from '@angular/router';
import "reflect-metadata"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TXDOT Crash Data Entry Application';
  currentUser: UserStore
  // location: Location;
  // items: MenuItem[];
  // activeItem: MenuItem;
  expired: boolean = true;
  token: string;
  tokenChecker() {
    this.token = localStorage.getItem('access_token');
    //console.log(this.token)

    if (this.token) {

      const helper = new JwtHelperService();
      this.expired = helper.isTokenExpired(this.token)
      //console.log(this.token,this.expired)
    }
  }
  onLoginChange(login: boolean) {

    this.tokenChecker()
  }
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {


  }
  get isAdmin() {
    return this.currentUser && this.currentUser.group === "admin";
  }

  logout() {
    this.authenticationService.logout();
    console.log("logout called")
    this.router.navigate(['/login']);
  }

}
