import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

function matching(controlName:string,controlMustMatchName:string) {
    return (formGroup:FormGroup)=>{
        const control = formGroup.controls[controlName];
        const controlMustMatch = formGroup.controls[controlMustMatchName];

        if(!control || !controlMustMatch) {
            return null;
        }

        if(controlMustMatch.errors && !controlMustMatch.errors.mustMatch) {
            return null;
        }

        if(control.value !== controlMustMatch.value) {            
            controlMustMatch.setErrors({mustMatch:true});
            console.log("error was set");
        } else {
            controlMustMatch.setErrors(null);
        }
    }
}

@Directive({
    selector:'[mustMatch]',
    providers:[{provide:NG_VALIDATORS, useExisting:mustMatchDirective, multi:true}]
})
export class mustMatchDirective implements Validator{
    @Input('mustMatch') mustMatch:string[] = [];

    validate(formGroup:FormGroup):ValidationErrors {
        return matching(this.mustMatch[0],this.mustMatch[1])(formGroup);
    }

}