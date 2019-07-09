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
}