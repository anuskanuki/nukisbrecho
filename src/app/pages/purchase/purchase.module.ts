import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { NgZorroAntdModule } from 'src/app/core/modules/ng-zorro-antd.module';
import { PurchaseConfirmationComponent } from './confirmation/purchase-confirmation.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [PurchaseComponent, PurchaseConfirmationComponent, CartComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    PurchaseRoutingModule
  ]
})
export class PurchaseModule { }
