import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { CatalogComponent } from './catalog/catalog.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'product/:id', component: ProductComponent }
];

@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
