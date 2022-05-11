import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { ProductService } from '../../products/services/product.service';
import { ProductModel } from '../../products/models/product.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription } from 'rxjs';
import { PurchaseService } from '../services/purchase.service';
import { UserByIdModel } from '../models/purchase.model';
import { OrderModel } from '../../user/models/orders.model';
import { OrderService } from '../services/order.service';
import { AdminNotificationService } from '../../user/services/admin-notification.service';
import { NotificationModel } from '../../user/models/notification.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.less'],
  providers: [DatePipe]
})
export class PurchaseComponent implements OnInit, OnDestroy {

  public loggedIn = false;
  public paymentReceiptAttached = false;

  public userName = '';
  public userId = '';
  public routerId = '';
  public finalPrice = 0;

  public activeProduct = false;

  public thisDate = new Date();

  public showConfirmationPage = false;

  public productModel: ProductModel = {};
  public userModel: UserByIdModel = {};
  subscriptions: Subscription[] = [];

  // myDate = new Date();

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
    protected orderService: OrderService,
    private notification: NzNotificationService,
    private datePipe: DatePipe,
    private adminNotificationService: AdminNotificationService,
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
        this.activeProduct = response.active!;
        this.finalPrice = response.priceTag! + 20;
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

  async buyProduct() {
    if (this.paymentReceiptAttached) {
      await Promise.all([
        this.deactiveProductPromise(),
        this.createOrderPromise(),
        this.notifyAdmins()
      ]).then(() => {
        this.notification.success('Sucesso!', 'Pedido de compra efetuado.')
      }).then(() => {
        setTimeout(() => {
          this.goToConfirmation();
        }, 1000);
      }).catch(error => {
        this.notification.error('Oops!', error)
      });
    }
  }

  private deactiveProductPromise(): Observable<any> {
    this.productModel.active = false;
    const subscription = this.purchaseService.updateProduct(this.productModel);
    this.subscriptions.push(subscription.subscribe());
    return subscription;
  }

  private createOrderPromise(): Observable<any> {
    const subscription = this.orderService.insert(this.mapOrderToModel());
    this.subscriptions.push(subscription.subscribe());
    return subscription;
  }

  private mapOrderToModel(): OrderModel {
    const dateNow = this.datePipe.transform(this.thisDate, 'dd/MM/yyy')?.toString();

    return {
      orderDate: dateNow,
      orderStatusRecived: true,
      orderStatusProcessingPayment: true,
      orderStatusPaymentOk: true,
      orderStatusFinished: true,
      userId: this.tokenService.tokenData.nameid,
      products: [
        {
          id: this.productModel.id?.toString(),
          title: this.productModel.title,
          photo: this.productModel.photo1
        }
      ]
    };
  }

  private notifyAdmins(): Observable<any> {
    const subscription = this.adminNotificationService.insert(this.mapNotificationToModel());
    this.subscriptions.push(subscription.subscribe());
    return subscription;
  }

  private mapNotificationToModel(): NotificationModel {
    return {
      title: "Nova compra efetuada!",
      description: `O usuário @${this.userName} realizou a compra do produto ${this.productModel.title}`,
      routeLinkTo: `/product/${this.productModel.id}`,
      // TO-DO: verificar possibilidade de colocar e renderizar a imagem do asset
      // image: this.productModel.photo1,
      image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      read: false
    };
  }

  private goToConfirmation() {
    this.showConfirmationPage = true;
  }

  goToHome() {
    this.router.navigateByUrl('/user/orders');
  }

  getUserInfo() {
    this.userName = this.tokenService.tokenData.unique_name.split(' ')[0];
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
