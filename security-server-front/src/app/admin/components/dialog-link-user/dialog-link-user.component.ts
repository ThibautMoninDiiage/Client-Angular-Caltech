import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { Role } from '../../../models/role.interface';
import { UserService } from '../../../services/user.service';
import { ApplicationService } from '../../../services/application.service';
import { UserAppRole } from 'src/app/models/userAppRole.interface';
import { User } from 'src/app/models/user.interface';


@Component({
  selector: 'app-dialog-link-user',
  templateUrl: './dialog-link-user.component.html',
  styleUrls: ['./dialog-link-user.component.scss']
})
export class DialogLinkUserComponent implements OnInit {
  hide = true;
  //myControl = new FormControl<string | User>('');
  userAppRole! :UserAppRole;
  roles$!: Observable<Role[]>;
  // users$!: Observable<User[]>;
  filteredOptions$!: Observable<User[]>;
  users: User[] = [];

  userForm = this.formBuilder.group({
  role: new FormControl(''),
  userMail: new FormControl<string | User>('')

  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private formBuilder: FormBuilder,private _userService: UserService,private _applicationService: ApplicationService,private dialogRef: MatDialogRef<DialogLinkUserComponent>) {}

  async ngOnInit() {
    this.roles$ = this._userService.getRoles();
    this._applicationService.getUserNotInApp(this.data).subscribe(res => { this.users = res; console.log(res);});

    // this.users$.subscribe(res => this.users = res as User[]);
    this.filteredOptions$ = this.userForm.controls.userMail.valueChanges.pipe(
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
        userId: (this.userForm.value.userMail as User).id!,
        applicationId: this.data

      }
      await firstValueFrom(this._userService.addUserToApp(this.userAppRole));


      this.dialogRef.close(this.userAppRole);
  
    }
  }
  
  onCancel() {
    if(confirm('Are you sure you want to cancel the modifications ?')){
      this.dialogRef.close();
    }
  }
}
