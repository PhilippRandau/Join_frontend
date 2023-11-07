import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorServiceService implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const Token = localStorage.getItem('token');

    if (Token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Token ${Token}`)
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => err)
      })
    );
  }
}
