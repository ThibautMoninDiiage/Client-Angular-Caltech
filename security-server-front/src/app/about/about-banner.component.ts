import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AboutDirective } from './about.directive';
import { AboutItem } from './about-item';
import { AboutComponent } from './about.component';
import { TimerHandle } from 'rxjs/internal/scheduler/timerHandle';
import { AboutService } from './about.service';

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

    const componentRef = viewContainerRef.createComponent<AboutComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}