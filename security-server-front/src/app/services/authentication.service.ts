import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Todo : Changer la variable locale en constante utilisable globalement
  private _apiEndpoint: string = 'https://testfuncappgroupedeux.azurewebsites.net/api'

  constructor(private _http: HttpClient) { }

  signIn(user: User) {
    return this._http.post(`${this._apiEndpoint}/signin`, user)
    .subscribe((res: any) => {
      this.setToken(res.token)
    })
  }

  signUp(user: User) {
    let api = `${this._apiEndpoint}/connexion`

    return this._http.post(api, user)
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token)
  }

}
