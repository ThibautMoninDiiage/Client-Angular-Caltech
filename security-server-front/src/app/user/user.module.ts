import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatNativeDateModule,
    MaterialModule,
  ]
})
export class UserModule { }
