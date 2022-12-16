import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MaterialModule,
  ],
  exports: [ToolbarComponent]
})
export class SharedModule { }
