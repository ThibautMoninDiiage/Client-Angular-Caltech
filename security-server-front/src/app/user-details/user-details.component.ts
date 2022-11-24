import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.interface';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

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
  userhttp! : User;
  roles$! : Observable<Role[]>; 

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // this.userService.getUserDetails(1).subscribe(result => {
    //   this.userhttp = result;
    // })

    this.roles$ = this.userService.getRoles();
  }

}
