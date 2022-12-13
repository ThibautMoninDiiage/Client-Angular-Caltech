import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  hide = true;
  // email = new FormControl('', [Validators.required, Validators.email]);
  // username = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]);
  // avatar = new FormControl('', [Validators.required]);
  // password = new FormControl('', [Validators.required, Validators.minLength(5)]);

  myreg = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi // regex hautement explosif ne pas toucher

  userForm = this.formBuilder.group({
    email : new FormControl('', [Validators.required, Validators.email]),
  username : new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
  avatar : new FormControl('', [Validators.required, Validators.pattern(this.myreg)]),
  password : new FormControl('', [Validators.required, Validators.minLength(5)]),
  role: new FormControl(''),
  });

  user! :User;
  
  constructor(private formBuilder: FormBuilder,private _userService: UserService) {}

  getErrorMessage() {
    if (this.userForm.controls.email.hasError('required') || this.userForm.controls.username.hasError('required') || this.userForm.controls.avatar.hasError('required') || this.userForm.controls.password.hasError('required')){
      return 'You must enter valid a value';
    }
    
    return this.userForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    if(this.userForm.valid){
      this.user = {
        username: this.userForm.value.username as string,
        mail: this.userForm.value.email as string,
        avatar: this.userForm.value.avatar as string,
        password: this.userForm.value.password as string,
        role: {name: this.userForm.value.role as string}
      }
      console.log('Profile form data :: ', this.user);

      //this._userService.postUser(this.user);
    }
  }
}
