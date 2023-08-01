import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  
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
      "api/auth/login",
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
