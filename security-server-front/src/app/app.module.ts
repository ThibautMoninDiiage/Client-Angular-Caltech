import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MaterialExampleModule} from '../material.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ApplicationListComponent } from './application-list/application-list/application-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    UserDetailsComponent,
    LoginComponent,
    AdminPanelComponent,
    ApplicationListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function playerFactory() {
  return import('lottie-web');
}