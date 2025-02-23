import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { User } from '../../../../auth/interfaces/user.interface';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-dropdown-user-assigned',
  templateUrl: './dropdown-user-assigned.component.html',
  styleUrl: './dropdown-user-assigned.component.css'
})
export class DropdownUserAssignedComponent{

  @Input() task: Task;
  @Input() collaboratorsProject: User[];

  public userSesion = computed(() => this.authService.currentUser());

  taskService = inject(TaskService);
  authService = inject(AuthService);
  notificationsService = inject(NotificationsService);

  getButtonTitle(task: Task){

    return task?.user_assigned ? `Assigned: ${task.user_assigned.fullname}` : `Unassigned`;

  }


  assignedCollaborator(id_task: number, collaborator: User){

    this.taskService.assignedUserTask({id_task, id_user: collaborator.id})
      .subscribe({
        next: (resp: Task) => {
          this.notificationsService.createNotification({id_task: id_task, id_user: collaborator.id})
            .subscribe({
              next: (resp) => {
                console.log(resp);
                this.notificationsService.loadNotificationsUser(this.userSesion().id);
              }
            })
          this.taskService.newAssignedUserTask.emit(resp.title);
        },
        error: (err) => {
          console.log(err);
        }
      })

  }

}
