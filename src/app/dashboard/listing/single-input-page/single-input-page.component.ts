import { Component, EventEmitter, Output } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-single-input-page',
  templateUrl: './single-input-page.component.html',
  styleUrls: ['./single-input-page.component.css']
})
export class SingleInputPageComponent {

  constructor(private axiosService : AxiosService){}

  @Output() onSubmitSingleInputEvent = new EventEmitter();

  customerName : string = "";
  contactNo : string = "";
  email : string = "";
  address : string = "";
  city : string = "";
  orderDescription : string = "";
  price : number = 0;
  deliveryCharge : number = 0;
  deliveryPartner : string = "";

  onSubmitSingleListing() :void{
    this.onSingleListing({
      "customerName": this.customerName, 
      "contactNo": this.contactNo,
      "email":this.email, 
      "address" : this.address,
      "city": this.city,
      "orderDescription": this.orderDescription,
      "price": this.price,
      "deliveryCharge" : this.deliveryCharge,
      "deliveryPartner" : this.deliveryPartner
    });
  }

  onSingleListing(input : any): void{
    this.axiosService.request(
      "POST",
      "api/listing/singleInput",
      {
        customer:{ 
          name : input.customerName,
          contactNo: input.contactNo,
          district : input.district,
          address : input.address,
          country : input.country,
          email : input.email
        },
        price : input.price,
        deliveryCharge : input.deliveryCharge,
        status : 5,
        createdAt : null,
        updatedAt : null,
        sellerDetails : null
      }
    ).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }
}
