import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProductModel } from '../models/product.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../services/product.service';
import { ProductActions } from './components/product-actions/model/product-actions.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public productModel: ProductModel = {};
  public productActions = new ProductActions();
  public routerId = '';

  array = [1, 2, 3, 4];
  effect = 'scrollx';

  constructor(
    private location: Location,
    private router: Router,
    protected productService: ProductService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.routerId = this.router.url.split('/')[2];
    this.loadProductById();
  }

  private loadProductById() {
    const subscription = this.productService.getProductById(this.routerId).subscribe(
      response => {
        this.productModel = response;
        this.productActions = this.mapProductActionsInfo();
      },
      error => {
        this.notification.error('Oops!', error);
      }
    )
    this.subscriptions.push(subscription);
  }

  private mapProductActionsInfo(): ProductActions {
    return new ProductActions(
      this.productModel.id,
      this.productModel.active,
      this.productModel.title,
      this.productModel.category,
      this.productModel.priceTag,
      this.productModel.wishlistedCount,
      this.productModel.size,
      this.productModel.brand,
      this.productModel.condition,
      this.productModel.productCode,
      this.productModel.description,
    )
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
