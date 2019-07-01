import { NgModule } from "@angular/core";

import { 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatAutocompleteModule
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PortalModule } from '@angular/cdk/portal'

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatDialogModule,
        MatIconModule,
        MatSidenavModule,
        MatAutocompleteModule,
        PortalModule
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatDialogModule,
        MatIconModule,
        MatSidenavModule,
        MatAutocompleteModule,
        PortalModule
    ]
})
export class MaterialModule { }