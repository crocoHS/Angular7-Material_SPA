import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InsertComponent implements OnInit{
  newCountry:FormGroup;

  constructor(private dialogRef:MatDialogRef<InsertComponent>) { }

  ngOnInit() {
    this.newCountry = new FormGroup({
      country_name:new FormControl(null),
      cities:new FormArray([])
    });
  }

  add_new_city() {
    const city_control = new FormControl(null);
    (<FormArray>this.newCountry.get('cities')).push(city_control);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(this.newCountry.value);
  }

}
