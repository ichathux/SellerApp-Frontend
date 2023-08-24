import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-view-inventory-item',
  templateUrl: './view-inventory-item.component.html',
  styleUrls: ['./view-inventory-item.component.css']
})
export class ViewInventoryItemComponent {

  item : any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private axios : AxiosService){

    this.item = data.inventory;
  }
}
