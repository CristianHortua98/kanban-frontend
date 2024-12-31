import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/interfaces/user.interface';
import { UserCreateForm } from '../interfaces/user-create-form.interface';
import { UserUpdateForm } from '../interfaces/user-update-form.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environments.baseUrl;

  constructor(
    private http: HttpClient
  ){}

  desactiveUser(id: number){

    const url = `${this.baseUrl}/users/desactive-user/${id}`;

    return this.http.delete(url);

  }

  updateUser(id: number, user: UserUpdateForm){

    const {password2, ...userData} = user;

    const url = `${this.baseUrl}/users/${id}`;

    return this.http.patch(url, userData);

  }

  createUser(user: UserCreateForm){

    const { password2, ...userData } = user;

    const url = `${this.baseUrl}/users`;

    return this.http.post(url, userData);

  }

  userDetail(id: number){

    const url = `${this.baseUrl}/users/${id}`;

    return this.http.get(url);

  }


  listUsers(){

    const url = `${this.baseUrl}/users`;

    return this.http.get(url);

  }


  listRoles(){

    const url = `${this.baseUrl}/users/all-roles`;

    return this.http.get(url);

  }

}
