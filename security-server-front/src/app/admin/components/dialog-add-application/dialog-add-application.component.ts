import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';
import { Application } from '../../../models/application.interface';


@Component({
  selector: 'dialog-add-application',
  templateUrl: './dialog-add-application.component.html',
  styleUrls: ['./dialog-add-application.component.scss']
})

export class DialogAddApplicationComponent implements OnInit {

  hide = true;
  application!: Application;
  myreg = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi // regex hautement explosif ne pas toucher
  edit = false;
  labelButton = "Create";
  applicationForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    url: new FormControl('', [Validators.required, Validators.pattern(this.myreg)]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Application,private formBuilder: FormBuilder, private _applicationService: ApplicationService, public dialog: MatDialogRef<DialogAddApplicationComponent>) { }

  async ngOnInit() {
    if (this.data != null && this.data != undefined) {
      this.edit = true;
      this.labelButton = "Edit";
        this.applicationForm.setValue({
          name: this.data.name,
          description: this.data.description,
          url: this.data.url
        });
    }
  }

  getErrorMessage() {
    if (this.applicationForm.controls.name.hasError('required')
      || this.applicationForm.controls.description.hasError('required')
      || this.applicationForm.controls.url.hasError('required')) {
      return 'You must enter a valid value';
    }

    return this.applicationForm.controls.name.hasError('name') ? 'Not a valid name' : '';
  }

  async onSubmit() {
    if (this.applicationForm.valid) {
      this.application = {
        name: this.applicationForm.value.name as string,
        description: this.applicationForm.value.description as string,
        url: this.applicationForm.value.url as string,
      }

      if(!this.edit) {
        await firstValueFrom(this._applicationService.postApplication(this.application))
      }
      else
      {
        this.application.id = this.data.id;
        await firstValueFrom(this._applicationService.putApplication(this.application));
      }

      this.dialog.close(this.application)
    }
  }

}
