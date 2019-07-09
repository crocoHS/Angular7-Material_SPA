//core modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

//user directives
import { mustMatchDirective } from './app/user/mustMatch.directive';

//user components
import { UserComponent } from '../src/app/user/user.component';
import { LoginComponent } from '../src/app/user/login/login.component';
import { RegisterComponent } from '../src/app/user/register/register.component';

//material componetns
import { MaterialModule } from './shared.module';

const admin_routes:Routes = [
    {
        path:'',
        component:UserComponent,
        children: [
            { path:'login',component:LoginComponent },
            { path:'register',component:RegisterComponent },
        ]
    }
]

@NgModule({
    declarations: [
        UserComponent,
        LoginComponent,
        RegisterComponent,
        mustMatchDirective,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(admin_routes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        
    ],
    providers: []
  })
export class User { }