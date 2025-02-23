import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { ModalTaskService } from '../../../services/modal-task.service';

@Component({
  selector: 'task-table-task',
  templateUrl: './table-task.component.html',
  styleUrl: './table-task.component.css'
})
export class TableTaskComponent implements OnInit{

  @Input() idProject: number;

  public columnsTask = [
    { key: 'id', label: '#' },
    { key: 'project', label: 'Project' },
    { key: 'code', label: 'Code' },
    { key: 'title', label: 'Title' },
    { key: 'user_assigned', label: 'User Assigned' },
    { key: 'created_at', label: 'Created At' },
    { key: 'updated_at', label: 'Updated At' },
    { key: 'status', label: 'Status' }
  ];
  public offset: number = 0;

  constructor(
    public taskService: TaskService,
    private modalTaskService: ModalTaskService
  ){}


  ngOnInit(): void {

    this.loadTask();
  }

  loadTask(){

    this.taskService.listTasksPaginate(this.idProject, this.offset);

  }

  openModal(task: Task){

    this.modalTaskService.openModal(task);
    this.modalTaskService.selectedTask.emit(task);

  }

  orderColumn(column: string, order: string){

    console.log(column.toLocaleLowerCase(), order);

  }

  changePage(valor: number){

    this.offset += valor;

    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset >= this.taskService.tasks().length) {
      this.offset -= valor;
    }
    
    this.loadTask();

  }



}
