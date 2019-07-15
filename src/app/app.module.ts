//core modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { environment } from '../environments/environment.prod';

//app service
import { Auth } from '../services/auth.service';
import { MainTransService } from '../services/mainTrans.service';

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

//factory for httpLoadeder
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    RouterModule.forRoot(app_routes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [Auth,MainTransService],
  bootstrap: [AppComponent]
})
export class AppModule { }
