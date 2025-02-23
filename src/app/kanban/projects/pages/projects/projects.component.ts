import { Component, computed, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project.interace';
import { ProjectService } from '../../../services/project.service';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{

  public user = computed(() => this.authService.currentUser());
  public projects: Project[];
  public projectsCollaborator: Project[];

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ){}


  ngOnInit(): void {
    this.loadProjectsUser();
    this.loadProjectsCollaborator();
  }


  loadProjectsUser(){

    return this.projectService.listProjectsUser(this.user().id)
      .subscribe({
        next: (resp: Project[]) => {
          this.projects = resp;
        },
        error: (err) => {
          console.log('Error loading Projects User');
        }
      })

  }

  loadProjectsCollaborator(){

    return this.projectService.listProjectsCollaborator(this.user().id)
      .subscribe({
        next: (resp: Project[]) => {
          // console.log(resp);
          this.projectsCollaborator = resp;
        },
        error: () => {
          console.log('Error loading Projects Collaborator');
        }
      })


  }



}
