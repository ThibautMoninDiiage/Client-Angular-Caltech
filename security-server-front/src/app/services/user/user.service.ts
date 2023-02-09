import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role.interface';
import { User } from 'src/app/models/user.interface';
import { UserAppRole } from 'src/app/models/userAppRole.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _http: HttpClient) {}

  getUserDetails(userId : string): Observable<User> { 
    return this._http.get<User>(`${environment.apiBaseUrl}/users/${userId}`);
   }

   getRoles(): Observable<Role[]> { 
    return this._http.get<Role[]>(`${environment.apiBaseUrl}/roles`);
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.apiBaseUrl}/panelAdmin`);
  }

  postUser(user: User): Observable<User> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
     return this._http.post<User>(`${environment.apiBaseUrl}/panelAdmin`, user,{ headers });
  }

  addUserToApp(userAppRole: UserAppRole): Observable<boolean> {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this._http.post<boolean>(`${environment.apiBaseUrl}/users/AddUser`,userAppRole,{ headers});
  }
  
  deleteUser(userId: number): Observable<boolean> {
    return this._http.delete<boolean>(`${environment.apiBaseUrl}/users/${userId}`);
  }

  putUser(application: User): Observable<User> {
    return this._http.put<User>(`${environment.apiBaseUrl}/users`, application)
  }

}
