import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { NgZorroAntdModule } from 'src/app/core/modules/ng-zorro-antd.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { ProductsListFilteredComponent } from './product-list/products-list-filtered/products-list-filtered.component';
import { ProductChatComponent } from './product/components/product-chat/product-chat.component';
import { ProductPresentationComponent } from './product/components/product-presentation/product-presentation.component';
import { ProductActionsComponent } from './product/components/product-actions/product-actions.component';
import { PurchaseModule } from '../purchase/purchase.module';

@NgModule({
  declarations: [ProductFormComponent, ProductComponent, ProductListComponent, ProductCardComponent, ProductsListFilteredComponent, ProductChatComponent, ProductPresentationComponent, ProductActionsComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ProductRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PurchaseModule,
  ],
  exports: [ProductCardComponent]
})
export class ProductModule { }
