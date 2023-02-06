import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/material.module';
import { RouterModule } from '@angular/router';
import { AboutBannerComponent } from '../about/about-banner.component';
import { JobAboutComponent } from '../about/job-about.component';
import { ProfileAboutComponent } from '../about/profile-about.component';
import { AboutDirective } from '../about/about.directive';


@NgModule({
  declarations: [ToolbarComponent,AboutBannerComponent,JobAboutComponent,ProfileAboutComponent,AboutDirective],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MaterialModule,
    RouterModule
  ],
  exports: [ToolbarComponent]
})
export class SharedModule { }
