import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import Constants from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  signIn(user: User) {
    return this._http.post(`${Constants.baseUrl}/signin`, user)
    .subscribe((res: any) => {
      this.setToken(res.token)
    })
  }

  signUp(user: User) {
    let api = `${Constants.baseUrl}/connexion`

    return this._http.post(api, user)
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token)
  }

}
