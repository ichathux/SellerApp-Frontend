import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule


@Component({
  selector: 'app-confim-dialog',
  templateUrl: './confim-dialog.component.html',
  styleUrls: ['./confim-dialog.component.css']
})
export class ConfimDialogComponent {

  name : string = '';
  action : string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = data.itemName;
    this.action = data.action;
  }


  onNoClick(): void {
    // this.dialogRef.close();
  }
}
