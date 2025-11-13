import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { OrderComponent } from './order.component';

const routes: Routes = [
  { path: 'order', component: OrderComponent }
];

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule, // ← ДОБАВИТЬ
    RouterModule.forChild(routes)
  ]
})
export class OrderModule { }
