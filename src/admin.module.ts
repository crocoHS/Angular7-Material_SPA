//core module
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

//admin services
import { Country } from './services/country.service';
import { Brand } from './services/brand.service';

//admin components
import { CountryComponent } from './app/admin/country/country.component';
import { BrandComponent } from './app/admin/brand/brand.component';
import { AdminComponent } from './app/admin/admin.component';
import { UpdateComponent } from './app/admin/Modals/update/update.component';
import { CountryInsertComponent } from './app/admin/Modals/country_insert/country.insert.component';
import { BrandInsertComponent } from './app/admin/Modals/brand_insert/brand.insert.component';
import { DeleteComponent } from './app/admin/Modals/delete/delete.component';
import { DynamicDialogComponent } from './app/admin/Modals/dynamic-dialog/dynamic-dialog.component';
import { AddCountryComponent } from './app/admin/brand/add-country/add-country.component';

//admin filters
import { PostTypePipe } from './app/admin/Filters/posttype.filter';

//material componetns
import { MaterialModule } from './shared.module';

const admin_routes:Routes = [
    {
        path:'',
        component:AdminComponent,
        children: [
            { path:'country',component:CountryComponent },
            { path:'brand',component:BrandComponent }
        ]
    }
]

@NgModule({
    declarations: [
        AdminComponent,
        CountryComponent,
        BrandComponent,
        UpdateComponent,
        CountryInsertComponent,
        BrandInsertComponent,
        DeleteComponent,
        PostTypePipe,
        DynamicDialogComponent,
        AddCountryComponent
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
        UpdateComponent,
        CountryInsertComponent,
        BrandInsertComponent,
        DeleteComponent,
        DynamicDialogComponent,
        AddCountryComponent
    ],
    providers: [Country,Brand]
  })
export class Admin { }