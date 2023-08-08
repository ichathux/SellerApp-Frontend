import { Component, OnInit } from '@angular/core';
import { ListingService } from "../service/listing.service";
import { AxiosService } from 'src/app/axios.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.css']
})
export class TrackingPageComponent implements OnInit{

  startDate : Date = new Date() ;
  endDate : Date = new Date();
  step = 0;
  private page : number = 0;
  private size : number = 10;
  orders : Array<any> | undefined;
  pages : Array<number> | undefined;

  constructor(private axiosService : AxiosService, private uploadService : ListingService){}
  
  ngOnInit(): void {
    this.getListedOrders();
    console.log(this.startDate);
    console.log(this.endDate);
  }

  search(){
    console.log(this.startDate);
    console.log(this.endDate);
    this.axiosService.requestWithParams1(
      "GET", 
      "api/listing/searchByDate", 
      {
        startDate : this.startDate, 
        endDate : this.endDate,
        page : this.page,
        size : this.size
      }).subscribe(response => {
        console.log(response);
        this.orders = response.content;
      });
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep (orderID : number, state : number){
    console.log('id-',orderID)
    console.log('type-',state)
    
    this.axiosService.requestWithParams1("POST",
    "api/tracking/update",
    {type : state,
    id : orderID,
    token : window.localStorage.getItem("requestToken")
    }).subscribe(response => {
      console.log(response);
      this.getListedOrders();
    })
  }

  
  getListedOrders(){
    console.log();
    this.uploadService.getOrders(this.page, this.size).then(response => {
      this.orders = response.data.content;
      this.pages = new Array(response.data['totalPages']);
      console.log(this.orders)
    }).catch(error => {
      console.log(error);
    })

  }

  setPage(i : number, event : any){
    this.page = i;
    this.getListedOrders();
  }

}
