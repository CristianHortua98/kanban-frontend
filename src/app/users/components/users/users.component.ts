import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  public users: User[];
  public countUsers: number = 0;


  constructor(

    private userService: UserService

  ){}

  ngOnInit(): void {

    this.loadUsers();

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
