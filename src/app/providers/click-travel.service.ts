import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Destination } from '../models/destination.interface';

@Injectable()

export class ClickTravelService {

  destinations! : Observable<Destination[]>;

  private readonly baseURL = 'https://travel-api.clicksomeone.com/';

  constructor(private http: HttpClient) {   }

  getDestinations(): Observable<Destination[]>{
    return this.http.get<Destination[]>(`${this.baseURL}/destinations`)
  }

  getDreamDestinations(){
    return this.getDestinations().pipe(
      map(destinations => destinations.filter(des => des.isDreamDestination))
    )
  }

}
