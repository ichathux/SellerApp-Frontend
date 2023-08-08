import { Component, OnInit } from '@angular/core';
import { ListingService } from "../service/listing.service";
import { AxiosService } from 'src/app/axios.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page.component.html',
  styleUrls: ['./tracking-page.component.css']
})
export class TrackingPageComponent implements OnInit{
  
  endDate : Date = new Date();
  startDate : Date = new Date(this.endDate) ;
  
  
  step = 0;
  private page : number = 0;
  private size : number = 10;
  orders : Array<any> | undefined;
  pages : Array<number> | undefined;

  constructor(private axiosService : AxiosService, 
    private uploadService : ListingService,
    private toaster : ToastrService){
      
    }
  
  ngOnInit(): void {
    // this.getListedOrders();
    this.startDate.setDate(this.endDate.getDate() - 7);
    this.search();
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
        this.toaster.success(this.orders?.length + " items recieved");
      });
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep (orderID : number, state : number){    
    this.axiosService.requestWithParams1("POST",
    "api/tracking/update",
    {type : state,
    id : orderID,
    token : window.localStorage.getItem("requestToken")
    }).subscribe(response => {
      this.toaster.success("Order ID "+orderID+" changed")
      this.search();
    })
  }

  
  getListedOrders() : void{
    console.log();
    this.uploadService.getOrders(this.page, this.size).subscribe(response => {
      console.log(response);
      this.orders = response.content;
      this.pages = new Array(response.totalPages);
      this.toaster.success(this.orders?.length + " items recieved")
    })
  }

  setPage(i : number, event : any){
    this.page = i;
    this.getListedOrders();
  }

}
