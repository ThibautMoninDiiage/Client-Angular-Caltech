import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Role } from '../../../models/role.interface';
import { User } from '../../../models/user.interface';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userhttp$! : Observable<User>;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.userhttp$ = this._userService.getUserDetails(8)
  }

}
