import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrderModel } from '../models/orders.model';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenService } from '../../../core/services/token.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../../purchase/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public orders: OrderModel[] = [];

  constructor(
    private location: Location,
    private authService: TokenService,
    protected orderService: OrderService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrdersList();
  }

  getOrdersList() {
    const subscription = this.orderService.getByUserId(this.authService.tokenData.nameid).subscribe(
      response => this.orders = response ?? [],
      error => this.notification.error('Oops!', error)
    )
    this.subscriptions.push(subscription);
  }

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
