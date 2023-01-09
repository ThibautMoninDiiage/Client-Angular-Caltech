import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Application } from '../../../models/application.interface';
import { ApplicationService } from '../../../services/application/application.service';

@Component({
  selector: 'dialog-add-application',
  templateUrl: './dialog-add-application.component.html',
  styleUrls: ['./dialog-add-application.component.scss']
})

export class DialogAddApplicationComponent {

  hide = true;
  application!: Application;
  myreg = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi // regex hautement explosif ne pas toucher

  applicationForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
    url: new FormControl('', [Validators.required, Validators.pattern(this.myreg)])
  });

  constructor(private formBuilder: FormBuilder, private _applicationService: ApplicationService) { }

  getErrorMessage() {
    if (this.applicationForm.controls.name.hasError('required')
      || this.applicationForm.controls.description.hasError('required')
      || this.applicationForm.controls.url.hasError('required')) {
      return 'You must enter a valid value';
    }

    return this.applicationForm.controls.name.hasError('name') ? 'Not a valid name' : '';
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      this.application = {
        name: this.applicationForm.value.name as string,
        description: this.applicationForm.value.description as string,
        url: this.applicationForm.value.url as string
      }

    // this._applicationService.postApplication(this.application)

    }

    console.log('Profile form data :: ', this.application);

  }
}
