import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentPortal } from '@angular/cdk/portal';

import { MainTransService } from '../../../../services/mainTrans.service';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent implements OnInit{

  portal:ComponentPortal<any>;
  title:string;
  current_lang_direction:string;

  constructor( @Inject(MAT_DIALOG_DATA) public data:any, private mainTransService:MainTransService ) { }

  ngOnInit() {
    this.portal = new ComponentPortal(this.data.component);
    this.title = this.data.title;
    this.current_lang_direction = this.mainTransService.get_current_direction();
  }

}
