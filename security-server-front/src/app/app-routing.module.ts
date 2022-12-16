import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: '', pathMatch: `full`, redirectTo: 'home' },
  {path: 'home', component: LoginComponent },
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'user-details-component', component: UserDetailsComponent},
  {path: 'notfound', component: NotfoundComponent },
  {path:'**',redirectTo:'notfound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
