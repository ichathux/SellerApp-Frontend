import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';
import { faTrash} from '@fortawesome/free-solid-svg-icons';


export interface PeriodicElement {
  name: string;
  description: string;
  
}

let ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-make-excel-file-page',
  templateUrl: './make-excel-file-page.component.html',
  styleUrls: ['./make-excel-file-page.component.css']
})



export class MakeExcelFilePageComponent implements OnInit{

  constructor(private axiosService : AxiosService){}

  ngOnInit(): void {
    this.getBulkInputList();
  }

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

  dataSource : any = [];

  bulkInputs : any = [];
  pages : Array<number> | undefined;
  size : number = 5;
  faTrash = faTrash;

  displayedColumns: string[] = ['name', 'orderDescription'];
  // add single item to arrayList
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
      sellerDetails : null,
      orderDescription : this.orderDescription,
      username : window.localStorage.getItem("username")
     });
    
     
     ELEMENT_DATA.push({
        name: this.customerName,
        description: this.orderDescription
    })

    const dataSource = ELEMENT_DATA;

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

  //send arrayList to backend
  generateFile(){
    this.axiosService.request(
      "POST",
      "api/listing/createBulkUploadFile",
      this.items
    ).then(response => {
      console.log(response);
      ELEMENT_DATA = [];
      this.dataSource = [];
      this.getBulkInputList();
    }).catch(error => {
      console.log(error);
    })
  
  }
  deleteItem(i : number){
    console.log('deleting ',i);
    this.items.splice(i,1);
    this.dataSource.splice(i,1);
    console.log(this.items);
    console.log(this.dataSource);
  }

  getBulkInputList(){
    return this.axiosService
      .requestWithParams(
        "GET", 
        "api/listing/getBulkInputList", 
        {
          page : this.pages, 
          size : this.size}
      ).then(response => {
        console.log(response.data);
        if(this.bulkInputs.size > 0){
          this.bulkInputs = response.data;
        }
        
        // console.log(this.bulkInputs);
      }).catch(error => {
        console.log(error);
      });
  }

  setPage(i : number, event : any){
    const page = i;
    this.getBulkInputList();
  }
}
