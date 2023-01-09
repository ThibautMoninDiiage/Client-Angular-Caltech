import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  {path: '', pathMatch: `full`, redirectTo: 'home' },
  {path: 'admin', loadChildren: () =>import('src/app/admin/admin.module').then(m => m.AdminModule)},
  {path: 'user', loadChildren: () =>import('src/app/user/user.module').then(m => m.UserModule)},
  {path: 'home', component: LoginComponent },
  {path: 'notfound', component: NotfoundComponent },
  {path:'**',redirectTo:'notfound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
