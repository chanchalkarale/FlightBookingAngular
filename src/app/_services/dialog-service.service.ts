import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConfirmDialogComponent } from '../common-confirm-dialog/common-confirm-dialog.component';
import { ConfirmDialogData } from '../_models/confirm-dialog-data.model';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog: MatDialog) { }
  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(CommonConfirmDialogComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }
}
