import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [
    HeaderComponent,
    BodyComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    PagesModule,
  ],
  exports: [
    BodyComponent,
  ],
  providers: [],
  bootstrap: []
})
export class LayoutModule { }
