import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.interface';
import { User } from "../models/user.interface"

@Injectable({
  providedIn: 'root'
})

export class UserService {


  private readonly baseUrl = 'https://testfuncappgroupedeux.azurewebsites.net/api'
  constructor(private http: HttpClient) {}

    getUserDetails(userId : number): Observable<User> { 
      return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
   }

   getRoles(): Observable<Role[]> { 
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
}
