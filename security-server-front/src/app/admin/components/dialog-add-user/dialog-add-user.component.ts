import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';
import { Application } from 'src/app/models/application.interface';
import { Role } from '../../../models/role.interface';
import { User } from '../../../models/user.interface';
import { UserService } from '../../../services/user.service';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  hide = true;
  user! :User;
  roles$!: Observable<Role[]>;
  apps$!: Observable<Application[]>;
  create = true;
  myreg = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi // regex hautement explosif ne pas toucher
  labelButton = "Create"
  userForm = this.formBuilder.group({
    email : new FormControl('', [Validators.required, Validators.email]),
    username : new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
    avatar : new FormControl('', [Validators.required, Validators.pattern(this.myreg)]),
    password : new FormControl('', [Validators.required, Validators.minLength(5)]),
    role: new FormControl(''),
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    application: new FormControl(''),
  });

  
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private formBuilder: FormBuilder,private _userService: UserService,private _applicationService: ApplicationService,private dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  ngOnInit() {
    this.roles$ = this._userService.getRoles();
    this.apps$ = this._applicationService.getApplications();

    if (this.data != null && this.data != undefined) {
      this.create = false;
      this.labelButton = "Edit";

      this.userForm.controls.application.disable();
      this.userForm.controls.password.disable();
      this.userForm.controls.role.disable();


      this.userForm.setValue({
        email: this.data.mail,
        username: this.data.username,
        avatar: this.data.avatar,
        firstname: this.data.firstname!,
        lastname: this.data.lastname!,
        password: null,
        application: null,
        role: null,
      });
    }

  }
  getErrorMessage() {
    if (this.userForm.controls.email.hasError('required') || this.userForm.controls.username.hasError('required') || this.userForm.controls.avatar.hasError('required') || this.userForm.controls.password.hasError('required')){
      return 'You must enter a valid value';
    }
    
    return this.userForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  async onSubmit() {
    if(this.userForm.valid){
      this.user = {
        username: this.userForm.value.username as string,
        mail: this.userForm.value.email as string,
        avatar: this.userForm.value.avatar as string,
        firstname: this.userForm.value.firstname as string,
        lastname: this.userForm.value.lastname as string
      };

      if(this.create) {
        this.user.password = this.userForm.value.password as string;
        this.user.role = {name: this.userForm.value.role as string};
        this.user.idApplication = this.userForm.value.application as unknown as number;

        await firstValueFrom(this._userService.postUser(this.user));
      }
      
      else
      {
        this.user.id = this.data.id;
        await firstValueFrom(this._userService.putUser(this.user));
      }

      this.dialogRef.close(this.user);
    }
  }
}
