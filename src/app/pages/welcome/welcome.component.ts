import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { ProductModel } from '../products/models/product.model';
import { ProductService } from '../products/services/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  public productsList: ProductModel[] = [];

  constructor(
    private router: Router,
    protected productService: ProductService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit() {
    this.loadTable();
  }

  goToProduct(productId: string) {
    this.router.navigate(['/product/', productId]);
  }

  public loadTable() {
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscripition => subscripition.unsubscribe());
  }

}
