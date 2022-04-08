import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoggedUserModel, UserCallBackLogin } from "../models/login.model";

const TOKEN_NAME = "token";

@Injectable()
export class TokenService {

    private readonly jwtHelper = new JwtHelperService();

    constructor(private readonly router: Router) { }

    public setUserSeassion(userCallBackLogin: UserCallBackLogin) {
        localStorage.setItem('token', String(userCallBackLogin.token));
    }

    get tokenData(): LoggedUserModel {
        return this.jwtHelper.decodeToken(this.token || undefined);
    }

    get token(): string | null {
        return localStorage.getItem(TOKEN_NAME);
    }

    public clear() {
        localStorage.removeItem(TOKEN_NAME);
    }

    public logout() {
        this.router.navigateByUrl('/login');
        localStorage.clear();
    }

    public isAdmin(): boolean {
        return this.tokenData.isAdmin;
    }
}