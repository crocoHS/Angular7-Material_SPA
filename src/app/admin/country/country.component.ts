import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

import { debounceTime } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Country } from '../../../services/country.service';

import { CountryItemIrt,CityInt } from '../../../storelocatto.interfaces';

import { UpdateComponent } from '../Modals/update/update.component';
import { InsertComponent } from '../Modals/insert/insert.component';
import { DeleteComponent } from '../Modals/delete/delete.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  
})
export class CountryComponent implements OnInit {
  newCountry:FormGroup;
  editCountry:FormGroup;
  filterCountry:FormGroup;
  filterCountryValue:string;
  countryObservable:Observable<CountryItemIrt[]>;
  edit_mode:boolean = false;
  show_this_form:string;
  edit_mode_cities_array:FormArray;

  constructor(private country:Country, private _snake_bar:MatSnackBar, private _dialog:MatDialog) { }

  ngOnInit() {
    //init filter
    this.filterCountry = new FormGroup({
      country_name: new FormControl(null)
    });
    this.filterCountry.valueChanges
    .pipe(debounceTime(1000))
    .subscribe((value)=>{
      this.filterCountryValue = value.country_name;
    });

    //init list
    this.get_all_countries();
  }

  active_edit_mode(country:CountryItemIrt) {
    //show form
    this.edit_mode = true;
    this.show_this_form = country.country_name;

    //generate all fields for cities
    this.edit_mode_cities_array = new FormArray([]);
    country.cities.forEach((element:CityInt) => {
      const city_control = new FormControl(element.city_name);
      this.edit_mode_cities_array.push(city_control);
    });

    //edit this country
    this.editCountry = new FormGroup({
      country_name:new FormControl(country.country_name),
      cities:this.edit_mode_cities_array
    });
  }

  end_edit_mode() {
    this.edit_mode = false;
    this.show_this_form = null;
  }

  target_this_form(country:string) {
    return this.show_this_form === country;
  }

  get_all_countries() {
    this.countryObservable = this.country.getAllItems();
  }

  insert_country() {
    const dialogRef = this._dialog.open(InsertComponent, { width: '450px'});
    dialogRef.afterClosed().subscribe(result=>{
      if(result) {
        const cities = result.cities.map((city:CityInt)=>{
          return {city_name:city};
        });
        const country_name = result.country_name;
        this.country.addItem({country_name,cities}).then(()=>{
          this._snake_bar.open("Record Was Inserted .",null,{duration: 2000});
        });
      }
    });
  }

  insert_city() {
    const city_control = new FormControl(null);
    this.edit_mode_cities_array.push(city_control);
  }

  delete_country(country_id:string) {
    const dialogRef = this._dialog.open(DeleteComponent, { width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.country.deleteItem(country_id).then(()=>{
          this.end_edit_mode();
          this._snake_bar.open("Record Was Deleted .",null,{duration: 2000});
        })
      }
    });
  }
  
  delete_city(delete_city:number) {
    this.edit_mode_cities_array.removeAt(delete_city);
  }

  update_country(country_id:string) {
    let item = {};
    let cities = [];

    cities = this.editCountry.value.cities.map((city)=> {
      return {city_name:city}
    });

    item = {
      country_id,
      body: {
        country_name:this.editCountry.value.country_name,
        cities:cities
      }
    };

    const dialogRef = this._dialog.open(UpdateComponent, { width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      this.country.updateItem(item).then(()=>{
          this.end_edit_mode();
          this._snake_bar.open("Record Was Updated .",null,{duration: 2000});
        });
      }
    });
  }

}
