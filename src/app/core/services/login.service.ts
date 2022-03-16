import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { UserModel } from "src/app/pages/user/models/user.model";
import { AccessTokenModel, LoginModel } from "../models/login.model";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    public newUser(model: LoginModel): Observable<AccessTokenModel> {
        return this.http.post(this.UrlApiV1 + 'users', model, super.httpJsonOptions)
            .pipe(
                map(super.extractData),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    public getUserTryingToLogIn(email: string): Observable<UserModel> {
        return this.http.get(this.UrlApiV1 + 'users?email=' + email)
            .pipe(
                map(user => this.getFirstUser(user)),
                catchError(error => throwError(error.error.errors[0]))
            );
    }

    private getFirstUser(user: any) {
        if (Array.isArray(user)) {
            return user[0];
        }
        return user;
    }

}
