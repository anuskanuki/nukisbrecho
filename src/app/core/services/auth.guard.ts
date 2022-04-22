import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { TokenService } from "./token.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private tokenService: TokenService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (this.tokenService.isLoggedIn()) {

            const routeAdminOnly = route.data.adminOnly || route.children.map(child => child.data.adminOnly)[0];

            if (routeAdminOnly) {
                return this.tokenService.isAdmin() ? true : false;
            }

            return true;
        }
        return false;
    }

}
