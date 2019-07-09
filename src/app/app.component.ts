import { Component } from '@angular/core';
import { MainTransService } from '../services/mainTrans.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  direction_lang:string = 'ltr';

  constructor( private mainTransService:MainTransService) { 
    //init default lang en
    this.mainTransService.set_lang('en');
  }

  choose_lang(lang:string) {
    switch(lang) {
      case 'ar':
        this.direction_lang = 'rtl';
        break;
      case 'en':
          this.direction_lang = 'ltr';
        break;
    }
    this.mainTransService.set_lang(lang);
  }
}