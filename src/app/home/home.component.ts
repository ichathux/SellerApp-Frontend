import { Component } from '@angular/core';
import { faSearch, faCouch, faBasketball, faRing, faClock,
faCarSide, faHome, faGuitar, faBook, faBabyCarriage, faPaw, faShirt, faShoePrints,
faMobile, faTools, faPencilRuler, faWarehouse, faHeart, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { AxiosService } from '../axios.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  faSearch = faSearch;
  faCouch = faCouch;
  faBasketball = faBasketball;
  faRing = faRing;
  faClock = faClock;
  faCarSide = faCarSide;
  faHome = faHome;
  faGuitar = faGuitar;
  faBook = faBook;
  faBabyCarriage = faBabyCarriage;
  faPaw = faPaw;
  faShirt = faShirt;
  faShoePrints = faShoePrints;
  faMobile = faMobile;
  faTools = faTools ;
  faPencilRuler = faPencilRuler ;
  faWarehouse = faWarehouse;
  faHeart = faHeart;
  faCartShopping =faCartShopping;

  searchTerm : string = '';

  isLoggedIn : boolean = false;
  constructor(private axios : AxiosService){
    
    this.isLoggedIn = axios.isLoggedIn();
    console.log(this.isLoggedIn)
  }

  callLogout(){
    this.axios.logout();
  }

  
}
