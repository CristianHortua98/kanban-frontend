import { Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import { ProjectCollaborators } from '../../../projects/interfaces/project-collaborators.interface';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit{

  public project: ProjectCollaborators;
  public projectId: number;
  public task = computed(() => this.taskService.tasks());
  // public columnsTask = [
  //   { key: 'id', label: '#' },
  //   { key: 'project', label: 'Project' },
  //   { key: 'code', label: 'Code' },
  //   { key: 'title', label: 'Title' },
  //   { key: 'created_at', label: 'Created At' },
  //   { key: 'updated_at', label: 'Updated At' },
  //   { key: 'status', label: 'Status' }
  // ];
  public offset: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    public taskService: TaskService
  ){
    
  }
  
  
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(({id}) => {
      this.projectId = Number(id);
      this.projectService.projectDetailCollaborators(id).subscribe({
        next: (resp: ProjectCollaborators) => {
          // console.log(resp);
          this.project = resp;
        }
      })
    })

    
  }
  
  
  activeNavTab(evt: any){

    // console.log(evt);
    // console.log(evt.target.innerText);

    let tabsPane = document.querySelectorAll('.tab-pane');

    tabsPane.forEach((tabsPane) => {
      if(tabsPane.id === evt.target.innerText.toLowerCase()){
        tabsPane.classList.add('active');
      }else{
        tabsPane.classList.remove('active');
      }
    })

  }

}
