import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
    { path: 'users', component: UsersComponent, data: {title: 'Users'}},
    { path: 'users/:id', component: UserFormComponent, data: {titke: 'User Form'}}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
