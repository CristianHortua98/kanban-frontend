import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  let request = req;

  if(token){

    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    })

  }

  // console.log(request);

  return next(request);
};
