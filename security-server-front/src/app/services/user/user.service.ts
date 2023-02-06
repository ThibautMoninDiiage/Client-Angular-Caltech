import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../models/role.interface';
import { User } from "../../models/user.interface"
import Constants from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  getUserDetails(userId : string): Observable<User> {
    return this.http.get<User>(`${Constants.baseUrl}/users/${userId}`);
   }

   getRoles(): Observable<Role[]> { 
    return this.http.get<Role[]>(`${Constants.baseUrl}/roles`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${Constants.baseUrl}/panelAdmin`);
  }

  postUser(user: User): Observable<User> {
    var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
     return this.http.post<User>(`${Constants.baseUrl}/panelAdmin`, user,{ headers });

    
  }
}
