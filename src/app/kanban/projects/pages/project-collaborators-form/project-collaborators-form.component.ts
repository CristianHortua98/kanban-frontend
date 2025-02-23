import { Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionServiceService } from '../../../../services/encryption-service.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../interfaces/project.interace';
import { User } from '../../../../auth/interfaces/user.interface';
import { UserService } from '../../../../users/services/user.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ProjectCollaborators } from '../../interfaces/project-collaborators.interface';

@Component({
  selector: 'app-project-collaborators-form',
  templateUrl: './project-collaborators-form.component.html',
  styleUrl: './project-collaborators-form.component.css'
})
export class ProjectCollaboratorsFormComponent implements OnInit{

  public collaboratorsForm: FormGroup;
  public project: Project;
  public users: User[];
  public user = computed(() => this.authService.currentUser());
  public collaboratorsSelected: number[] = [];
  public formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private encryptionServiceService: EncryptionServiceService,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService
  ){
    
  }

  ngOnInit(): void {

    this.collaboratorsForm = this.fb.group({
      users: this.fb.array([])
    })


    this.loadCollaborators();

    this.activatedRoute.params.subscribe(({id}) => {
      this.loadInfoProject(id);
    })

  }

  loadInfoProject(id: number){

    this.projectService.projectDetailCollaborators(id)
      .pipe(
        tap((projectResp: ProjectCollaborators) => {

          const { collaborators } = projectResp;

          const usersFormArray = this.collaboratorsForm.get('users') as FormArray;
          usersFormArray.clear(); 
          collaborators.forEach(collaborator => {
            usersFormArray.push(this.fb.control(collaborator.id));
          });
          this.collaboratorsSelected = collaborators.map(collaborator => collaborator.id); 

        })
      )
      .subscribe({
        next: (resp: Project) => {
          this.project = resp;
        },
        error: (err) => {
          console.log('Error load Project');
        }
      })

  }

  loadCollaborators(){

    this.userService.listCollaborators(this.user().id)
      .subscribe({
        next: (resp: User[]) => {
          this.users = resp;
        },
        error: (err) => {
          console.log('Error load List Collaborators');
        }
      })

  }

  onCollaboratorsChanged(newCollaborators: number[]){
  
    const collaboratorsFormArray = this.collaboratorsForm.get('users') as FormArray;
    collaboratorsFormArray.clear();
    newCollaborators.forEach(userId => collaboratorsFormArray.push(this.fb.control(userId)));
  
  }

  collaboratorsNoValid(){

    const collaborators = this.collaboratorsForm.get('users').value;
    if(collaborators.length === 0 && this.formSubmitted){
      return true;
    }else{
      return false;
    }
    
  }

  saveCollaboratorsProject(){

    console.log(this.collaboratorsForm.value);

    this.formSubmitted = true;

    if(this.collaboratorsForm.invalid){
      return;
    }

    const data = {
      project: this.project.id,
      collaborators: this.collaboratorsForm.get('users').value
    }


    this.projectService.addCollaboratorsProject(data)
      .subscribe({
        next: (resp) => {

          Swal.fire({
            icon: 'success',
            text: 'User created successfully.',
            confirmButtonColor: '#398bf7'
          })

          this.router.navigateByUrl(`/cas-kanban/projects`);
        }
      })

  }

}
