import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";

export class AuthGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(route);
        console.log(state);
        console.log(route.data);
        return true;
    }

}