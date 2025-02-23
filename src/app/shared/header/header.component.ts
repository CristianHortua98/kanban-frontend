import { Component, computed } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { NotificationsService } from '../../kanban/services/notifications.service';
import { Task } from '../../kanban/tasks/interfaces/task.interface';
import { ModalTaskService } from '../../kanban/services/modal-task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public user = computed(() => this.authService.currentUser());
  public notifications = computed(() => this.notificationsService.notifications());

  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private modalTaskService: ModalTaskService,
    private router: Router
  ){

    notificationsService.loadNotificationsUser(this.user().id);

  }


  logout(){

    this.authService.logout();

  }

  openModal(task: Task, idNotification: number){
    this.router.navigate(['cas-kanban/board/', task.project_id.id]).then(() => {
      setTimeout(() => {
        this.modalTaskService.openModal(task);
        this.modalTaskService.selectedTask.emit(task);
      }, 500)
    })
    this.notificationsService.checkViewNotification(idNotification, this.user().id);

  }

}
