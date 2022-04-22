import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { OrdersComponent } from './orders/orders.component';
// import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path: '', component: UserListComponent, data: { adminOnly: true } },
  { path: 'form', component: UserFormComponent, data: { adminOnly: true } },
  { path: 'form/:id', component: UserFormComponent },
  { path: 'orders', component: OrdersComponent },
  // { path: 'notifications', component: NotificationsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule],
})
export class UserRoutingModule { }
