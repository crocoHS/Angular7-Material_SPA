import { Component, OnInit } from '@angular/core';

import { Auth } from '../../services/auth.service';
import { MainTransService } from '../../services/mainTrans.service';

import { take } from "rxjs/operators";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentUserName:string;
  authCustom:string;
  current_drawer_position:string;
  current_lang_dir:string;

  constructor(private auth:Auth,private mainTransService:MainTransService) { }

  ngOnInit() {
    this.auth.getCurrentUserData().pipe(
      take(1)
    ).subscribe((user:any)=>{
      this.currentUserName = user[0].fName;
    });
    this.auth.authCustomRootRoute.pipe(
      take(1)
    ).subscribe((value:string)=>{
      this.authCustom = value;
    });
    //get lang value to adjust drawer position for ar and en
    const lang_value = this.mainTransService.get_current_lang();
    switch(lang_value) {
      case "ar" :
        this.current_drawer_position = "right";
        this.current_lang_dir = "rtl";
        break;
      case 'en' :
        this.current_drawer_position = "left";
        this.current_lang_dir = "ltr";
        break;
    }
  }

  
  Logout() {
    this.auth.logOut();
  }

}