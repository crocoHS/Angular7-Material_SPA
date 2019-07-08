import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";

import { Auth } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  wrongUserOrPassword:Boolean = false;

  constructor(private auth:Auth) { }

  showUserTypes() {
    
  }

  ngOnInit() {
    this.auth.hideUserTypes();
  }

  ngOnDestroy() {
    this.auth.showUserTypes();
  }

  onSubmitLogin(loginForm:NgForm) {
    this.auth.logIn(loginForm.value).then((res)=>{
      this.auth.authUser(res.user.uid);
    },
    (err)=>{
      this.wrongUserOrPassword = true;
    })
  }

}
