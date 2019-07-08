import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { DynamicDialogComponent } from '../../Modals/dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(private dialogRef:MatDialogRef<DynamicDialogComponent>) { }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }

}
