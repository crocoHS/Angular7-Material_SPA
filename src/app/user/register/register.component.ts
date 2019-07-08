import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Auth } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(private auth:Auth) { }

  ngOnInit() {
    this.auth.hideUserTypes();
  }

  ngOnDestroy() {
    this.auth.showUserTypes();
  }

  onSubmitRegister(regForm:NgForm) {
    // const newUser = {...registerForm.value}
    // this.auth.register(newUser);
    console.log(regForm);
  }

}
