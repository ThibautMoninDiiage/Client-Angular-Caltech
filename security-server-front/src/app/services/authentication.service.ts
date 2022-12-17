import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import Constants from '../utils/constants';
import jwtDecode from 'jwt-decode';
import { map, shareReplay } from 'rxjs';
import { UserDTO } from '../models/userDTO.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private _http: HttpClient) { }

  signIn(email: string, password: string) {
    return this._http.post<UserDTO>(`${Constants.baseUrl}/signin`, { mail: email, password: password }).pipe(
      map(res => this.setToken(res.token)),
      shareReplay()
    )
  }

  signUp(user: User) {
    let api = `${Constants.baseUrl}/signup`

    return this._http.post(api, user)
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token)
  }

}
