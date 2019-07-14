import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-insert',
  templateUrl: './brand.insert.component.html',
  styleUrls: ['./brand.insert.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BrandInsertComponent implements OnInit{
  newBrand:FormGroup;
  locations_array:FormArray;
  countries_array:FormArray;

  constructor(private dialogRef:MatDialogRef<DynamicDialogComponent>) { }

  ngOnInit() {
    //all locations
    this.locations_array = new FormArray([]);
    this.countries_array = new FormArray([]);
    //the form
    this.newBrand = new FormGroup({
      brand_name:new FormControl(null),
      brand_background_color:new FormControl(null),
      brand_logo:new FormControl(null),
      countries:this.countries_array,
      locations:this.locations_array
    });
  }

  add_new_location() {
    //single location
    const location = new FormGroup({
      loc_name: new FormControl(null),
      loc_phone: new FormControl(null),
      longitude: new FormControl(null),
      latitude: new FormControl(null),
      loc_address: new FormControl(null),
      loc_city: new FormControl(null)
    });
    (<FormArray>this.newBrand.get('locations')).push(location);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(this.newBrand.value);
  }

}
