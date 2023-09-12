import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from 'src/app/axios.service';
import { AppConfig } from 'src/app/config';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-edit-inventory-item',
  templateUrl: './edit-inventory-item.component.html',
  styleUrls: ['./edit-inventory-item.component.css'],
})
export class EditInventoryItemComponent {
  inventory: any;
  imageUrl: any;

  qtyArray: number[] = [];
  priceArray: number[] = [];
  selectedFile: File | undefined;
  editorConfig = AppConfig.editorConfig;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private apiService: ApiServiceService
  ) {
    console.log(data.inventory);
    this.inventory = data.inventory;
    this.imageUrl = data.inventory.image;
  }

  isChecked = true;

  update() {
    this.spinner.show();
    console.log(this.inventory);
    this.apiService.put('api/inventory/update', this.inventory).subscribe(
      (res) => {
        console.log(res);
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
    this.toastr.show('Done');
  }
}
