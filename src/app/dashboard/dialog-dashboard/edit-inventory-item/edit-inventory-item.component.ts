import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from 'src/app/axios.service';
import { AppConfig } from 'src/app/config';

@Component({
  selector: 'app-edit-inventory-item',
  templateUrl: './edit-inventory-item.component.html',
  styleUrls: ['./edit-inventory-item.component.css']
})

export class EditInventoryItemComponent {

  inventory : any ;
  imageUrl : any;
  
  qtyArray: number[] = [];
  priceArray: number[] = [];
  selectedFile: File | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private axios : AxiosService, 
  private spinner : NgxSpinnerService, 
  private http : HttpClient,
  private toastr : ToastrService){

    console.log(data.inventory)
    this.inventory = data.inventory;
    this.imageUrl = data.inventory.image;

    this.qtyArray = new Array(data.inventory.variants.length);
    this.priceArray = new Array(data.inventory.variants.length);
    let i = 0;
    for(let v of data.inventory.variants){
     this.qtyArray[i] = v.qty;
     this.priceArray[i] = v.price;
     i++;
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  formData: FormData = new FormData();

  update(){
    this.spinner.show();
    this.formData.append('name',this.inventory.name);
    this.formData.append('id',this.inventory.id);
      this.formData.append('itemDescription', this.inventory.itemDescription);
      this.formData.append('customField1', this.qtyArray[0] !== undefined ? this.qtyArray[0].toString() : '0');
      this.formData.append('customField1Price', this.priceArray[0] !== undefined ? this.priceArray[0].toString() : '0');
      this.formData.append('customField2', this.qtyArray[1] !== undefined ? this.qtyArray[1].toString() : '0');
      this.formData.append('customField2Price', this.priceArray[1] !== undefined ? this.priceArray[1].toString() : '0');
      this.formData.append('customField3', this.qtyArray[2] !== undefined ? this.qtyArray[2].toString() : '0');
      this.formData.append('customField3Price', this.priceArray[2] !== undefined ? this.priceArray[2].toString() : '0');
      this.formData.append('customField4', this.qtyArray[3] !== undefined ? this.qtyArray[3].toString() : '0');
      this.formData.append('customField4Price', this.priceArray[3] !== undefined ? this.priceArray[3].toString() : '0');
      this.formData.append('customField5', this.qtyArray[4] !== undefined ? this.qtyArray[4].toString() : '0');
      this.formData.append('customField5Price', this.priceArray[4] !== undefined ? this.priceArray[4].toString() : '0');
      this.formData.append('customField6', this.qtyArray[5] !== undefined ? this.qtyArray[5].toString() : '0');
      this.formData.append('customField6Price', this.priceArray[5] !== undefined ? this.priceArray[5].toString() : '0');
      this.formData.append('variantType', this.inventory.currentVariant);

      const newImg = this.imageUrl;
      const oldImg = this.inventory.image;
      const isImgChanged : boolean= newImg === oldImg;
      if(isImgChanged){
        console.log("image not changed")
        this.formData.append('imgUrl', this.inventory.image);
        this.formData.append('delete_url', this.inventory.publicId);
        this.formData.append('isImageUpdated','false')
        this.sendUpdateRequest();
      }else{
        this.uploadImage();
      }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const epochTimeInSeconds: number = Math.floor(new Date().getTime() / 1000);
      const newFileName: string = epochTimeInSeconds.toString()+ localStorage.getItem("requestToken");
      const renamedFile = new File([this.selectedFile], newFileName, { type: this.selectedFile.type });
      const formData = new FormData();
      formData.append('file', renamedFile);
      formData.append('upload_preset', 'timlw13j');
      const url = `${AppConfig.cloudinaryApiPrefix}${AppConfig.cloudinaryCloudName}${AppConfig.cloudinaryApiPostfix}`;
      this.http.post<any>(url, formData).subscribe(
        response => {
          this.formData.append('imgUrl', response.secure_url);
          this.formData.append('delete_url', response.public_id);
          this.formData.append('isImageUpdated','true')
          this.sendUpdateRequest();
        },
        error => {
          console.error('Error uploading:', error);
          this.toastr.show(error);
          this.spinner.hide();
        }
      );
    }
  }

  sendUpdateRequest(){
    this.axios.request("PUT", "api/inventory/update", this.formData).then(res => {
      console.log(res);
      
      this.toastr.show("Done");
    }).catch(err => {
      console.log(err);
      this.toastr.show(err);
      this.spinner.hide();
    })
  }
}
