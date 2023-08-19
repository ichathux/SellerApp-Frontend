import { Component, OnInit } from '@angular/core';
import { ListingService } from "../service/listing.service";
import { AxiosService } from 'src/app/axios.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private toaster : ToastrService, 
    private spinner : NgxSpinnerService){
      
    }
  
  ngOnInit(): void {

    this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);

    // this.getListedOrders();
    this.startDate.setDate(this.endDate.getDate() - 7);
    this.search();
  }

  api : string = '';
  params?: any;
  orderId = '';
  customerContact = '';

  search(){
    this.spinner.show();
    console.log(this.startDate);
    console.log(this.endDate);

    

    if(this.orderId !== ''){
      console.log('search with orderid')
      this.api  = 'api/listing/searchById';
      this.params = {
        orderId : this.orderId, 
        page : this.page,
        size : this.size
      }
    }else if(this.customerContact !== ''){
      console.log('search by customer')
      this.api  = 'api/listing/searchByContactNo';
      this.params = {
        contactNo : this.customerContact, 
        page : this.page,
        size : this.size
      }
    }else{
      console.log('search by date')
      this.api  = 'api/listing/searchByDate';
      this.params = {
        startDate : this.startDate, 
        endDate : this.endDate,
        page : this.page,
        size : this.size
      }
    }
    this.axiosService.requestWithParams1(
      "GET", 
      this.api, 
      this.params
      ).subscribe(response => {
        console.log(response);
        this.orders = response.content;
        this.toaster.success(this.orders?.length + " items recieved");
        this.spinner.hide();
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
