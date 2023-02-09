import { Component, DoCheck, AfterContentInit } from '@angular/core'
import { AuthenticationService } from 'src/app/services/authentication/authentication.service'
import jwt_decode from 'jwt-decode'
import { Token } from 'src/app/models/token.interface'
import { User } from '../../../models/user.interface';
import { UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements DoCheck, AfterContentInit {

  firstLoad: boolean = false;
  token!: string;
  decodedToken!: Token;
  userhttp$! : Observable<User>;
  
  constructor(private _authenticationService: AuthenticationService, private _userService: UserService) {}

  ngDoCheck(): void {
    this.token = this._authenticationService.getToken();
    if(this.token != "" && this.token != null && !this.firstLoad)
    {
      this.getuserDetails();
      this.firstLoad = true;
    } 
  }

  ngAfterContentInit() {
    //this.getuserDetails();
  }

  getuserDetails() {
    
    this.decodedToken = jwt_decode(this.token);
    this.userhttp$ = this._userService.getUserDetails(this.decodedToken.id)
    this.userhttp$.subscribe(data => {console.log(data)});
      
      
  }
  
  onSignOut() {
    this._authenticationService.clearToken()
  }

}