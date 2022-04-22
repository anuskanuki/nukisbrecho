import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgZorroAntdModule } from 'src/app/core/modules/ng-zorro-antd.module';
import { UserRoutingModule } from './user-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [UserFormComponent, UserListComponent, OrdersComponent, NotificationsComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
