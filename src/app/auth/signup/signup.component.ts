import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent{
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
      "api/auth/register",
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
      console.log(response.data);
      this.axiosService.setAuthToken(response.data.token, input.username, response.data.requestToken);
    }).catch(error => {
      console.log(error);
    });
  }
}