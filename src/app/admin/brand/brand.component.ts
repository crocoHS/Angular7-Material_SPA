import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Brand } from '../../../services/brand.service';
import { Country } from '../../../services/country.service';
import { Auth } from '../../../services/auth.service';

import { BrandItemItr, location } from '../../../storelocatto.interfaces';

import { UpdateComponent } from '../Modals/update/update.component';
import { BrandInsertComponent } from '../Modals/brand_insert/brand.insert.component';
import { DeleteComponent } from '../Modals/delete/delete.component';
import { DynamicDialogComponent } from '../Modals/dynamic-dialog/dynamic-dialog.component';
import { AddCountryComponent } from '../brand/add-country/add-country.component';

@Component({
  selector: 'app-country',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit, OnDestroy {

  BrandObservable:Observable<BrandItemItr[]>;
  editBrand:FormGroup;
  edit_mode:boolean = false;
  show_this_form:string;
  edit_mode_locations_array:FormArray;
  edit_mode_countries_array:FormArray;
  collected_cities_array:string[] = [];
  location_group:FormGroup;
  filterBrand:FormGroup;
  filterBrandValue:string;
  current_selected_brand:BrandItemItr;

  constructor(private brand:Brand, private country:Country, private _snake_bar:MatSnackBar, private _dialog:MatDialog, private auth:Auth) { }

  ngOnInit() {
    //init filter
    this.filterBrand = new FormGroup({
      brand_name: new FormControl(null)
    });
    this.filterBrand.valueChanges
    .pipe(debounceTime(1000))
    .subscribe((value)=>{
      this.filterBrandValue = value.brand_name;
    });
    //get all brands
    this.get_all_brands();
    //clear admin page style
    this.auth.authCustomRootRoute.next("none");
  }

  ngOnDestroy() {
    this.auth.authCustomRootRoute.next("block");
  }

  get_all_brands() {
    this.BrandObservable = this.brand.getAllItems();
  }

  target_this_form(brand:string) {
    return this.show_this_form === brand;
  }

  end_edit_mode() {
    this.edit_mode = false;
    this.show_this_form = null;
  }

  active_edit_mode(brand:BrandItemItr) {
    //show form
    const self = this;
    this.current_selected_brand = brand;
    this.edit_mode = true;
    this.show_this_form = brand.brand_name;

    //generate all fields for countries and related cities
    this.edit_mode_countries_array = new FormArray([]);
    this.collected_cities_array = [];
    brand.countries.forEach((element:string) => {
      const country = new FormControl(element);
      this.edit_mode_countries_array.push(country);
      this.country.get_country(element).pipe(
        take(1)
      )
      .subscribe((result:any)=>{
        result[0].cities.forEach((city)=>{
          self.collected_cities_array.push(city.city_name);
        })
      });
    });

    //generate all fields for locations
    this.edit_mode_locations_array = new FormArray([]);
    brand.locations.forEach((element:location) => {
      //location formgroup
      const location_group = new FormGroup({
        loc_name: new FormControl(element.loc_name),
        loc_phone: new FormControl(element.loc_phone),
        longitude: new FormControl(element.longitude),
        latitude: new FormControl(element.latitude),
        loc_address: new FormControl(element.loc_address),
        loc_city: new FormControl(element.loc_city)
      });
      //push formgroup to the locations array
      this.edit_mode_locations_array.push(location_group);
    });

    //edit this brand
    this.editBrand = new FormGroup({
      brand_name: new FormControl(brand.brand_name),
      brand_background_color: new FormControl(brand.brand_background_color),
      brand_logo: new FormControl(brand.brand_logo),
      countries: this.edit_mode_countries_array,
      locations: this.edit_mode_locations_array
    });

  }

  insert_brand() {
    const dialogRef = this._dialog.open(DynamicDialogComponent, 
      { 
        width: '450px',
        height: '450px',
        data: {
          component: BrandInsertComponent,
          title: "ADMIN.BRAND.insert_new_brand"
        }
      }
    );
    dialogRef.afterClosed().subscribe(result=>{
      if(result) {
        this.brand.addItem(result).then(()=>{
          this._snake_bar.open("Record Was Inserted .",null,{duration: 2000});
        });
      }
    });
  }

  insert_location() {
    const location_group = new FormGroup({
      loc_name: new FormControl(null),
      loc_phone: new FormControl(null),
      longitude: new FormControl(null),
      latitude: new FormControl(null),
      loc_address: new FormControl(null),
      loc_city: new FormControl(null) 
    });
    this.edit_mode_locations_array.push(location_group);
  }

  update_brand(brand_id:string) {
    const dialogRef = this._dialog.open(DynamicDialogComponent, {
      width: '250px',
      data: {
        component:UpdateComponent,
        title:"ADMIN.BRAND.update_brand"
      }
    });
    dialogRef.afterClosed().pipe(
      take(1)
    )
    .subscribe(result => {
      if(result) {
      this.brand.updateItem({brand_id,body:this.editBrand.value}).then(()=>{
          this.end_edit_mode();
          this._snake_bar.open("Record Was Updated .",null,{duration: 2000});
        });
      }
    });
  }

  //while in edit mode cities collection will be updated
  update_collected_cities(collect_condition:number | string) {
    const self = this;
    this.collected_cities_array = [];
    
    if(typeof collect_condition === "number") {
      this.current_selected_brand.countries.splice(collect_condition,1);
    }

    if(typeof collect_condition === "string") {
      this.current_selected_brand.countries.push(collect_condition)
    }

    this.current_selected_brand.countries.forEach((element:string) => {
      this.country.get_country(element).pipe(
        take(1)
      )
      .subscribe((result:any)=>{
        result[0].cities.forEach((city)=>{
          self.collected_cities_array.push(city.city_name);
        })
      });
    });
  }

  delete_location(location_index:number) {
    this.edit_mode_locations_array.removeAt(location_index);
  }

  delete_brand(brand_id:string) {
    const dialogRef = this._dialog.open(DynamicDialogComponent, {
      width: '250px',
      data: {
        component: DeleteComponent,
        title: "ADMIN.BRAND.delete_brand"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.brand.deleteItem(brand_id).then(()=>{
          this.end_edit_mode();
          this._snake_bar.open("Record Was Deleted .", null, {duration: 2000});
        })
      }
    });
  }

  insert_country() {
    const dialogRef = this._dialog.open(
      DynamicDialogComponent, { 
        width: '250px',
        data: { 
          component: AddCountryComponent
        }
      });
      dialogRef.afterClosed().pipe(
        take(1)
      )
      .subscribe(result => {
        const newCountry = new FormControl(result.country_name);
        this.edit_mode_countries_array.push(newCountry);
        //update the collected cities as per countries
        this.update_collected_cities(result.country_name);
      });
  }

  delete_country(countryIndex:number) {
    this.edit_mode_countries_array.removeAt(countryIndex);
    //update the collected cities as per countries
    this.update_collected_cities(countryIndex);
  }

  add_location_city(locationIndex:number,cityName:string) {
    this.edit_mode_locations_array.controls[locationIndex].setValue({
      ...this.edit_mode_locations_array.value[locationIndex],
      loc_city:cityName
    });
  }

}
