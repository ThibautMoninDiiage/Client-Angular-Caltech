import { Component } from '@angular/core'
import { AnimationOptions } from 'ngx-lottie'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../services/authentication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  hide = true;
  options: AnimationOptions = {
    path: './assets/animations/home-animation.json',
  }
  form!: FormGroup

  constructor(private _formBuilder: FormBuilder, private _authenticationService: AuthenticationService, private _router: Router) {
    this.form = this._formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    })
  }

  getErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value'
    }

    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : ''
  }

  onLogin() {
    if (this.form.value.email && this.form.value.password) {
      this._authenticationService.signIn(this.form.value.email, this.form.value.password!)
        .subscribe(() => {
          console.log(`Toto l'idiot a réussi a se connecté.`);
          this._router.navigateByUrl('/admin-panel')
      })
    }
  }

}
