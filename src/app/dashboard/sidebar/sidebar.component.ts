import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { faUser, faGears, faShippingFast, faBell, faList, faGauge, faFileExcel} from '@fortawesome/free-solid-svg-icons';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  faGears = faGears;
  faBell = faBell;
  faUser = faUser;
  faList = faList;
  faFileExcel = faFileExcel;
  faGauge = faGauge;
  faShippingFast = faShippingFast;
  
  activeStatus = "dashboard";

  constructor(
    private mainComponent : MainComponent, 
    private axiosService : AxiosService,
    ){}
  
  setCompomentToShow(showContent : string){
    this.mainComponent.componentToShow = showContent;
    this.activeStatus = showContent;
  }  

  callLogout(){
    this.axiosService.logout();
  }
}
