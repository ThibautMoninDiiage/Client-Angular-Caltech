import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const token : string = sessionStorage.getItem('access_token')!

        if(token){
            const cloned = request.clone({
                headers: request.headers.set('Bearer', token)
            });
            return next.handle(cloned);
        }
        else{
            return next.handle(request)
        }
    }
}