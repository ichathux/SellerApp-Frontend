import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from 'src/app/axios.service';
import { CatalogDto } from './catalogDto';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from 'src/app/dialog/confim-dialog/confim-dialog.component'
import { AppConfig } from 'src/app/config';
import { EditInventoryItemComponent } from '../dialog-dashboard/edit-inventory-item/edit-inventory-item.component';
import { ViewInventoryItemComponent } from '../dialog-dashboard/view-inventory-item/view-inventory-item.component';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit{

  catalogForm !: FormGroup;
  productName !: string;

  categories : Array<any> = []; 
  subCategories : Array<any> = [];
  brands : Array<any> = [];

  itemName : string = '';
  category : any;
  subCategory : any ;
  description : string = '';
  img : any ;
  brand : string = '';


  formData: FormData = new FormData();

  selectedFile: File | undefined;
  imageUrl?: string | ArrayBuffer | null;

  constructor(private axios : AxiosService,
    private toater : ToastrService,
    private http: HttpClient,
    private spinner : NgxSpinnerService,
    public dialog: MatDialog
    ){
  }

  getCustomFields(){
    console.log("getting custom fields");
    this.axios.request("GET","api/account/getCustomFields",'').then(response => {
      console.log('rsponse ',response);
    }).catch(error => {
      console.log('error ',error);
    })
  }

  variant : any;
  variantListArray : Array<CatalogDto> = [];
  variantArray : Array<String> = [];
  // qtyV : any[] = [];
  qtyArray: number[] = [];
  priceArray: number[] = [];
  currentVariant : string  = '';
  
  getVariantsTypes(){
    this.axios.request("GET", "api/account/getVariantTypes",'').then(response => {
      console.log(response)
      this.variantListArray = response.data;
      this.spinner.hide();
    }).catch(error => {
      console.log(error);
      this.spinner.hide();
    })
  }

  getVariants(data : any) {
    this.variantArray = data.list;
    this.currentVariant = data.name;

  }

  ngOnInit(): void {
    this.spinner.show();
    this.getCategories();
    this.getBrand();
    this.getInventory();
    this.getVariantsTypes();
  }

  
  getCategories(){
    this.axios.request("GET", "api/inventory/getCategories",'').then(response => {
      // console.log(response);
      this.categories = response.data;
    }).catch(error => {
      // console.log(error);
      this.toater.error("error occurred ", error);
    })
  }

  getSubCategories(cat : any){
    this.spinner.show();
    this.axios.requestWithParams("GET", 
    "api/inventory/getSubCategories"
    ,{id : cat}).then(response => {
      this.subCategories = response.data;
      this.spinner.hide();
    }).catch(error => {
      console.log(error);
      this.spinner.hide();
    })
  }

  getBrand(){
    this.axios.request("GET", "api/inventory/getBrands",'').then(response => {
      // console.log(response)
      this.brands = response.data;
    }).catch(error => {
      console.log(error);
    })
  }
  
  pages : Array<number> | undefined;
  private page : number = 0;
  private size : number = 5;
  items : Array<any> = [];

  

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

  addSingleItem(){
    this.spinner.show();
    console.log(this.itemName)
    if (this.selectedFile) {
      this.formData.append('name',this.itemName);
      this.formData.append('subCategoryId', this.subCategory);
      this.formData.append('brand', this.brand);
      this.formData.append('itemDescription', this.description);
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
      this.formData.append('variantType', this.currentVariant);
      this.formData.append('lowestPrice', Math.min(...this.priceArray).toString())
      this.formData.append('totalItems', this.qtyArray.reduce((t, n) => t + n,0).toString())
      // this.uploadImage(this.selectedFile, this.formData);
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
          this.sendAddInvenrtoryRequest();
        },
        error => {
          console.error('Error uploading:', error);
        }
      );
    }
  }
  sendAddInvenrtoryRequest(){
    this.axios.request("POST", "api/inventory/addSingleItem", this.formData)
      .then((res) => {
        this.toater.success("Item Added")
        this.getInventory();
        this.formData = new FormData();
        this.spinner.hide();
      }).catch(error => {
        this.toater.error("error occured "+error)
        this.formData = new FormData();
        this.spinner.hide();
      })
  }
  
  getInventory(){
    this.axios.requestWithParams("GET", "api/inventory/getAllItems",
    {page : this.page,
    size : this.size }).then(response => {
      console.log(response);
      console.log(response.data.totalPages)
      this.items = response.data.content;
      this.pages = new Array(response.data.totalPages)
    }).catch(error => {
      console.log(error);
    })
  }

  setPage(i : number, event : any){
    this.page = i;
    this.getInventory();
  }

  selectedOption: string | undefined;

  selectOption(option: string) {
    this.selectedOption = option;
  }

  openConfirmationDialog(id: any, name: string): void {
    const dialogRef = this.dialog.open(ConfimDialogComponent, {
      data : {action : 'Delete', itemName : name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed the action
        console.log('Action confirmed ',id);
        this.deleteItem(id);
        // Perform the action here
      } else {
        // User canceled the action
        console.log('Action canceled');
      }
    });
  }


  deleteItem(item : any){
    console.log('delete item ',item)
    this.spinner.show();
    this.axios.requestWithParams("DELETE", 
    "api/inventory/deleteInventoryItem"
    ,{itemId : item}).then(response => {
      this.toater.success("Item Deleted");
      this.getInventory();
      this.spinner.hide();
    }).catch(error => {
      console.log(error);
      this.spinner.hide();
    })
  }

  openEditDialog(item : any) {
    const dialogRef = this.dialog.open(EditInventoryItemComponent, {
      data: {inventory : item}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("ok")
        this.getInventory();
        this.spinner.hide();
      }else{
        console.log("cancel")
        this.spinner.hide();
      }
    });
  }

  openViewDialog(item : any){
    const dialogRef = this.dialog.open(ViewInventoryItemComponent, {
      data: {inventory : item}
    });

    // dialogRef.afterClosed().subscribe(result => {

    // });
  }

}


