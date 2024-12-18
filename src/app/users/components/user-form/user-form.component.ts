import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Role } from '../../../auth/interfaces/user.interface';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit, AfterViewInit{

  public userForm: FormGroup;

  public roles: Role[];

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService
  ){}
  
  ngOnInit(): void {

    this.userForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      document: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    })

    this.loadRoles();

  }

  ngAfterViewInit(): void {

    // $('.select2').select2();
    // $("#your-select-element").select2();
    
    // $("#your-select-element").select2();

  }

  saveUser(){

    

  }

  loadRoles(){

    this.userService.listRoles()
      .subscribe({
        next: (listRoles: Role[]) => {
          this.roles = listRoles;
        },
        error: (err) => {

          Swal.fire({
            title: 'Attetion',
            icon: 'warning',
            text: 'Not load Roles.',
            confirmButtonColor: '#398bf7'
          })

        }
      })

  }

}
