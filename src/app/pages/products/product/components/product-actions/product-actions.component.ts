import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import { ProductActions } from './model/product-actions.model';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActionsComponent {

  gridStyle = {
    width: '33,33%',
    textAlign: 'center'
  };

  buyNow = false;

  @Input() productActions = new ProductActions();
  // @Input() productModel = new ProductModel();
  likeThisProduct = false;

  constructor(private readonly changeDetection: ChangeDetectorRef) { }

  likeProduct() {
    this.likeThisProduct = !this.likeThisProduct;
    this.productActions.wishlistedCount += this.likeThisProduct ? + 1 : - 1;
    this.changeDetection.detectChanges();
  }

  goPurchase() {

  }
}
