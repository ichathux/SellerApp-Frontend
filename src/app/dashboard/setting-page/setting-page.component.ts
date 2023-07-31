import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit{


  constructor(private sideBar : SidebarComponent){}
ngOnInit(): void {

  // this.sideBar.isLinkActive('setting-page');
}
  
  

}
