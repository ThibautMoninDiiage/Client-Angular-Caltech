import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.interface';
import Constants from '../../utils/constants';
import { map, shareReplay } from 'rxjs';
import { UserDTO } from '../../models/userDTO.model';
import { Authentication } from 'src/app/models/authentication.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  signIn(email: string, password: string) {
    var url = ""
    return this._http.post<Authentication>(`${Constants.baseUrl}/signin`, { mail: email, password: password, url: url }).pipe(
      map(res => {
        window.location.href = res.urlGrant
        this.getUserToken(res.urlGrant)
      }), shareReplay()
    )
  }

  getUserToken(codeGrant: string) {
    const queryString = window.location.search
    console.log(queryString)
    
    return this._http.post<UserDTO>(`${Constants.baseUrl}/AuthenticateGrant`, { codeGrant: "" }).pipe(
      map(res => {
        this.setToken(res.token)
      }), shareReplay()
    )
  }

  signUp(user: User) {
    return this._http.post(`${Constants.baseUrl}/signup`, user)
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('access_token')!)
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token)
  }

}
