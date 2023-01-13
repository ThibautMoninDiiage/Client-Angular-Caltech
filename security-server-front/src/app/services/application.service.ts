import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Application } from '../models/application.interface';
import { User } from '../models/user.interface';
import Constants from '../utils/constants';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {

  constructor(private _httpClient: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this._httpClient.get<Application[]>(`${Constants.baseUrl}/${Constants.applicationEndpoint}`)
      .pipe(map((application) => {
        return application
      }))
  }

  postApplication(application: Application): Observable<Application> {
    return this._httpClient.post<Application>(`${Constants.baseUrl}/${Constants.applicationEndpoint}`, application)
  }

  // getUserByAppid(appId: number): Observable<User[]> {
  //   return this._httpClient.get<User[]>(`${Constants.baseUrl}//${Constants.applicationEndpoint}/aledun/${appId}`);
  //  } Si le temps pour optimisation de requête 

   getUserNotInApp(appId: number): Observable<User[]> {
    return this._httpClient.get<User[]>(`${Constants.baseUrl}//${Constants.applicationEndpoint}/users/${appId}`);
   }

}
