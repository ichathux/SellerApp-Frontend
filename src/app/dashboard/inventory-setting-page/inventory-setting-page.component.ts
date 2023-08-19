import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-inventory-setting-page',
  templateUrl: './inventory-setting-page.component.html',
  styleUrls: ['./inventory-setting-page.component.css']
})
export class InventorySettingPageComponent implements OnInit {
  form: FormGroup;
  name: String = '';
  useInventory: boolean = false;

  constructor(private fb: FormBuilder, private toastr : ToastrService, private axios : AxiosService) {
    this.form = this.fb.group({
      inputFields: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // this.addField();
    this.getCurrentSellerInventoryStatus();
  }

  get inputFields(): FormArray {
    return this.form.get('inputFields') as FormArray;
  }

  addField(): void {
    // console.log(this.inputFields.length+1)

    const size = this.inputFields.length+1;
    if(size > 6){
      this.toastr.error("Not more than 5");
    }else{
      this.toastr.success("New Row added");
      const newField = this.fb.group({
        value: ['']
      });
      this.inputFields.push(newField);
    }
    
  }

  removeField(index: number): void {
    this.inputFields.removeAt(index);
  }

  onSubmit() {
    const fieldValues = this.inputFields.value.map((field: any) => field.value);
    console.log('Field Values:', fieldValues);
    this.axios.request("POST", "api/account/addCustomFields", {list : fieldValues, name : this.name});

  }

  saveInventoryStatus(){
    console.log(this.useInventory);
    this.axios.requestWithParams("POST", "api/account/inventoryStatus", {status : this.useInventory}).then(res => {
      this.toastr.success("Status changed")
    }).catch(err => {
      this.toastr.error(err)
    });
  }

   getCurrentSellerInventoryStatus(){
    
    this.axios.request("GET", "api/account/getInventoryStatus", '').then(res => {
      console.log(res);
      this.useInventory = res.data;
    })
   }
  panelOpenState = false;
 
}
