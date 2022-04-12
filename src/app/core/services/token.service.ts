import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";
import { LoggedUserModel, UserCallBackLogin } from "../../pages/login/models/login.model";

const TOKEN_NAME = "token";

@Injectable()
export class TokenService {

    private readonly jwtHelper = new JwtHelperService();

    private readonly isLoggedInBs = new BehaviorSubject(!!this.token);

    LoggedIn$ = this.isLoggedInBs.asObservable();

    public setUserSeassion(userCallBackLogin: UserCallBackLogin) {
        localStorage.setItem('token', String(userCallBackLogin.token));
        this.userLogged(true);
    }

    userLogged(isLogged: boolean){
        this.isLoggedInBs.next(isLogged);
    }

    get tokenData(): LoggedUserModel {
        return this.jwtHelper.decodeToken(this.token || undefined);
    }

    get token(): string | null {
        return localStorage.getItem(TOKEN_NAME);
    }

    public logout() {
        localStorage.clear();
        this.userLogged(false);
    }

    public isAdmin(): boolean {
        return this.tokenData.isAdmin;
    }

    public isLoggedIn(): boolean {
        return !!this.token;
    }

}
