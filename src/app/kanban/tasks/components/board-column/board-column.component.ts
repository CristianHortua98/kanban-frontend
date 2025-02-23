import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Sortable from 'sortablejs';
import { TaskService } from '../../../services/task.service';
import { delay, firstValueFrom, forkJoin, map, Subscription, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../../../../auth/interfaces/user.interface';
import { Project } from '../../../projects/interfaces/project.interace';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrl: './board-column.component.css'
})
export class BoardColumnComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() collaboratorsProject: User[];
  @Input() project: Project;

  public columnsBoard = [
    { title: "PENDING", status: "PENDING", cardNameClass: "card-pending", cardHeaderBg: "card-outline-warning", showCreateTask: false, limit :10 },
    { title: "IN PROCESS", status: "IN_PROGRESS", cardNameClass: "card-process", cardHeaderBg: "card-outline-info", showCreateTask: false, limit: 10 },
    { title: "DONE", status: "DONE", cardNameClass: "card-done", cardHeaderBg: "card-outline-success", showCreateTask: false, limit: 5 }
  ];
  public projectId: number;
  public taskForm: FormGroup;
  public formSubmitted = true;
  public assignedUserTaskSubs: Subscription;
  public updTaskSubs: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public taskService: TaskService
  ){}

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(300)]]
    })
    
    this.activatedRoute.params.subscribe(({id}) => {
      this.projectId = id;
      this.loadColumns(id);
      // this.taskService.loadTasksProject(this.projectId);
    })
    // console.log(this.project);
    // this.loadColumns(this.project?.id);

    this.assignedUserTaskSubs = this.taskService.newAssignedUserTask.subscribe(resp => this.loadColumns(this.projectId)); 
    this.updTaskSubs = this.taskService.updTaskEmit.subscribe(resp => this.loadColumns(this.projectId));


  }
  
  ngAfterViewInit(): void {
    this.initializeSortable();
  }

  ngOnDestroy(): void {
    this.assignedUserTaskSubs.unsubscribe();
  }

  loadColumns(projectId: number){

    this.taskService.loadTasksProject(projectId);

  }

  initializeSortable() {

    this.columnsBoard.forEach((c) => {

      let element = document.querySelector(`.items-card-${c.status}`);

      let sortable = Sortable.create(element as HTMLElement, {

        animation: 200,
        group: {
          name: 'kanban',
          pull: true,
          put: true
        },
        onEnd: (evt) => {
          // console.log(evt);
          this.changeTaskStatus(evt);
        }
      })

    })

  }

  createTask(column: any){

    this.formSubmitted = true;

    if(this.taskForm.invalid){
      return;
    }

    const data = {
      project_id: this.projectId,
      title: this.taskForm.get('title').value,
      status: column.status
    }

    this.taskService.createTask(data)
      .subscribe({
        next: (resp) => {
          this.taskForm.reset();
          this.toggleCreateTask(column);
          this.loadColumns(this.projectId);
        },
        error: (err) => {
          console.log(err);
        }
      })

  }

  changeTaskStatus(evt: any) {

    const id_task = Number(evt.item.getAttribute('data-task-id'));
    const status = evt.to.getAttribute('data-card-status');
    const statusOrigen = evt.from.getAttribute('data-card-status');

    // console.log(id_task, status, statusOrigen);

    if(id_task && status){

      if(status !== statusOrigen){
        this.taskService.changeTaskStatus({id_task, status})
          .pipe(
            tap(() => {
              // this.ngOnInit()
              this.loadColumns(this.projectId);
            }),
          )
          .subscribe({
            // next: (resp) => {
            //   // this.loadColumns(this.projectId);
            // },
            error: (err) => {
              console.log(err);
            }
          });
      }


    }else{

      console.log('Error Change Task Status');

    }

  }

  toggleCreateTask(column: any){

    this.columnsBoard.forEach((col) => {
      if(col !== column){
        col.showCreateTask = false;
      }
    })

    column.showCreateTask = !column.showCreateTask;

  }

  getLimitedTasks(tasks: Task[], status: string) {
    if (status === 'DONE') {
      return tasks.filter(task => task.status === 'DONE').slice(0, 5);
    }
    return tasks;
  }

  getDoneTasksCount() {
    return this.taskService.tasks().filter(task => task.status === 'DONE').length;
  }

}
