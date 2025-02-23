import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { KanbanModule } from '../kanban/kanban.module';
import { TimeAgoPipe } from './pipes/time-ago.pipe';



@NgModule({
  declarations: [
    BreadcumbsComponent,
    HeaderComponent,
    SidebarComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent
  ]
})
export class SharedModule { }
