import { Component, OnInit, ApplicationRef } from '@angular/core';
import { globals } from "../global"
import { HttpClient } from "@angular/common/http";
import { MessageService } from 'primeng/components/common/api';

import { AllowedValues } from '../helpers/AllowedValues';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../helpers/authentication.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  doLogin() {
    if (this.username && this.password && this.username.trim()!== "" && this.password.trim() !== "" ) {
      this.submitted = true
      this.loading = true;
      this.authenticationService.login(this.username, this.password)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = error;
            this.loading = false;
            this.messageService.add({ "severity": "error", "summary": error.error })
          });
    } else {
      this.messageService.add({ "severity": "error", "summary": "Username and password required!" })
    }

  }

  constructor(private route: ActivatedRoute,
    private router: Router, private messageService: MessageService,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

}
