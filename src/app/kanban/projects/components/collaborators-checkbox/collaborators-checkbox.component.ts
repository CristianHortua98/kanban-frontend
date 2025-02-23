import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-collaborators-checkbox',
  templateUrl: './collaborators-checkbox.component.html',
  styleUrl: './collaborators-checkbox.component.css'
})
export class CollaboratorsCheckboxComponent {

  @Input() users: User[] = [];
  @Input() selectedUsers: number[] = [];
  @Output() usersChanged = new EventEmitter<number[]>();

  toggleRole(roleId: number, isChecked: boolean){

    if(isChecked){
      this.selectedUsers.push(roleId);
    }else{
      this.selectedUsers = this.selectedUsers.filter(id => id !== roleId);
    }

    this.usersChanged.emit(this.selectedUsers);

  }

}
