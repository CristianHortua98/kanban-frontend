import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Role, User } from '../../../auth/interfaces/user.interface';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

declare var $: any

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  public userForm: FormGroup;
  public roles: Role[];
  public userSelected: User;
  public rolesNew: number[];

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}
  
  ngOnInit(): void {

    this.rolesNew = [];

    this.userForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      document: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]],
      phone: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      // roles: [[], [Validators.required]]
      roles: this.fb.array([], Validators.required)
    })

    this.loadRoles();

    this.activatedRoute.params.subscribe(({id}) => {
      this.loadUser(id);
    })


  }

  saveUser(){

    if(this.userSelected){

      //ACTUALIZAR USER
      this.userService.updateUser(this.userSelected.id, this.userForm.value)
        .subscribe({
          next: (resp) => {

            Swal.fire({
              text: `User: ${this.userSelected.fullname} updated`,
              icon: 'success',
              confirmButtonColor: '#398bf7'
            })

            this.router.navigateByUrl(`/cas-kanban/users`);

          },
          error: (err) => {

            this.showError(err.error.message);

          }
        })


    }else{

      //CREAR USER
      this.userService.createUser(this.userForm.value)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              text: 'User created successfully.',
              confirmButtonColor: '#398bf7'
            })

            this.router.navigateByUrl(`/cas-kanban/users`);

          },
          error: (err) => {

            this.showError(err.error.message);

          }	
        })
    }

  }

  loadUser(id: number){

    if(isNaN(Number(id))){
      return;
    }

    this.userService.userDetail(id)
      .pipe(
        tap((userResp: User) => {

          const { roles } = userResp;

          const rolesFormArray = this.userForm.get('roles') as FormArray;
          // console.log({rolesFormArray})
          rolesFormArray.clear(); // Limpiar roles anteriores
          roles.forEach(role => {
            rolesFormArray.push(this.fb.control(role.id));
          });


        })
      )
      .subscribe({
        next: (user: User) => {

          if(!user){
            this.router.navigateByUrl(`/cas-kanban/users`);
            return;
          }

          const { fullname, document, email, phone, username, roles } = user;
          this.userSelected = user;

          this.userForm.patchValue({ fullname, document, email, phone, username });

        },
        error: (err) => {

          this.router.navigateByUrl(`/cas-kanban/users`);
        }

      })


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

  onChangeCheckbox(role: Role, event: Event) {

    const checkbox = event.target as HTMLInputElement;
  
    if (checkbox.checked) {
      this.addRole(role.id);
    } else {
      this.removeRole(role.id);
    }
  }

  private addRole(roleId: number){

    const rolesFormArray = this.userForm.get('roles') as FormArray;

    if(!rolesFormArray.controls.some(ctrl => ctrl.value === roleId)){
      rolesFormArray.push(this.fb.control(roleId));
    }

  }

  private removeRole(roleId: number){

    const rolesFormArray = this.userForm.get('roles') as FormArray;

    const index = rolesFormArray.controls.findIndex(ctrl => ctrl.value === roleId);
    if(index >= 0){
      rolesFormArray.removeAt(index);
    }

  }

  private showError(message: string){

    Swal.fire({
      icon: 'error',
      text: message,
      confirmButtonColor: '#398bf7'
    });

  }

}
