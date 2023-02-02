import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Application } from 'src/app/models/application.interface';
import { ApplicationService } from 'src/app/services/application.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-application.component.html',
  styleUrls: ['./dialog-delete-application.component.scss']
})
export class DeleteApplicationDialogComponent implements OnInit{
  hide = true;
  readyToDelete=false;
  primaryButtonVisual = "disabled";

  deleteForm = this.formBuilder.group({
    confirm : new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data : Application,private _applicationService : ApplicationService, private formBuilder: FormBuilder, private dialogRef : MatDialogRef<DeleteApplicationDialogComponent>) {}
  
  ngOnInit(): void {
    var componentReadyToWork = false;
    if(this.data != null)
      componentReadyToWork = this.data.name != null && this.data.id != null
    ;

    if(componentReadyToWork){
      this.deleteForm.valueChanges.subscribe(form => this.canDeleteCheck());  //Every time the form is updated, fire delete check
    }
    else{
      console.error("Data is invalid; refusing to open delete application dialog. \nData received is appended. Expecting Application.",this.data)
      this.dialogRef.close(false);
    }
  }

  //#region User Interaction
  cancel_clicked(): void {
    this.dialogRef.close(false);
  }

  async delete_clicked(): Promise<void> {
    if(this.readyToDelete){
      await firstValueFrom(this._applicationService.deleteApp(this.data.id!));
      this.dialogRef.close(true);
    }
  }
  //#endregion
  
  canDeleteCheck(){
    this.readyToDelete = this.deleteForm.value.confirm == this.data.name
    console.log("running delete check.")
  
    if(this.readyToDelete){
      this.primaryButtonVisual = "primary"
    }
    else{
      this.primaryButtonVisual = "disabled"
    }
  }
}
 