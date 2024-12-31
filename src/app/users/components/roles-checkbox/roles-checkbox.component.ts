import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-roles-checkbox',
  templateUrl: './roles-checkbox.component.html',
  styleUrl: './roles-checkbox.component.css'
})
export class RolesCheckboxComponent {

  @Input() roles: Role[] = [];
  @Input() selectedRoles: number[] = [];
  @Output() rolesChanged = new EventEmitter<number[]>();

  constructor(){

    // console.log(this.selectedRoles);

  }

  toggleRole(roleId: number, isChecked: boolean){

    if(isChecked){
      this.selectedRoles.push(roleId);
    }else{
      this.selectedRoles = this.selectedRoles.filter(id => id !== roleId);
    }

    this.rolesChanged.emit(this.selectedRoles);

  }

}
