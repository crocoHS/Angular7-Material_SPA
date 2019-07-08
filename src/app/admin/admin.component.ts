import { Component, OnInit } from '@angular/core';

import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  currentUserName:string;
  authCustom:string;

  constructor(private auth:Auth) { }

  ngOnInit() {
    this.auth.getCurrentUserData().subscribe((user:any)=>{
      this.currentUserName = user[0].fName;
    });
    this.auth.authCustomRootRoute.subscribe((value:string)=>{
      this.authCustom = value;
    })
  }

}
