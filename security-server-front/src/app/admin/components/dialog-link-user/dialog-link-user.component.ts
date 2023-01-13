import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
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
  myControl = new FormControl<string | User>('');
  userAppRole! :UserAppRole;
  roles$!: Observable<Role[]>;
  users$!: Observable<User[]>;
  filteredOptions$!: Observable<User[]>;
  users! : User[];

  userForm = this.formBuilder.group({
  role: new FormControl(''),

  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private formBuilder: FormBuilder,private _userService: UserService,private _applicationService: ApplicationService,private dialogRef: MatDialogRef<DialogLinkUserComponent>) {}

  ngOnInit() {
    this.roles$ = this._userService.getRoles();
    this.users$ = this._applicationService.getUserNotInApp(this.data);
    console.log(this.data+ ' id de app');

    this.users$.subscribe(users => {this.users = users as User[];});

    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const mail = typeof value === 'string' ? value : value?.mail;
        return mail ? this._filter(mail as string) : this.users.slice();
      }),
    );
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.users.filter(user => user.mail.toLowerCase().includes(filterValue));
  }

  displayFn(user: User): string {
    return user && user.mail ? user.mail : '';
  }

  async onSubmit() {
    if(this.userForm.valid){
      this.userAppRole = {
        role: {name: this.userForm.value.role as string},
        idUser: 1,
        idApplication: this.data

      }
      console.log('Profile form data :: ', this.userAppRole);
      await firstValueFrom(this._userService.addUserToApp(this.userAppRole));


      this.dialogRef.close(this.userAppRole);
  
    }
  }
}
