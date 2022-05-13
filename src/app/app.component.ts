import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { TokenService } from './core/services/token.service';
import { LoggedUserModel } from './pages/login/models/login.model';
import { ProductModel } from './pages/products/models/product.model';
import { ProductService } from './pages/products/services/product.service';
// import { AdminNotificationService } from './pages/user/services/admin-notification.service';
// import { NotificationService } from './pages/user/services/notification.service';

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
  // public notificationsCount = 0;

  public productId = 0;

  constructor(
    private router: Router,
    private authService: TokenService,
    private notification: NzNotificationService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    // private notificationService: NotificationService,
    // private adminNotificationService: AdminNotificationService
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
    // this.getNotificationsCount();
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

  // private getNotificationsCount() {
  //   let subscription = new Subscription();
  //   if (this.isAdmin) {
  //     subscription = this.adminNotificationService.getUnreadNotifications().subscribe(
  //       response => this.notificationsCount = response?.length ?? 0,
  //       error => this.notification.error('Oops!', error)
  //     )
  //   } else {
  //     subscription = this.notificationService.getUnreadNotificationsByUserId(this.authService.tokenData.nameid).subscribe(
  //       response => this.notificationsCount = response?.length ?? 0,
  //       error => this.notification.error('Oops!', error)
  //     )
  //   }
  //   this.subscriptions.push(subscription);
  // }

  public logout() {
    this.authService.logout();
    setTimeout(() => {
      location.reload();
    }, 10);
    this.goToHome();
  }

  goToProfile() {
    this.router.navigate(['/user/form/', this.authService.tokenData.nameid]);
  }

  public goToProduct(product: any) {
    this.router.navigateByUrl('product/' + product.id);

    if (this.router.url.includes('/product/')) {
      setTimeout(() => {
        location.reload();
      }, 10);
    }

    this.formSearch.reset();
  }

  goToHome() {
    this.router.navigateByUrl('welcome');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
