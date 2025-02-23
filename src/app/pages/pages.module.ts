import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { KanbanModule } from '../kanban/kanban.module';



@NgModule({
  declarations: [
    NopagefoundComponent,
    InicioComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    KanbanModule
  ]
})
export class PagesModule { }
