import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable} from 'rxjs';
import { Token } from 'src/app/models/token.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from '../../../models/user.interface';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userhttp$! : Observable<User>;

  constructor(private _userService: UserService, private _authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    const token = this._authenticationService.getToken()
    const decodedToken: Token = jwtDecode(token)
    this.userhttp$ = this._userService.getUserDetails(decodedToken.id)
  }

}
