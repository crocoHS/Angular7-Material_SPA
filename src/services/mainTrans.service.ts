import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MainTransService {
    current_lang:string;

    constructor(private translate:TranslateService) {}

    set_lang(lang:string) {
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
        this.current_lang = lang;
    }

    get_current_lang() {
        return this.current_lang;
    }

    get_current_direction() {
        switch(this.current_lang) {
            case "ar" :
                return "rtl";
            case 'en' :
                 return "ltr";
        }
    }
}