import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  componentToShow: string = "dashboard";
  faBars = faBars;
  
  constructor(private axiosService : AxiosService, ){}
  
  callLogout(){
    this.axiosService.logout();
  }
  // shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
