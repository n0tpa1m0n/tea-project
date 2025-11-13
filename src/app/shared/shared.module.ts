import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DescriptionSubstringPipe } from './pipes/description-substring.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DescriptionSubstringPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    DescriptionSubstringPipe,
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SharedModule { }
