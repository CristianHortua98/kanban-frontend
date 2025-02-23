import { Component, input, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { User } from '../../../../auth/interfaces/user.interface';
import { Project } from '../../../projects/interfaces/project.interace';
import { ModalTaskService } from '../../../services/modal-task.service';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent{
  
  @Input() task: Task;
  @Input() project: Project;
  @Input() collaboratorsProject: User[];

  constructor(
    private modalTaskService: ModalTaskService
  ){}

  openModal(task: Task){

    this.modalTaskService.openModal(task);
    this.modalTaskService.selectedTask.emit(task);

  }
  
}
