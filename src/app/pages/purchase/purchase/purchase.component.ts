import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { ProductService } from '../../products/services/product.service';
import { ProductModel } from '../../products/models/product.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { PurchaseService } from '../services/purchase.service';
import { UserByIdModel } from '../models/purchase.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.less']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  public loggedIn = false;
  public paymentReceiptAttached = false;

  public userName = '';
  public userId = '';
  public routerId = '';

  public productModel: ProductModel = {};
  public userModel: UserByIdModel = {};
  subscriptions: Subscription[] = [];

  panels = [
    {
      active: false,
      template: 0,
      name: 'Pagar com PIX',
    },
    {
      active: false,
      template: 1,
      name: 'Pagar com Transferência Bancária',
    }
  ];

  constructor(
    private location: Location,
    private tokenService: TokenService,
    private router: Router,
    protected productService: ProductService,
    protected purchaseService: PurchaseService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.routerId = this.router.url.split('/')[2];
    this.verifyLoggedUser();
    this.loadProductById();
  }

  private loadProductById() {
    const subscription = this.productService.getProductById(this.routerId).subscribe(
      response => {
        this.productModel = response;
      },
      error => {
        this.notification.error('Oops!', error);
      }
    )
    this.subscriptions.push(subscription);
  }

  confirmPaymentReceiptAttached() {
    this.paymentReceiptAttached = true;
  }

  verifyLoggedUser() {
    if (this.tokenService.isLoggedIn()) {
      this.loggedIn = true;
      this.getUserInfo();
    } else {
      this.loggedIn = false;
    }
  }

  getUserInfo() {
    this.userName = this.tokenService.tokenData.unique_name;
    this.userId = this.tokenService.tokenData.nameid;
    this.getUserAddress();
  }

  getUserAddress() {
    const subscribe = this.purchaseService.getPurchaseAddress(this.userId).subscribe(user => {
      this.userModel = user;
    },
      error => {
        this.notification.error('Oops!', error);
      });
    this.subscriptions.push(subscribe);
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }
}
