import { Component, EventEmitter, Output } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-make-excel-file-page',
  templateUrl: './make-excel-file-page.component.html',
  styleUrls: ['./make-excel-file-page.component.css']
})
export class MakeExcelFilePageComponent {

  constructor(private axiosService : AxiosService){}

  items: any[] = [];
  customerName : string = "";
  contactNo : string = "";
  email : string = "";
  address : string = "";
  city : string = "";
  orderDescription : string = "";
  price : number = 0;
  deliveryCharge : number = 0;
  deliveryPartner : string = "";
  country : string = "";
  
  addItem() {
    this.items.push({ 
      customer:{ 
        name : this.customerName,
        contactNo: this.contactNo,
        district : this.city,
        address : this.address,
        country : this.country,
        email : this.email
      },
      price : this.price,
      deliveryCharge : this.deliveryCharge,
      status : 5,
      createdAt : null,
      updatedAt : null,
      sellerDetails : null
     });
    this.customerName = '';
    this.contactNo = '';
    this.email = '';
    this.address = '';
    this.city = '';
    this.orderDescription = '';
    this.price = 0;
    this.deliveryCharge = 0;
    this.deliveryPartner = '';

    console.log(this.items);
  }

  generateFile(){
    this.axiosService.request(
      "POST",
      "api/listing/createBulkUploadFile",
      this.items
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  
  }
}
