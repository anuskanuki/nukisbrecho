import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'src/app/core/modules/ng-zorro-antd.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';

@NgModule({
  declarations: [
    ServerErrorComponent,
    NotFoundComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    ServerErrorComponent,
    NotFoundComponent,
    ForbiddenComponent
  ]
})
export class ServerErrosPagesModule { }
