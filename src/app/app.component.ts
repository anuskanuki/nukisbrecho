import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  isCollapsed = true;
  isLoggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.acessaSistema();

    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.isCollapsed = true;
      }
    });
  }

  public acessaSistema() {
    this.router.events.subscribe(rota => {
      if (rota instanceof NavigationEnd) {
        if (!rota.url.includes('login')) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
          //  this.authService.cleanToken();
        }
      }
    });
  }

  goToHome() {
    this.router.navigateByUrl('welcome');
    // this.router.navigate(['/1234']);
  }

}
