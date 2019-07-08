//core modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//firebase modules
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

//app guards
import { AuthGuard } from './auth/auth.guard';

//main app components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

//app environment
import { environment } from '../environments/environment';

//app service
import { Auth } from '../services/auth.service';

//app main routes
const app_routes:Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'admin',
    loadChildren:'../admin.module#Admin',
    canActivate: [AuthGuard]
  },
  {
    path:'user',
    loadChildren:'../user.module#User'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(app_routes)
  ],
  providers: [Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
