import { Component, computed, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../users/services/user.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { ProjectService } from '../../../services/project.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit{

  public projectForm: FormGroup;
  public formSubmitted = true;


  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ){}


  ngOnInit(): void {

    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      code: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]]
    })

    this.projectForm.get('name').valueChanges.subscribe(value => {
      this.generatedFieldCode(value);
    })

  }

  generatedFieldCode(nameProject: string){

    if(nameProject){
      let code = nameProject.substring(0, 3).toUpperCase();
      this.projectForm.get('code').setValue(code);
    }

  }

  saveProject(){

    this.formSubmitted = true;

    if(this.projectForm.invalid){
      return;
    }

    this.projectService.createProject(this.projectForm.value)
      .subscribe({
        next: (resp) => {

          Swal.fire({
            icon: 'success',
            text: 'Project created successfully.',
            confirmButtonColor: '#398bf7'
          })

          this.router.navigateByUrl(`/cas-kanban/projects`);

        },
        error: (err) => {
          this.showError(err.error.message)
        }
      })


  }

  private showError(message: string){
  
    Swal.fire({
      icon: 'error',
      text: message,
      confirmButtonColor: '#398bf7'
    });
  
  }

}
