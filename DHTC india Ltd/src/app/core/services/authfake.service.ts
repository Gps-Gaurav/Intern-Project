import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth.models';
import { ResponseData } from '../models/responsedata.model';
import { MenuItem } from 'src/app/layouts/sidebar/menu.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
    private currentUserSubject: BehaviorSubject<User>;
    private currentMenuSubject: BehaviorSubject<MenuItem[]>;
    public currentUser: Observable<User>;
    private readonly APIUrl = environment.APIUrl;
    name: any;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentMenuSubject=new BehaviorSubject<MenuItem[]>(null)
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public get currentRoleValue(): MenuItem[] {
        return this.currentMenuSubject.value;
    }
    login(email: string, password: string) {
        return this.http.post<ResponseData<any>>(this.APIUrl+'token', { username:email, password:password })
            .pipe(map(user => {
               
                // login successful if there's a jwt token in the response
                if (user && user.document) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.document));
                    this.currentUserSubject.next(user.document);
                    this.GetMenubyrole(this.GetRolebyToken())
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    GetRolebyToken() {
        let _token = this.currentUserValue.accessToken.split('.')[1];
        let tokenresp = JSON.parse(atob(_token))
        return tokenresp.role;
      }
      GetNamebyToken() {
        let _token = this.currentUserValue.accessToken.split('.')[1];
        let tokenresp = JSON.parse(atob(_token))
        return tokenresp.name;
      }
      GetMenubyrole(role: string) {
        return this.http.post<ResponseData<MenuItem[]>>(this.APIUrl+'SP/sp_app_get_menurole?RoleId='+role, { RoleId:role})
            .pipe(map(user => {
               
                // login successful if there's a jwt token in the response
                if (user && user.document) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.currentMenuSubject.next(user.document)
                }
                return user;
            }));
    }
}
