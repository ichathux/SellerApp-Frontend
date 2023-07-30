import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';
import { AxiosService } from '../axios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit{
  constructor(private axiosService : AxiosService, private router : Router){}
ngOnInit(): void {
  console.log(axios);
}

  @Output() onSubmitLoginEvent = new EventEmitter();
  
  username : string = "";
  password : string = "";
  // ngForm : NgForm = "";

  onLogin(input:any):void{
    this.axiosService.request(
      "POST",
      "/login",
      {
        username : input.username,
        password : input.password
      }
    ).then(response => {
      this.axiosService.setAuthToken(response.data.token);
      this.router.navigateByUrl('/dashboard');
      // this.componentToShow = "messages";
    });

  }
  onSubmitLogin():void{
    console.log("login user")
    this.onLogin({"username":this.username, "password" : this.password});
    // this.onSubmitLoginEvent.emit({"username":this.username, "password" : this.password});
  }
}
