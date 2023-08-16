import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from 'src/app/axios.service';
import { CatalogDto } from './catalogDto';
import axios from 'axios';

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
  // itemPrice : number = 0;
  // qty : number = 0;
  category : any;
  subCategory : any ;
  description : string = '';
  img : any ;
  brand : string = '';

  formData: FormData = new FormData();

  selectedFile: File | undefined;

 
  imageUrl?: string | ArrayBuffer | null;

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

  constructor(private axios : AxiosService,
    private toater : ToastrService,
    private http: HttpClient,
    ){
    // productName : ''
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
    }).catch(error => {
      console.log(error)
    })
  }

  getVariants(data : any) {
    this.variantArray = data.list;
    this.currentVariant = data.name;

  }

  ngOnInit(): void {
    this.getCategories();
    this.getBrand();
    this.getInventory();
    this.getVariantsTypes();
  }

  addSingleItem(){
    console.log(this.itemName)
    if (this.selectedFile) {
      this.formData.append('file', this.selectedFile, this.selectedFile.name);
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

      console.log(this.qtyArray);
      console.log(this.currentVariant)
      console.log(this.formData)

      // this.uploadImage();
      this.axios.request("POST", "api/inventory/addSingleItem", this.formData)
      .then((res) => {
        this.toater.success("Item Added")
        this.getInventory();
        this.formData = new FormData();
      }).catch(error => {
        this.toater.error("error occured "+error)
        this.formData = new FormData();
      })
    }
    
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
    // console.log('calling to sub categories ')
    // console.log(cat)
    this.axios.requestWithParams("GET", 
    "api/inventory/getSubCategories"
    ,{id : cat}).then(response => {
      // console.log(response);
      this.subCategories = response.data;
    }).catch(error => {
      console.log(error);
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

  formData1: FormData = new FormData();

  async uploadImage() : Promise<any>{
    const cloudName = 'dzjakwtji';
    const apiKey = '424679684355628';
    const apiSecret = 'RckxOzCQ4cFDwvOv6Qi4-qApjX0';
    const uploadPreset = 'ml_default';

    if (this.selectedFile) {
      this.formData1.append('file', this.selectedFile);
      
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          this.formData1,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Access-Control-Allow-Origin': 'your-origin',
              'Access-Control-Allow-Headers': 'Content-Type'
            },
            auth: {
              username: apiKey,
              password: apiSecret
            },
            params: {
              upload_preset: uploadPreset
            }
          }
        );
  
        return response.data;
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      }
    }
    

  }
}
