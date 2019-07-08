import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  authBoxLoaded:boolean;

  constructor(private auth:Auth) { }

  ngOnInit() {
    this.auth.authCustomRootRoute.subscribe((value)=>{
      this.authBoxLoaded = value;
    });
  }

}
