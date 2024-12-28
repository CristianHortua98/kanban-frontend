import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';



@NgModule({
  declarations: [
    NopagefoundComponent,
    InicioComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
