import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';
import { ProductService } from '../../products/services/product.service';
import { ProductModel } from '../../products/models/product.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { PurchaseService } from '../services/purchase.service';
import { UserByIdModel } from '../models/purchase.model';
import { OrdersUserModel } from '../../user/models/orders.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.less'],
  // providers: [DatePipe]
})
export class PurchaseComponent implements OnInit, OnDestroy {

  public loggedIn = false;
  public paymentReceiptAttached = false;

  public userName = '';
  public userId = '';
  public routerId = '';
  public finalPrice = 0;

  public productModel: ProductModel = {};
  // public newUserOrder: OrdersUserModel = {};
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
    private notification: NzNotificationService,
    // private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.routerId = this.router.url.split('/')[2];
    this.verifyLoggedUser();
    this.loadProductById();
    // this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
  }

  private loadProductById() {
    const subscription = this.productService.getProductById(this.routerId).subscribe(
      response => {
        this.productModel = response;
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

  buyProduct() {
    if (this.paymentReceiptAttached) {
      this.productModel.active = false;

      // const newUserOrder: OrdersUserModel = {
      //   orderDate: '27/02/2022',
      //   orderStatusRecived: true,
      //   orderStatusProcessingPayment: true,
      //   orderStatusPaymentOk: true,
      //   orderStatusFinished: true,
      //   productId: this.productModel.id,
      //   productTitle: this.productModel.title,
      //   productPhoto: this.productModel.photo1,
      // };

      const subscription = this.purchaseService.updateProduct(this.productModel).subscribe(
        () => {
          this.notification.success('Sucesso!', 'Pedido de compra efetuado.');
        },
        error => {
          this.notification.error('Oops!', error)
        }
      )

      // const subscribeNewUserOrder = this.purchaseService.insertUserOrder(newUserOrder).subscribe(() => {
      //   this.notification.success('Feito!', 'Pagamento em análise.');
      // },
      //   error => {
      //     this.notification.error('Ops!', 'Ocorreu um erro, tente novamente.' + '\n' + error);
      //   });

      this.subscriptions.push(subscription);
    }
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
