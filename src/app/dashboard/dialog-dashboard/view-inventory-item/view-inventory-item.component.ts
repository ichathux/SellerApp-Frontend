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
  price : number = 0;
  qty : number = 0;
  variants : [] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private axios : AxiosService){

    this.item = data.inventory;
    this.price = data.inventory.lowestPrice;
    this.qty = data.inventory.variants[0].qty;
    this.variants = data.inventory.variants;
  }

  onOptionSelectedVariants(event: any) : void{
    const selectedValue = event.target.value;
    console.log('Selected option:', selectedValue);
    // console.log(this.variants[selectedValue]['name'])
    this.price = this.variants[selectedValue]['price'];
    this.qty = this.variants[selectedValue]['qty'];
  }
}
