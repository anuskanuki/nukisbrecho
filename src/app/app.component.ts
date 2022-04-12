import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenService } from './core/services/token.service';
import { LoggedUserModel } from './pages/login/models/login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  isCollapsed = true;
  isLoggedIn = false;
  userData?: LoggedUserModel;

  constructor(
    private router: Router,
    private authService: TokenService,
  ) {
    // this.acessaSistema();
    this.getUserLogedIn();

    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isCollapsed = true;
      }
    });
  }

  // public acessaSistema() {
  //   this.router.events.subscribe(rota => {
  //     if (rota instanceof NavigationEnd) {
  //       if (!rota.url.includes('login') && !this.userIsLoggedIn()) {
  //         this.isLoggedIn = true;
  //       } else {
  //         this.isLoggedIn = false;
  //       }
  //     }
  //   });
  // }

  public getUserLogedIn() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userData = this.authService.tokenData;
      console.log(this.userData);
    } else {
      this.isLoggedIn = false;
    }
    this.goToHome();
  }

  userIsLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.clear();
    this.getUserLogedIn();
  }

  goToHome() {
    this.router.navigateByUrl('welcome');
  }

}
