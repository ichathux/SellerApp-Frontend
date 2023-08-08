import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../service/listing.service';

@Component({
  selector: 'app-listing-history-page',
  templateUrl: './listing-history-page.component.html',
  styleUrls: ['./listing-history-page.component.css']
})
export class ListingHistoryPageComponent implements OnInit {

  private page : number = 0;
  private size : number = 10;
  orders : Array<any> | undefined;
  pages : Array<number> | undefined;

  constructor(private uploadService : ListingService){}
  
  ngOnInit(): void {  
    this.getListedOrders();
  }

  getListedOrders(){
    console.log();
    this.uploadService.getOrders(this.page, this.size).subscribe(response => {
      this.orders = response.content;
      this.pages = new Array(response.totalPages);
    })

  }

  setPage(i : number, event : any){
    this.page = i;
    this.getListedOrders();
  }

}
