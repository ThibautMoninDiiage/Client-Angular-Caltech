import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MaterialModule,
    RouterModule
  ],
  exports: [ToolbarComponent]
})
export class SharedModule { }
