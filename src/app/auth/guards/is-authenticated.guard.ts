import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map(isAuthenticated => {

      if(isAuthenticated){
        
        return true;
      
      }else{

        router.navigateByUrl('/auth/login');
        return false;

      }

    })
  )

};
