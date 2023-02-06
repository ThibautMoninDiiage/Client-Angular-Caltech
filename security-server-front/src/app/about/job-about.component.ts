import { Component, Input } from '@angular/core';
import { About } from '../models/about.interface';

@Component({
  template: `
    <div class="container">
      <div class="job-ad">
        <p>{{headline}} {{body}}<p>
      </div>
    </div>
  `
})
export class JobAboutComponent implements About {
  @Input() headline?: string;
  @Input() body?: string;
}