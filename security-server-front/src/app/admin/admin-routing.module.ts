import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';

const routes: Routes = [
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'application-list', component: ApplicationListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
