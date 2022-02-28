import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { globals } from '../../app/global';

// used to catech 401 http unauthorized error. This happens when token has expired.
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


    constructor(

        //private loginEvent: LoginEventService,
        private authenticationService: AuthenticationService
    ) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // console.log("in interceptor",request)
        return next.handle(request)
            .pipe(catchError((err, caught) => {
                console.log(err,caught)
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        console.log("401 unauthorized", err.error)
                        // localStorage.removeItem('access_token')
                        this.authenticationService.logout();
                        location.reload()
                        return throwError(err)
                    }else{
                       // console.log(err)
                        return  throwError(err)
                    }
                }
            }));

    }
}
