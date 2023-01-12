import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';
import { Application } from 'src/app/models/application.interface';
import { Role } from '../../../models/role.interface';
import { UserService } from '../../../services/user.service';
import { ApplicationService } from '../../../services/application.service';
import { UserAppRole } from 'src/app/models/userAppRole.interface';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/models/user.interface';


@Component({
  selector: 'app-dialog-link-user',
  templateUrl: './dialog-link-user.component.html',
  styleUrls: ['./dialog-link-user.component.scss']
})
export class DialogLinkUserComponent {
  hide = true;
  userAppRole! :UserAppRole;
  roles$!: Observable<Role[]>;
  users$!: Observable<User[]>;

  userForm = this.formBuilder.group({
  role: new FormControl(''),

  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private formBuilder: FormBuilder,private _userService: UserService,private _applicationService: ApplicationService,private dialogRef: MatDialogRef<DialogLinkUserComponent>) {}

  ngOnInit() {
    this.roles$ = this._userService.getRoles();
    //this.users$ = this._applicationService.getUserNotInApp(this.data);
  }

  async onSubmit() {
    if(this.userForm.valid){
      this.userAppRole = {
        role: {name: this.userForm.value.role as string},
        idUser: 1,
        idApplication: this.data

      }
      console.log('Profile form data :: ', this.userAppRole);
      //await firstValueFrom(this._applicationService.postUserAppRole(this.userAppRole));


      this.dialogRef.close(this.userAppRole);
  
    }
  }
}
