import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-about-me-page',
  templateUrl: './about-me-page.component.html',
  styleUrls: ['./about-me-page.component.css']
})
export class AboutMePageComponent implements OnInit{

  username : string | null = '';
  userRequestToken : string | null = '';
  data : any;
  constructor(private axiosService : AxiosService){}

  ngOnInit(): void {   
    this.username = window.localStorage.getItem('username');
    this.userRequestToken = window.localStorage.getItem('requestToken');
   
    this.getSellerDetails();
  }

  getSellerDetails(){

    this.axiosService.requestUpdated(
      "GET",
      "api/account/getUserDetails",
      ''
      ).subscribe(response => {
        console.log(response);
        this.data = response;
    });
  }

}

