import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserWithTokenModel } from "../models/login.model";

const TOKEN_NAME = "userToken";

@Injectable()
export class AuthService {

    constructor(private router: Router) { }

    // private jwtHelper = new JwtHelperService();

    // get tokenDataDecoded(): UserWithTokenModel {
    //     return this.jwtHelper.decodeToken(this.token || undefined);
    // }

    // get token(): string | null {
    //     return localStorage.getItem(TOKEN_NAME);
    // }

    // public setToken(token: string) {
    //     localStorage.setItem(TOKEN_NAME, token);
    // }

    // public cleanToken() {
    //     localStorage.clear();
    // }

    public userLoggedIn(): boolean {
        // if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
        //     return true;
        // }
        // return false;
        return true;
    }

    // public logout() {
    //     this.cleanToken();
    //     this.router.navigate(['login']);
    // }

}
