import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/main/main.module').then(m => m.MainModule) },
  { path: '', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },
  { path: '', loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
