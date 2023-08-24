import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from 'src/app/axios.service';
import { faFacebook, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiServiceService } from '../dashboard/service/api-service.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  
constructor(private axiosService : AxiosService, 
  private router : Router,
  private toaster: ToastrService, private apiService: ApiServiceService){}
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
  logo : string = '';
  name : string = '';

  // private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // onLogin(input:any):any{
  //   this.axiosService.request(
  //     "POST",
  //     "api/auth/login",
  //     {
  //       username : input.username,
  //       password : input.password
  //     }
  //   ).then(response => {
  //     const userData = response.data;
  //     this.userDataSubject.next(userData);
  //     // this.userDataSubject.asObservable();
  //     // console.log(response.data);
  //     this.axiosService.setAuthToken(response.data.token, input.username, response.data.requestToken);
  //     this.router.navigateByUrl('/dashboard');
  //   }).catch(error => {
  //     this.toaster.error('Error!','Login Fail, Check Credentail again');
  //     console.log(error);
  //   });

  // }

  onLogin(input:any):void{
    this.apiService.login(input.username, input.password).subscribe(userData => {
      console.log('login response ',userData)
      this.axiosService.setAuthToken(userData.token, input.username, userData.requestToken);
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.log(error)
      this.toaster.error("error, check user credential")
    })
  }
  onSubmitLogin():void{
    console.log("login user")
    this.onLogin({"username":this.username, "password" : this.password});  
  }

  // getUserData(): Observable<any> {
  //   return this.userDataSubject.asObservable();
  // }
}
