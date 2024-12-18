import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environments.baseUrl;

  constructor(
    private http: HttpClient
  ){}


  listUsers(){

    const url = `${this.baseUrl}/users`;

    return this.http.get(url);

  }


  listRoles(){

    const url = `${this.baseUrl}/users/all-roles`;

    return this.http.get(url);

  }

}
