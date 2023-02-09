import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.interface';
import Constants from '../../utils/constants';
import { map, shareReplay } from 'rxjs';
import { UserDTO } from '../../models/userDTO.model';
import { Authentication } from 'src/app/models/authentication.interface';
import { ActivatedRoute, Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private _http: HttpClient, private _router: Router,private _route:ActivatedRoute) { }

  signIn(email: string, password: string) {

    var secret = this._route.snapshot.queryParamMap.get("secret");
    if(secret != null){
      return this._http.post<Authentication>(`${Constants.baseUrl}/signin`, { mail: email, password: password, secretCode: secret }).pipe(
        map(res => {
          window.location.href = (res.redirectUri+"?code="+res.codeGrant)
        }), shareReplay()
      )
    }
    else{
      secret = "e7f84649-25e7-4bdd-856b-5682a0f52d58"
      return this._http.post<Authentication>(`${Constants.baseUrl}/signin`, { mail: email, password: password, secretCode: secret }).pipe(
        map(res => {
          window.location.href = (res.redirectUri+"?code="+res.codeGrant)
        }), shareReplay()
      )
    }
  }

  getUserToken(codeGrant: string) {
    return this._http.post<UserDTO>(`${Constants.baseUrl}/authenticateGrant`, { codeGrant: codeGrant }).pipe(
      map(res => {
        window.location.href = res.urlRedirect
        this.clearToken()
        this.setToken(res.token)
      }), shareReplay()
    )
  }

  signUp(user: User) {
    return this._http.post(`${Constants.baseUrl}/signup`, user)
  }

  getToken(): string {
    return sessionStorage.getItem('access_token')!
  }

  setToken(token: string) {
    sessionStorage.setItem('access_token', token)
  }

  clearToken() {
    sessionStorage.clear()
  }

}
