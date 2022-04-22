import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './core/modules/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgZorroAntdModule } from './core/modules/ng-zorro-antd.module';
import { RouterModule } from '@angular/router';
import { LoginModule } from './pages/login/login.module';
import { AppComponent } from './app.component';
import { TokenService } from './core/services/token.service';
import { AuthGuard } from './core/services/auth.guard';
import { ServerErrosPagesModule } from './pages/server-errors/serverErrosPages.module';


registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NgZorroAntdModule,
    RouterModule,
    ReactiveFormsModule,
    LoginModule,
    ServerErrosPagesModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }, TokenService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
