import { Component,OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ClickTravelService } from './providers/click-travel.service';
import { Destination } from './models/destination.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Choose your dream destination...';
  destinations$!: Observable<Destination[]>;

  constructor(private travelService: ClickTravelService){}

  ngOnInit() {
    this.destinations$ = this.travelService.getDreamDestinations();
  }
}
