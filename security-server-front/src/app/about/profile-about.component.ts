import { Component, Input } from '@angular/core';
import { About } from '../models/about.interface';

@Component({
  template: `
    <div class="container">
      <div class="hero-profile">
        <p>{{name}} {{bio}}</p>
      </div>
    </div>
  `
})
export class ProfileAboutComponent implements About {
  @Input() name?: string;
  @Input() bio? : string;
}