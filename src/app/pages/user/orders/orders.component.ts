import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrdersUserModel } from '../models/orders.model';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../products/services/product.service';
import { ProductModel } from '../../products/models/product.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public ordersList: OrdersUserModel[] = [];

  public productsList: ProductModel[] = [];

  constructor(
    private location: Location,
    protected userService: UserService,
    protected productService: ProductService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.getOrdersList();
    this.getInactiveProducts();
  }

  getInactiveProducts() {
    const subscription = this.productService.getFilteredByInactive().subscribe(
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

  // getOrdersList() {
  //   const subscription = this.userService.getAllUserOrders().subscribe(
  //     response => {
  //       if (response.length) {
  //         this.ordersList = response;
  //       } else {
  //         this.ordersList = [];
  //       }
  //     },
  //     error => {
  //       this.notification.error('Oops!', error);
  //     }
  //   )
  //   this.subscriptions.push(subscription);
  // }

  back(): void {
    this.location.back();
  }

  goToProduct(productId: number = 1) {
    this.router.navigate(['/product/', productId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
