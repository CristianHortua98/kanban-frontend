import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { UsersRoutingModule } from './users.routing';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesCheckboxComponent } from './components/roles-checkbox/roles-checkbox.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    RolesCheckboxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
