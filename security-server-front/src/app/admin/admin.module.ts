import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminPanelComponent, DialogAddUserComponent],
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
