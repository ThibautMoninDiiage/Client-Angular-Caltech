import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Role } from '../../../models/role.interface';
import { User } from '../../../models/user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User = {
    username : "ShibaTheHut",
    mail : "thehut@goobdoy.org",
    avatar : "https://material.angular.io/assets/img/examples/shiba1.jpg",
    role : {name: "Regular"}
  }
  userhttp$! : Observable<User>;
  roles$! : Observable<Role[]>; 

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.userhttp$ = this._userService.getUserDetails(1);
    this.roles$ = this._userService.getRoles();
  }

}