import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects/pages/projects/projects.component';
import { ProjectFormComponent } from './projects/pages/project-form/project-form.component';
import { ProjectCollaboratorsFormComponent } from './projects/pages/project-collaborators-form/project-collaborators-form.component';
import { BoardComponent } from './tasks/pages/board/board.component';
import { isCollaboratorGuard } from './guards/is-collaborator.guard';

const routes: Routes = [
    { path: 'projects', component: ProjectsComponent, data: {title: 'Projects'}},
    { path: 'projects/:id', component: ProjectFormComponent, data: {title: 'Projects Form'}},
    { path: 'project/add-collaborators/:id', component: ProjectCollaboratorsFormComponent, data: {title: 'Add Collaborators'}},
    { path: 'board/:id', canActivate: [isCollaboratorGuard], component: BoardComponent, data:{title: 'Board'}}
    // { path: 'projects/:id', component: , data: {titke: 'User Form'}}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KanbanRoutingModule {}
