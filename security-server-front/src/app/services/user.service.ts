import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.interface';
import { User } from "../models/user.interface"
import Constants from '../utils/constants';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  getUserDetails(userId : number): Observable<User> { 
    return this.http.get<User>(`${Constants.baseUrl}/users/${userId}`);
   }

   getRoles(): Observable<Role[]> { 
    return this.http.get<Role[]>(`${Constants.baseUrl}/roles`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${Constants.baseUrl}/users`)
  }
}
