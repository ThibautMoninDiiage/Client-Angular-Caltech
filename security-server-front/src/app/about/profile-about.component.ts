import { Component, Input } from '@angular/core';

import { AboutComponent } from './about.component';

@Component({
  template: `
    <div class="container">
      <div class="hero-profile">
        <p>{{data.name}} {{data.bio}}</p>
      </div>
    </div>
  `
})
export class ProfileAboutComponent implements AboutComponent {
  @Input() data: any;
}