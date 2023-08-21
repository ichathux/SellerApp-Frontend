import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from 'src/app/axios.service';
import { faFacebook, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  
constructor(private axiosService : AxiosService, 
  private router : Router,
  private toaster: ToastrService){}
ngOnInit(): void {
  console.log(axios);
}

  @Output() onSubmitLoginEvent = new EventEmitter();
  
  username : string = "";
  password : string = "";
  // ngForm : NgForm = "";
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;

  onLogin(input:any):any{
    this.axiosService.request(
      "POST",
      "api/auth/login",
      {
        username : input.username,
        password : input.password
      }
    ).then(response => {
      console.log(response.data);
      this.axiosService.setAuthToken(response.data.token, input.username, response.data.requestToken);
      this.router.navigateByUrl('/dashboard');
      // this.componentToShow = "messages";
    }).catch(error => {
      this.toaster.error('Error!','Login Fail, Check Credentail again');
      console.log(error);
    });

  }
  onSubmitLogin():void{
    console.log("login user")
    this.onLogin({"username":this.username, "password" : this.password});
    // this.onSubmitLoginEvent.emit({"username":this.username, "password" : this.password});
  
  }
}
