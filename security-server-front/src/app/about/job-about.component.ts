import { Component, Input } from '@angular/core';

import { AboutComponent } from './about.component';

@Component({
  template: `
    <div class="container">
      <div class="job-ad">
        <p>{{data.headline}} {{data.body}}<p>
      </div>
    </div>
  `
})
export class JobAboutComponent implements AboutComponent {
  @Input() data: any;
}