import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//admin services
import { Country } from './services/country.service';

//admin components
import { CountryComponent } from './app/admin/country/country.component';
import { AdminComponent } from './app/admin/admin.component';
import { UpdateComponent } from './app/admin/Modals/update/update.component';
import { InsertComponent } from './app/admin/Modals/insert/insert.component';
import { DeleteComponent } from './app/admin/Modals/delete/delete.component';

//admin filters
import { CountriesPipe } from './app/admin/Filters/countries.filter';

//material componetns
import { MaterialModule } from './shared.module';

const admin_routes:Routes = [
    {
        path:'',
        component:AdminComponent,
        children: [
            { path:'country',component:CountryComponent }
        ]
    }
]

@NgModule({
    declarations: [
        AdminComponent,
        CountryComponent,
        UpdateComponent,
        InsertComponent,
        DeleteComponent,
        CountriesPipe
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(admin_routes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        RouterModule
    ],
    entryComponents: [
        UpdateComponent,
        InsertComponent,
        DeleteComponent
    ],
    providers: [Country]
  })
export class Admin { }