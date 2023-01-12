import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { DialogAddApplicationComponent } from './components/dialog-add-application/dialog-add-application.component';
import { DialogLinkUserComponent } from './components/dialog-link-user/dialog-link-user.component';


@NgModule({
  declarations: [AdminPanelComponent, DialogAddUserComponent, ApplicationListComponent,DialogAddApplicationComponent,DialogAddApplicationComponent, DialogLinkUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatNativeDateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
