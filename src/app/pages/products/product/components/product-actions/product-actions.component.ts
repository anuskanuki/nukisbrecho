import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { ProductActions } from './model/product-actions.model';

@Component({
  selector: 'app-product-actions',
  templateUrl: './product-actions.component.html',
  styleUrls: ['./product-actions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductActionsComponent implements OnInit {

  gridStyle = {
    width: '33,33%',
    textAlign: 'center'
  };

  buyNow = false;
  isLoggedIn = false;
  isAdminPermission = false;

  @Input() productActions = new ProductActions();
  @Input() productIsActive = true;
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

  ngOnInit(): void {
    this.isAdminPermission = this.isAdmin();
  }

  isAdmin() {
    return this.authService.isAdmin();
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
