import { Component, OnInit } from '@angular/core';
import { MainTransService } from '../services/mainTrans.service';
import { Auth } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  direction_lang:string = 'ltr';

  constructor( private mainTransService:MainTransService, private angularFireAuth:AngularFireAuth, private auth:Auth) {
    //init default lang en
    this.mainTransService.set_lang('en');
  }

  ngOnInit() {
    //reload issue solved by onAuthStateChanged within app constructor
    this.angularFireAuth.auth.onAuthStateChanged((userAutheState)=>{
      if(userAutheState.uid) {
        this.auth.authUser(userAutheState.uid);
      }
    });
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