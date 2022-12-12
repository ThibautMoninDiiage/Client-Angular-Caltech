import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Todo : Changer la variable locale en constante utilisable globalement
  private _apiEndpoint: string = 'https://testfuncappgroupedeux.azurewebsites.net/'

  constructor(private _http: HttpClient, public router: Router) { }

  signIn() {

  }

  signUp(user: User) {
    let api = `${this._apiEndpoint}/signup`
    
    return this._http.post(api, user)
  }

  getToken() {

  }

}
