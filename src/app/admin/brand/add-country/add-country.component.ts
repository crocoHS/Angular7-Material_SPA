import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, debounceTime, take } from 'rxjs/operators';

import { MatDialogRef } from '@angular/material/dialog';

import { Country } from '../../../../services/country.service';

import { CountryInt } from '../../../../storelocatto.interfaces';

import { DynamicDialogComponent } from '../../Modals/dynamic-dialog/dynamic-dialog.component';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {

  newCountry_ctrl:FormControl;
  filterdOpitions:Observable<CountryInt[]>;

  constructor(private dialogRef:MatDialogRef<DynamicDialogComponent>, private country:Country) { }

  ngOnInit() {
    //new country ctrl
    this.newCountry_ctrl = new FormControl();
    //test value
    this.newCountry_ctrl.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe((value:any)=>{
      if(value.country_name) {
        return value;
      } else {
        this.filterdOpitions = this.country.find_country(value).valueChanges()
        .pipe(
          take(1),
          map((country:any) => country)
        )
      }
    })
  }

  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(this.newCountry_ctrl.value);
  }

  displayFn(country?: CountryInt): string | undefined {
    return country ? country.country_name : undefined;
  }

}
