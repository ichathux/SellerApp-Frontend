import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-view-inventory-item',
  templateUrl: './view-inventory-item.component.html',
  styleUrls: ['./view-inventory-item.component.css'],
})
export class ViewInventoryItemComponent {
  item: any;
  price: number = 0;
  qty: number = 0;
  variants: [] = [];
  mainImg = '';
  sanitizedHtml: any;
  desc: any = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private axios: AxiosService,
    private sanitizer: DomSanitizer
  ) {
    this.item = data.inventory;
    this.price = data.inventory.lowestPrice;
    this.qty = data.inventory.variants[0].qty;
    this.variants = data.inventory.variants;
    this.mainImg = data.inventory.image;
    this.item.itemDescriptionShort = this.manipulateShortDescription(
      this.item.itemDescription,
      200
    );
    this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.item.itemDescription
    );
    // this.selectedVatiant.qty = data.inventory.qty;
  }
  manipulateShortDescription(itemDescription: string, length: number): string {
    if (itemDescription.length > length) {
      return itemDescription.substring(0, length);
    }
    return itemDescription;
  }

  onOptionSelectedVariants(event: any): void {
    const selectedValue = event.target.value;
    console.log('Selected option:', selectedValue);
    // console.log(this.variants[selectedValue]['name'])
    this.price = this.variants[selectedValue]['price'];
    this.qty = this.variants[selectedValue]['qty'];
  }
  onClickImageSetToMain(img: string) {
    this.mainImg = img;
  }

  selectedVatiant: any;
  selectedValue: string[] = [];
  showQty: boolean = false;

  onToggleChange(i: number) {
    console.log(this.selectedValue);
    console.log(i);
    if (this.selectedValue.length == this.item.variantsList.length) {
      this.selectedVatiant = this.findExactVariantForSelected();
      this.onClickImageSetToMain(this.selectedVatiant.img);
      this.showQty = true;
    }
  }

  findExactVariantForSelected(): any {
    loop1: for (let element of this.item.variants) {
      let arr: string[] = element.name;
      console.log('check matching variant for ', arr);
      if (arr.length !== this.selectedValue.length) {
        continue loop1;
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== this.selectedValue[i]) {
          continue loop1;
        }
      }
      console.log(element);
      return element;
      // break loop1;
    }
  }

  toggleContent(): void {
    // You can add logic here to toggle content visibility
  }
}
