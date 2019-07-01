import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'post_type_filter'
})
export class PostTypePipe implements PipeTransform {
    transform(value:any,filter_value:string) {
        if(filter_value) {

            let filterd_post_type = value.filter((post_type)=>{
                //check post_type
                if(post_type.country_name != undefined) {
                    return post_type.country_name.includes(filter_value);
                } else if(post_type.brand_name != undefined) {
                    return post_type.brand_name.includes(filter_value);
                }
            });
            return filterd_post_type;

        } else {
            return value;
        }
    }
}