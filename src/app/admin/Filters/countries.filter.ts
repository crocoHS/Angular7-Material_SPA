import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'countries'
})
export class CountriesPipe implements PipeTransform {
    transform(value:any,filter_value:string) {
        if(filter_value) {
            let filterd_countries = value.filter((country)=>{
                return country.country_name.includes(filter_value);
            });
            return filterd_countries;
        } else {
            return value;
        }
    }
}