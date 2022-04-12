import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  showLayout = true;

  constructor(
    private router: Router,
    private authService: TokenService,
  ) {

     authService.LoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.userData = this.authService.tokenData;
     });

    router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.showLayout = (e.url === "/login") ? false : true;
      }

      if (e instanceof NavigationEnd) {
        this.isCollapsed = true;
      }
    });
  }

  public logout() {
    this.authService.logout();
    this.goToHome();
  }

  goToHome() {
    this.router.navigateByUrl('welcome');
  }
}
