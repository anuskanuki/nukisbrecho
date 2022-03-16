import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'src/app/core/modules/ng-zorro-antd.module';
import { ProductModule } from '../products/product.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { HelpComponent } from './help/help.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [WelcomeComponent, HelpComponent],
  imports: [
    WelcomeRoutingModule,
    NgZorroAntdModule,
    CommonModule,
    ProductModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
