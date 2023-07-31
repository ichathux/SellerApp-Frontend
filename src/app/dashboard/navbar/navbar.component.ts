import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AxiosService } from 'src/app/axios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faBars = faBars;
  mode = new FormControl('over' as MatDrawerMode);
  showFiller = false;
  // mode = new FormControl('over' as MatDrawerMode);

  // faBars = faBars;
  
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  
}
