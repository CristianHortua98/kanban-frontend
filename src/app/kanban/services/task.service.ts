import { computed, EventEmitter, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { TaskState } from 'zone.js/lib/zone-impl';
import { TaskCreateForm } from '../tasks/interfaces/task-create-form.interface';
import { AssignedUserTaskForm } from '../tasks/interfaces/assigned-user-task-form.interface';
import { ChangeTaskStatusForm } from '../tasks/interfaces/change-task-status-form.interface';
import { Task } from '../tasks/interfaces/task.interface';
import { catchError, of, tap } from 'rxjs';
import { TasksPaginate } from '../tasks/interfaces/tasks-paginate.interface';
import { TaskUpdateForm } from '../tasks/interfaces/task-update-form.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = environments.baseUrl;

  private _tasks = signal<Task[]>([]);
  private _tasksPaginates = signal<Task[]>(null);

  public newAssignedUserTask: EventEmitter<string> = new EventEmitter<string>();
  public updTaskEmit: EventEmitter<string> = new EventEmitter<string>(); 
  public tasks = computed(() => this._tasks()); 
  public tasksPaginates = computed(() => this._tasksPaginates());



  constructor(
    private http: HttpClient
  ){}

  loadTasksProject(idProject: number) {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/list-tasks-project/${idProject}`)
      .pipe(
        tap(tasks => {
          this._tasks.set(tasks);
          this.listTasksPaginate(idProject);
        }),
        catchError(error => {
          console.error('Error al cargar tareas:', error);
          return of([]); // Retorna un array vacío en caso de error
        })
      ).subscribe();
  }

  reloadTasks(idProject: number){
    this.loadTasksProject(idProject);
  }

  changeTaskStatus(changeTaskStatusForm: ChangeTaskStatusForm){

    const url = `${this.baseUrl}/tasks/change-task-status`;

    return this.http.put(url, changeTaskStatusForm);

  }


  assignedUserTask(assignedUserTaskForm: AssignedUserTaskForm){

    const url = `${this.baseUrl}/tasks/assigned-user-task`;

    return this.http.put(url, assignedUserTaskForm);

  }

  createTask(taskCreateForm: TaskCreateForm){

    const url = `${this.baseUrl}/tasks`;

    return this.http.post(url, taskCreateForm);
    
  }

  listTasks(){

    const url = `${this.baseUrl}/tasks`;

    return this.http.get(url);

  }

  listTasksProjectStatus(project_id: number, limit: number, status: string){

    const url = `${this.baseUrl}/tasks/list-task-state/${project_id}/?limit=${limit}&status=${status}`;

    return this.http.get(url);

  }


  listTasksPaginate(idProject: number, offset: number = 0){

    return this.http.get<TasksPaginate>(`${this.baseUrl}/tasks/list-tasks-paginate?id_project=${idProject}&offset=${offset}`)
      .pipe(
        tap((resp: TasksPaginate) => {
          this._tasksPaginates.set(resp.tasks);
        }),
        catchError(error => {
          console.error('Error al cargar tareas:', error);
          return of([]); // Retorna un array vacío en caso de error
        })
      ).subscribe();

  }

  updateTask(idTask: number, taskUpdateForm: TaskUpdateForm){

    const url = `${this.baseUrl}/tasks/${idTask}`;

    return this.http.patch(url, taskUpdateForm);

  }

  getUrlFilesTask(idTask: number){

    const url = `${this.baseUrl}/uploads/tasks-files/${idTask}`;

    return this.http.get(url);

  }

}
