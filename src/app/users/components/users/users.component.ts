import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  public users: User[];
  public countUsers: number = 0;


  constructor(

    private userService: UserService,
    private authService: AuthService

  ){}

  ngOnInit(): void {

    this.loadUsers();

  }

  desactiveUser(user: User){

    if(this.authService.currentUser().id === user.id){
      Swal.fire({
        title: 'Attetion!',
        text: `It cannot eliminate itself`,
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure you want to delete the User?',
      text: `Delete the User: ${user.fullname}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete User!',
    }).then((result) => {

      if(result.isConfirmed){

        this.userService.desactiveUser(user.id)
          .subscribe({
            next: resp => {
              Swal.fire({
                title: 'Deleted!',
                text: `User: ${user.fullname} has been deleted.`,
                icon: 'success',
              })

              this.loadUsers();

            },
            error: err => {

              Swal.fire({
                title: 'Attetion!',
                text: `${err.error.message}`,
                icon: 'error',
              });
              this.loadUsers();

            }
          })

      }

    })

  }


  loadUsers(){

    this.userService.listUsers()
      .subscribe({
        next: (resp: User[]) => {
          console.log(resp);
          this.users = resp;
          this.countUsers = resp.length;
        }
      })

  }


}
