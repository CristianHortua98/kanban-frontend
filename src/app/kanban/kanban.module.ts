import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { KanbanRoutingModule } from './kanban.routing';
import { RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/pages/projects/projects.component';
import { ProjectFormComponent } from './projects/pages/project-form/project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardProjectsComponent } from './projects/components/card-projects/card-projects.component';
import { ProjectCollaboratorsFormComponent } from './projects/pages/project-collaborators-form/project-collaborators-form.component';
import { CollaboratorsCheckboxComponent } from './projects/components/collaborators-checkbox/collaborators-checkbox.component';
import { BoardComponent } from './tasks/pages/board/board.component';
import { BoardColumnComponent } from './tasks/components/board-column/board-column.component';
import { CardTaskComponent } from './tasks/components/card-task/card-task.component';
import { DropdownUserAssignedComponent } from './tasks/components/dropdown-user-assigned/dropdown-user-assigned.component';
import { TableTaskComponent } from './tasks/components/table-task/table-task.component';
import { LimitTaskPipePipe } from './tasks/pipes/limit-task-pipe.pipe';
import { ModalTaskComponent } from './tasks/components/modal-task/modal-task.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ListFilesTaskComponent } from './tasks/components/list-files-task/list-files-task.component';
import { CommentFieldComponent } from './tasks/components/comment-field/comment-field.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectFormComponent,
    CardProjectsComponent,
    ProjectCollaboratorsFormComponent,
    CollaboratorsCheckboxComponent,
    BoardComponent,
    BoardColumnComponent,
    CardTaskComponent,
    DropdownUserAssignedComponent,
    TableTaskComponent,
    LimitTaskPipePipe,
    ModalTaskComponent,
    ListFilesTaskComponent,
    CommentFieldComponent,
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  exports: [
    ModalTaskComponent
  ]
})
export class KanbanModule { }
