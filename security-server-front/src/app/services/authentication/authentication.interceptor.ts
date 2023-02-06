import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // On récupère le token dans le local storage
    const token = sessionStorage.getItem('access_token')

    // Si le token existe, alors on clone et modifie la requête HTTP en passant le token dans le header
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer' + token)
      })

      return next.handle(cloned)
    }

    // Sinon on retourne la requête non modifiée
    return next.handle(request);
  }
}
