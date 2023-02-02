import { Injectable } from '@angular/core';

import { JobAboutComponent } from './job-about.component';
import { ProfileAboutComponent } from './profile-about.component';
import { AboutItem } from './about-item';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  getAds() {
    return [
      new AboutItem(
        ProfileAboutComponent,
        { name: 'New Info : ', bio: 'This site is incredible' }
      ),
      new AboutItem(
        ProfileAboutComponent,
        { name: 'New Info : ', bio: 'New feature is available' }
      ),
      new AboutItem(
        JobAboutComponent,
        { headline: 'New Info : ', body: 'I hate thibaut' }
      ),
      new AboutItem(
        JobAboutComponent,
        { headline: 'New Info : ', body: 'Alexis go to work' }
      )
    ];
  }
}