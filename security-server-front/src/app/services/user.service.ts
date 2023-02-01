import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.interface';
import { User } from "../models/user.interface"
import { UserAppRole } from '../models/userAppRole.interface';
import Constants from '../utils/constants';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _http: HttpClient) {}

  getUserDetails(userId : number): Observable<User> { 
    return this._http.get<User>(`${Constants.baseUrl}/users/${userId}`);
   }

   getRoles(): Observable<Role[]> { 
    return this._http.get<Role[]>(`${Constants.baseUrl}/roles`);
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${Constants.baseUrl}/panelAdmin`);
  }

  postUser(user: User): Observable<User> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
     return this._http.post<User>(`${Constants.baseUrl}/panelAdmin`, user,{ headers });
  }

  addUserToApp(userAppRole: UserAppRole): Observable<boolean> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this._http.post<boolean>(`${Constants.baseUrl}/users/AddUser`,userAppRole,{ headers});
  }
  
  deleteUser(userId: number): Observable<boolean> {
    return this._http.delete<boolean>(`${Constants.baseUrl}/users/${userId}`);
  }

}
