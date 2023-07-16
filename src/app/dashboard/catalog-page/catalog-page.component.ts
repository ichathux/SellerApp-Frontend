import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit{

  catalogForm !: FormGroup;
  productName !: string;

  constructor(){
    productName : ''
  }

  ngOnInit(): void {
    productName : new FormControl('', Validators.required)
    productName : this.catalogForm.get('productName')?.value;
  }


  


}
