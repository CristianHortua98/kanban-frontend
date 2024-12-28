import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/interfaces/user.interface';

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

  updateUser(id: number, user: User){

    const url = `${this.baseUrl}/users/${id}`;

    return this.http.patch(url, user);

  }

  createUser(user: User){

    const url = `${this.baseUrl}/users`;

    return this.http.post(url, user);

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
