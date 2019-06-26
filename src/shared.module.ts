import { NgModule } from "@angular/core";

import { 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule
} from '@angular/material';
import {
    MatExpansionModule
} from '@angular/material/expansion';

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
        MatIconModule
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
        MatIconModule
    ]
})
export class MaterialModule { }