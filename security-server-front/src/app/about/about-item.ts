import { Type } from '@angular/core';
import { About } from '../models/about.interface';
import { JobAboutComponent } from './job-about.component';
import { ProfileAboutComponent } from './profile-about.component';

export class AboutItem {
  constructor(public component: Type<JobAboutComponent | ProfileAboutComponent>, public data: About) {}
}