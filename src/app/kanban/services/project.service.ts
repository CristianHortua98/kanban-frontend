import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { ProjectCreateForm } from '../projects/interfaces/project-create-form.interface';
import { AddCollaboratorsForm } from '../projects/interfaces/add-collaborators-form.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = environments.baseUrl;

  constructor(
    private http: HttpClient
  ){}

  addCollaboratorsProject(addCollaboratorForm: AddCollaboratorsForm){

    const url = `${this.baseUrl}/projects/add-collaborators`;

    return this.http.post(url, addCollaboratorForm);

  }

  projectDetailCollaborators(idProject: number){

    const url = `${this.baseUrl}/projects/detail-project-collaborators/${idProject}`;

    return this.http.get(url);

  }

  projectDetail(id: number){

    const url = `${this.baseUrl}/projects/${id}`;

    return this.http.get(url);

  }

  listProjectsCollaborator(idUser: number){

    const url  = `${this.baseUrl}/projects/projects-collaborator/${idUser}`;

    return this.http.get(url);

  }

  listProjectsUser(idUser: number){

    const url = `${this.baseUrl}/projects/user/${idUser}`;

    return this.http.get(url);

  }

  createProject(projectCreateForm: ProjectCreateForm){

    const url = `${this.baseUrl}/projects`;

    return this.http.post(url, projectCreateForm);


  }

}
