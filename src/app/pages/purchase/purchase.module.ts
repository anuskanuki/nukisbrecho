import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { NgZorroAntdModule } from 'src/app/core/modules/ng-zorro-antd.module';
import { CartComponent } from './cart/cart.component';
import { ServerErrosPagesModule } from '../server-errors/serverErrosPages.module';

@NgModule({
  declarations: [PurchaseComponent, CartComponent],
  imports: [
    ServerErrosPagesModule,
    CommonModule,
    NgZorroAntdModule,
    PurchaseRoutingModule
  ],
  exports: [PurchaseComponent]
})
export class PurchaseModule { }
