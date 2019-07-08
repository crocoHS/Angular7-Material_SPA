import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent{

  constructor(public dialogRef:MatDialogRef<DynamicDialogComponent>) { }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

}
