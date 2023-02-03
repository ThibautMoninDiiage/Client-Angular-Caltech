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
        this.getUserToken(res.urlGrant)
      }), shareReplay()
    )
  }

  getUserToken(codeGrant: string) {
    console.log(codeGrant)
    
    const queryString = window.location.search
    console.log(queryString)
    const urlParams = new URLSearchParams(codeGrant)
    console.log(urlParams)
    const code = urlParams.get("code")
    console.log(code)
    
    return this._http.post<UserDTO>(`${Constants.baseUrl}/authenticateGrant`, { codeGrant: "" }).pipe(
      map(res => {
        this.setToken(res.token)
        window.location.href = codeGrant
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
