import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'securityServerFront';
  hide = true;
  options: AnimationOptions = {
    path: './assets/animations/home-animation.json',
  };

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
