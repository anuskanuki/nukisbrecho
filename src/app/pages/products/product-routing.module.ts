import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsListFilteredComponent } from './product-list/products-list-filtered/products-list-filtered.component';

const routes: Routes = [
  { path: '', component: ProductsListFilteredComponent },//products list by category or search filter
  { path: 'clothes', component: ProductsListFilteredComponent },
  { path: 'shoes', component: ProductsListFilteredComponent },
  { path: 'accessories', component: ProductsListFilteredComponent },
  { path: 'all', component: ProductsListFilteredComponent },
  { path: 'list', component: ProductListComponent },//admin crud
  { path: ':id', component: ProductComponent }, //view product
  { path: 'form', component: ProductFormComponent }, //new product
  { path: 'form/:id', component: ProductFormComponent }, //edit product
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
