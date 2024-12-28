import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../interfaces/user.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { CheckTokenResponse } from '../interfaces/check-token-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private router = inject(Router);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  public userSession: User;

  constructor(
    private http: HttpClient,
  ){}


  login(formData: LoginForm){

    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, formData)
      .pipe(
        map(({user, token}) => this.setAuthentication(user, token))
      )

  }

  checkAuthStatus(): Observable<boolean>{

    const token = localStorage.getItem('token');

    if(!token){
      
      this.logout();
      return of(false);

    }

    return this.http.get<CheckTokenResponse>(`${this.baseUrl}/auth/check-token`)
      .pipe(
        map(({user, token}) => {
          this.setAuthentication(user, token);
          return true;
        }),
        catchError(err => {
          this.logout();
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      )

  }


  logout(){

    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.router.navigateByUrl('/auth/login');

  }

  private setAuthentication(user: User, token: string){

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;

  }

}
