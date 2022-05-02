import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { TokenService } from './core/services/token.service';
import { LoggedUserModel } from './pages/login/models/login.model';
import { ProductModel } from './pages/products/models/product.model';
import { ProductService } from './pages/products/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isLoggedIn = false;
  isAdmin = false;
  showLayout = true;
  firstName = '';

  userData?: LoggedUserModel;
  public formSearch!: FormGroup;

  subscriptions: Subscription[] = [];
  public productsList: ProductModel[] = [];

  constructor(
    private router: Router,
    private authService: TokenService,
    private notification: NzNotificationService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
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

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isAdmin = this.authService.tokenData.isAdmin;
      this.firstName = this.authService.tokenData.unique_name.split(' ')[0];
    }
    this.createformSearchBar();
    this.getProducts();
  }

  private createformSearchBar() {
    this.formSearch = this.formBuilder.group({
      title: [null]
    });
  }

  getProducts() {
    const subscription = this.productService.getFilteredByActive().subscribe(
      response => {
        if (response.length) {
          this.productsList = response;
        } else {
          this.productsList = [];
        }
      },
      error => {
        this.notification.error('Oops!', error);
      }
    )
    this.subscriptions.push(subscription);
  }

  public logout() {
    this.authService.logout();
    this.goToHome();
  }

  goToProfile() {
    this.router.navigate(['/user/form/', this.authService.tokenData.nameid]);
  }

  goToProduct(event: any) {
    console.log('test');
    console.log(event);
    // this.router.navigateByUrl('product/' + productId.toString());
  }

  goToHome() {
    this.router.navigateByUrl('welcome');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
