import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


}
