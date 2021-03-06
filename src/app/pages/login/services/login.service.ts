import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { TokenService } from "src/app/core/services/token.service";
import { LoginModel, NewUserModel, UserCallBackLogin } from "../models/login.model";
import { BaseService } from "../../../core/services/base.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService {

    constructor(private http: HttpClient, private tokenService: TokenService) {
        super();
    }

    public addUser(model: NewUserModel): Observable<NewUserModel> {
        return this.http.post<NewUserModel>(this.urlAuthApiBack + 'users', model)
            .pipe(
                catchError(error => throwError(error))
            );
    }

    public newUser(model: NewUserModel): Observable<NewUserModel> {
        return this.http.post<NewUserModel>(this.urlAuthApiBack + 'users', model)
            .pipe(
                tap(() => this.login({ email: model.email, password: model.password }).subscribe()),
                catchError(error => throwError(error))
            )
    }

    public login(model: LoginModel): Observable<UserCallBackLogin> {
        return this.http.post<UserCallBackLogin>(this.urlAuthApiBack + 'authentication/login', model)
            .pipe(
                tap(user => { this.tokenService.setUserSeassion(user) })
            )
    }
}
