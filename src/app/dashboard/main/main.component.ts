import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
  
  constructor(private axiosService : AxiosService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }
  
  callLogout(){
    this.axiosService.logout();
  }
  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
