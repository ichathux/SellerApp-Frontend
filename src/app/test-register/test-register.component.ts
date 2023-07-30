import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-test-register',
  templateUrl: './test-register.component.html',
  styleUrls: ['./test-register.component.css']
})
export class TestRegisterComponent {

  constructor(private axiosService : AxiosService){}

  @Output() onSubmitRegisterEvent = new EventEmitter();

  active : string = 'login';
  firstName : string = "";
  lastName : string = "";
  contact : string = "";
  username : string = "";
  password : string = "";
  businessName : string = "";
  address : string = "";



  
  onSubmitRegister():void{

    console.log("registering user")
    this.onRegister({
      "firstName": this.firstName, 
      "lastName": this.lastName,
      "username":this.username, 
      "password" : this.password,
      "contact": this.contact,
      "businessName": this.contact,
      "address": this.address});

  }

  onRegister(input : any): void{
    console.log("sending request");
    this.axiosService.request(
      "POST",
      "/register",
      {
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        password: input.password,
        contact: input.contact,
        businessName: input.businessName,
        address: input.address

      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      // this.componentToShow = "messages";
    });
  }

}


