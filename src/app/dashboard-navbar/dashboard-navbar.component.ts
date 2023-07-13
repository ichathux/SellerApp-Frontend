import { Component, OnInit } from '@angular/core';
import { faFacebook, faTwitter, faInstagram, faDribbble} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent implements OnInit{
  
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faDribbble = faDribbble;
  // faYoutube = faYoutube;

  constructor() { }

ngOnInit(): void {
}

}
