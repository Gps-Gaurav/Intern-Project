import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth.models';
import { ResponseData, ResponseToken } from '../models/responsedata.model';
import { MenuItem } from 'src/app/layouts/sidebar/menu.model';
import { RequestModel } from '../models/request.model';
import { MENU } from 'src/app/layouts/sidebar/menu';

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
        return this.http.post<ResponseToken<any>>(this.APIUrl+'token', { username:email, password:password })
            .pipe(map(user => {
               
                // login successful if there's a jwt token in the response
                if (user && user.document) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.document));
                    localStorage.setItem('currentYear', this.getSingleCurrentFinancialYear());
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
    getSingleCurrentFinancialYear() {
        const thisYear = (new Date()).getFullYear();
        const yearArray = [0].map((count) => `${thisYear - count}-${(thisYear - count - 1).toString().slice(-2)}`);
        console.log(yearArray);
        return yearArray.join();
      }
    GetRolebyToken() {
        let _token = this.currentUserValue.accessToken.split('.')[1];
        let tokenresp = JSON.parse(atob(_token));
        console.log("token",tokenresp)
        return tokenresp.role;
      }
      GetUserIdbyToken() {
        let _token = this.currentUserValue.accessToken.split('.')[1];
        let tokenresp = JSON.parse(atob(_token))
        return tokenresp.nameid;
      }
      GetCompanybyToken() {
        let _token = this.currentUserValue.accessToken.split('.')[1];
        let tokenresp = JSON.parse(atob(_token))
        return tokenresp.unique_name;
      }
      GetMenubyrole(role: string) {
        let requestModel = <RequestModel>{};
        requestModel.spName="sp_app_get_menurole";
        let menu:MenuItem[]=[];
        return this.http.post<ResponseData<any>>(this.APIUrl+'Data/GetAllData',requestModel)
            .pipe(map(user => {
               
             JSON.parse(user.items).forEach(element => {
                menu.push(element);
             });
                // login successful if there's a jwt token in the response
                if (user && user.items) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.currentMenuSubject.next(menu)
                }
                return user;
            }));
    }
}
