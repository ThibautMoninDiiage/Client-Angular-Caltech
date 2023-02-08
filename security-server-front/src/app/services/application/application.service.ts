import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Application } from 'src/app/models/application.interface';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {

  constructor(private _httpClient: HttpClient) { }

  getApplications(): Observable<Application[]> {
    return this._httpClient.get<Application[]>(`${environment.apiBaseUrl}/application`)
      .pipe(map((application) => {
        return application
      }))
  }

  postApplication(application: Application): Observable<Application> {
    return this._httpClient.post<Application>(`${environment.apiBaseUrl}/application`, application)
  }

  putApplication(application: Application): Observable<Application> {
    return this._httpClient.put<Application>(`${environment.apiBaseUrl}/application`, application)
  }

   getUserNotInApp(appId: number): Observable<User[]> {
    return this._httpClient.get<User[]>(`${environment.apiBaseUrl}/application/users/${appId}`);
   }

   deleteApp(appId: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(`${environment.apiBaseUrl}/application/${appId}`);
   }
}
