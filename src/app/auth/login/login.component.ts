import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  loginForm: FormGroup;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ){

    this.loginForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    })

  }


  ngOnInit(): void {

    if(this.authService.authStatus() === AuthStatus.authenticated){
      this.router.navigateByUrl('/cas-kanban');
    }

  }


  login(){

    this.formSubmitted = true;

    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: resp => {

          this.router.navigateByUrl('/cas-kanban');

        },
        error: err => {

          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: err.error.message,
            confirmButtonColor: '#398bf7'
          })

        }
      })

  }

  fieldNoValid(campo: string): boolean{

    if(this.loginForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }

  }


}
