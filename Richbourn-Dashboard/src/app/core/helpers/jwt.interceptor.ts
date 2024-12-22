import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { LoginService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private authfackservice: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (environment.defaultauth === 'firebase') {
            const currentUser = this.authenticationService.currentUser();
            if (currentUser && currentUser.accessToken) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.accessToken}`
                    }
                });
            }
        } else {
            // add authorization header with jwt token if available
            const currentUser = this.authfackservice.currentUserValue;
            if (currentUser && currentUser.accessToken) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.accessToken}`,
                        application: `${localStorage.getItem("app_name")}`,
                        
                    }
                });
            }
        }
        return next.handle(request);
    }
}
