import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
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
  isLoggedIn = false;

  @Input() productActions = new ProductActions();
  likeThisProduct = false;

  constructor(
    private readonly changeDetection: ChangeDetectorRef,
    private router: Router,
    private authService: TokenService,
  ) {
    authService.LoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  likeProduct() {
    this.likeThisProduct = !this.likeThisProduct;
    this.productActions.wishlistedCount += this.likeThisProduct ? + 1 : - 1;
    this.changeDetection.detectChanges();
  }

  goPurchase() {
    this.router.navigate(['/purchase/', this.productActions.id.toString()]);
  }
}
