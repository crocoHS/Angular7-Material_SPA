import { Injectable,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface loginObjInt {
    email:string;
    password:string;
}

export interface registerUserDoc {
    fName:string;
    sName:string;
    uid:string;
}

export interface registerUser {
    email:string;
    password:string;
}

@Injectable()
export class Auth {
    isLoggedIn = false;
    authCustomRootRoute:Subject<any>;
    itemsCollection: AngularFirestoreCollection<registerUserDoc>;
    currentUid:string;

    constructor(private db:AngularFirestore, private angularFireAuth:AngularFireAuth, private router:Router, private _ngZone:NgZone) {
        this.authCustomRootRoute = new Subject();
        this.itemsCollection = this.db.collection<registerUserDoc>('users');
    }

    async register(registerObj:any): Promise<any> {
        const res = await this.angularFireAuth.auth.createUserWithEmailAndPassword(registerObj.email, registerObj.password);
        this.itemsCollection.add({
            fName: registerObj.fName,
            sName: registerObj.sName,
            uid: res.user.uid
        });
        this.authUser(res.user.uid);
    }

    logIn(loginObj:loginObjInt): Promise<any> {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(loginObj.email, loginObj.password);
    }

    authUser(uid:string) {
        this.currentUid = uid;
        this.isLoggedIn = true;
        this.redirect_to_url('/admin');
    }

    getCurrentUserData() {
        return this.db.collection('users',ref => ref.where('uid','==',this.currentUid)).valueChanges();
    }

    logOut(): void {
        this.isLoggedIn = false;
    }

    redirect_to_url(url:string) {
        this._ngZone.run(()=>{
            this.router.navigate([url]);
        });
    }

    hideUserTypes() {
        this.authCustomRootRoute.next('none');
    }

    showUserTypes() {
        this.authCustomRootRoute.next('block');
    }

}