import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list-filtered',
  templateUrl: './products-list-filtered.component.html',
  styleUrls: ['./products-list-filtered.component.less']
})
export class ProductsListFilteredComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  count = 4;
  array = new Array(this.count);

  public productsList: ProductModel[] = [];
  public routerId = '';

  constructor(
    private location: Location,
    protected productService: ProductService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routerId = this.router.url.split('/')[2];
    this.checkWichListToShow(this.routerId);
  }

  goToProduct(productId: string) {
    this.router.navigate(['/product/', productId]);
  }

  checkWichListToShow(filterBy: string) {
    switch (filterBy) {
      case 'shoes':
        const subscriptionShoes = this.productService.getFilteredByShoes().subscribe(
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
        this.subscriptions.push(subscriptionShoes);
        break;
      case 'clothes':
        const subscriptionClothes = this.productService.getFilteredByClothes().subscribe(
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
        this.subscriptions.push(subscriptionClothes);
        break;
      case 'accessories':
        const subscriptionAccessories = this.productService.getFilteredByAccessories().subscribe(
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
        this.subscriptions.push(subscriptionAccessories);

        break;
      default: const subscription = this.productService.getFilteredByActive().subscribe(
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
        break;
    }
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
