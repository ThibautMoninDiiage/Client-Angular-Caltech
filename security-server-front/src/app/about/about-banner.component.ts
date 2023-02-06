import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AboutDirective } from './about.directive';
import { AboutItem } from './about-item';
import { TimerHandle } from 'rxjs/internal/scheduler/timerHandle';
import { AboutService } from './about.service';
import { About } from '../models/about.interface';

@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <ng-template adHost></ng-template>
    </div>
  `
})

export class AboutBannerComponent implements OnInit, OnDestroy {

  constructor(private _myService: AboutService){}

  @Input() ads: AboutItem[] = this._myService.getAds();

  currentAdIndex = -1;

  @ViewChild(AboutDirective, {static: true}) adHost!: AboutDirective;
  interval: TimerHandle|undefined;

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {

    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const viewContainerRef = this.adHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<About>(adItem.component);
    componentRef.instance.bio = adItem.data.bio;
    componentRef.instance.body = adItem.data.body;
    componentRef.instance.headline = adItem.data.headline;
    componentRef.instance.name = adItem.data.name;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}