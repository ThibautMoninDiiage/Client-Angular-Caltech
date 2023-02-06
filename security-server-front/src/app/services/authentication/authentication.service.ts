import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.interface';
import Constants from '../../utils/constants';
import { map, shareReplay } from 'rxjs';
import { UserDTO } from '../../models/userDTO.model';
import { Authentication } from 'src/app/models/authentication.interface';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private _http: HttpClient, private _router: Router) { }

  signIn(email: string, password: string) {
    var url = ""
    return this._http.post<Authentication>(`${Constants.baseUrl}/signin`, { mail: email, password: password, url: url }).pipe(
      map(res => {
        this.getUserToken(res.urlGrant)
        this._router.navigateByUrl('/auth/?' + res.codeGrant)
      }), shareReplay()
    )
  }

  getUserToken(codeGrant: string) {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(codeGrant)
    const code = urlParams.get("code")
    
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
