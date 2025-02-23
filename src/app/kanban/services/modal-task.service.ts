import { EventEmitter, Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Task } from '../tasks/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalTaskService {

  baseUrl = environments.baseUrl;

  private _hiddenModal: boolean = true;
  public task: Task;
  public selectedTask: EventEmitter<Task> = new EventEmitter<Task>();


  constructor(){}


  get hiddenModal(){
    return this._hiddenModal;
  }

  get currentTask(){
    return this.task;
  }

  openModal(task: Task){

    this._hiddenModal = false;
    this.task = task;

  }

  closeModal(){

    this._hiddenModal = true;

  }


}
