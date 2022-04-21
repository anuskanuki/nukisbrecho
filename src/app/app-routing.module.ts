import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { ForbiddenComponent } from './pages/server-errors/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/server-errors/not-found/not-found.component';
import { ServerErrorComponent } from './pages/server-errors/server-error/server-error.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/products/product.module').then((m) => m.ProductModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserModule),
    //data: { adminOnly: true },// para modulos inteiros 
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'purchase',
    loadChildren: () =>
      import('./pages/purchase/purchase.module').then((m) => m.PurchaseModule),
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
  {
    path: '500',
    component: ServerErrorComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
