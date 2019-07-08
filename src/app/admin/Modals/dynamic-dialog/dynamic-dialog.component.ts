import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent implements OnInit{

  portal:ComponentPortal<any>;
  title:string;

  constructor( @Inject(MAT_DIALOG_DATA) public data:any ) { }

  ngOnInit() {
    this.portal = new ComponentPortal(this.data.component);
    this.title = this.data.title;
  }

}
