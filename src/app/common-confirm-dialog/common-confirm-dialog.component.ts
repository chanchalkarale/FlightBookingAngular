import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/_models/confirm-dialog-data.model';
@Component({
  selector: 'app-common-confirm-dialog',
  templateUrl: './common-confirm-dialog.component.html',
  styleUrls: ['./common-confirm-dialog.component.css']
})
export class CommonConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  ngOnInit(): void {
  }

}
