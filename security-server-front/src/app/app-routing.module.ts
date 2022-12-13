import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ApplicationListComponent } from './application-list/application-list/application-list.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'user-details-component', component: UserDetailsComponent},
  {path: 'app-application-list', component: ApplicationListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
