import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../main/main.component';
import {
  faUser,
  faGears,
  faShippingFast,
  faBell,
  faList,
  faGauge,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import { AxiosService } from 'src/app/axios.service';
import { ApiServiceService } from '../service/api-service.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  faGears = faGears;
  faBell = faBell;
  faUser = faUser;
  faList = faList;
  faFileExcel = faFileExcel;
  faGauge = faGauge;
  faShippingFast = faShippingFast;

  activeStatus = 'dashboard';
  logo: string | null = '';
  name: string | null = '';

  constructor(
    private mainComponent: MainComponent,
    private axiosService: AxiosService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.logo = localStorage.getItem('logo');
    this.name = localStorage.getItem('businessName');
  }

  setCompomentToShow(showContent: string) {
    console.log(showContent);
    this.mainComponent.componentToShow = showContent;
    this.activeStatus = showContent;
  }

  callLogout() {
    this.authService.logout();
  }
}
