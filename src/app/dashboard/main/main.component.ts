import { Component, OnInit } from '@angular/core';
import { faBars, faBell, faFileExcel, faGauge, faGears, faList, faShippingFast, faUser } from '@fortawesome/free-solid-svg-icons';
import { AxiosService } from 'src/app/axios.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit{
  componentToShow: string = "dashboard";
  faBars = faBars;
  faGears = faGears;
  faBell = faBell;
  faUser = faUser;
  faList = faList;
  faFileExcel = faFileExcel;
  faGauge = faGauge;
  faShippingFast = faShippingFast;
  
  activeStatus = "dashboard";
  logo : string | null = '';
  name : string | null = '';
  
  constructor(private axiosService : AxiosService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.logo = localStorage.getItem('logo');  
      this.name = localStorage.getItem('businessName');
  }
  
  setCompomentToShow(showContent : string){
    console.log(showContent)
    this.componentToShow = showContent;
    this.activeStatus = showContent;
  }  

  callLogout(){
    this.axiosService.logout();
  }
  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
