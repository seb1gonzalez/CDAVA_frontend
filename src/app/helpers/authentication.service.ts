import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { globals } from '../global';
import { UserStore } from './user.store';
import { Router } from '@angular/router';

//http://jasonwatmore.com/post/2019/08/06/angular-8-role-based-authorization-tutorial-with-example#authentication-service-ts
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserStore>;
    public currentUser: Observable<UserStore>;

    constructor(private http: HttpClient, private router: Router,) {

        this.currentUserSubject = new BehaviorSubject<UserStore>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

    }

    public get currentUserValue(): UserStore {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': "Bearer "+localStorage.getItem("access_token")
      });

          const httpOptions = {
            headers: headers_object
          };
        console.log("Login called", username, `${globals.restApiURL}${globals.restLogin}`)
         return this.http.post<UserStore>(`https://${globals.restApiURL}${globals.restLogin}`, {"username": username,"password": password },httpOptions)
            .pipe(map(user => {
              console.log(user)
                // login successful if there's a jwt token in the response
                if (user && user.jwt_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    localStorage.setItem("access_token",user.jwt_token) // read by the jwt_helper service to add Auth key to all requests

                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {

      var headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': "Bearer "+localStorage.getItem("access_token")
      });

          const httpOptions = {
            headers: headers_object
          };
        // remove user from local storage to log user out
        this.http.get(`https://${globals.restApiURL}${globals.restLogout}`,httpOptions).subscribe(res => {
            console.log("Rest logout sucesss")
            // this.loginEvent.successfulLogin(false)
            localStorage.removeItem('currentUser');
            localStorage.removeItem("access_token")
            this.currentUserSubject.next(null);
            this.router.navigate(['/login']);
        },
            err => {
                console.log(err)
                localStorage.removeItem('currentUser');
                localStorage.removeItem("access_token")
                console.log("Error logging out")
                this.router.navigate(['/login']);
                //this.toast("Contact Administrator", "person@email.com") // Send contact nome and email to global.ts
                //this.messageService.add({ "severity": "error", "summary": JSON.stringify(err) });
            })

    }
}
