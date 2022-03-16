import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseConfirmationComponent } from './confirmation/purchase-confirmation.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: PurchaseComponent },
  { path: 'confirmation', component: PurchaseConfirmationComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
})
export class PurchaseRoutingModule { }
