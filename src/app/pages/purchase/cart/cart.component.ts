import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { ProductModel } from '../../products/models/product.model';
import { ProductService } from '../../products/services/product.service';
import { CartModel } from '../models/cart.model';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public cartProductsList: ProductModel[] = [];
  public cartModel: CartModel = {};

  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly productService: ProductService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    const subscription = this.purchaseService.getCart().subscribe(
      response => {
        this.cartModel = response;
        this.getProductsById(response.productsId);
      },
      error => {
        this.notification.error('Oops!', error);
      }
    )
    this.subscriptions.push(subscription);
  }

  getProductsById(productsId: number[] = []) {
    console.log(productsId);
    // if (this.cartModel.productsId?.length) {
    productsId.forEach(productId => {
      const subscription = this.productService.getProductById(productId).subscribe(
        response => {
          console.log(response);
          this.cartProductsList.push(response);
        },
        error => {
          this.notification.error('Oops!', error);
        }
      )
      this.subscriptions.push(subscription);
    });
    // }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }
}
