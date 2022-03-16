import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public productsList: ProductModel[] = [];

  constructor(
    private location: Location,
    protected productService: ProductService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    const subscription = this.productService.getAll().subscribe(
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

  back(): void {
    this.location.back();
  }

  public delete(id: any, product: string) {
    const subscription = this.productService.delete(id).subscribe(
      () => {
        this.notification.success('Produto deletado', 'Produto: ' + product);
        setTimeout(() => {
          location.reload();
        }, 4000);
      },
      error => {
        this.notification.error('Oops!', error);
      }
    );
    this.subscriptions.push(subscription);
  }

  newProduct() {
    this.router.navigate(['/product/form/']);
  }

  edit(productId: number = 1) {
    this.router.navigate(['/product/form/', productId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
