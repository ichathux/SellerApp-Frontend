import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../complete-profile/profile-service.service';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { UserDetailsResponsePayload } from '../auth/signin/sellerDetails.response.payload';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})

export class DashboardSidebarComponent implements OnInit{

  isLoggedIn !: boolean;
  username !: string;
  name !: string;
  address !: string;
  
  constructor(private authService : AuthService, 
    private router : Router, 
    private profile_service : ProfileService,
    private toastr : ToastrService){}

  ngOnInit(): void {
    this.profile_service.getUserProfile().subscribe((data) => {
      console.log(data);
      this.name = data.displayName;
      this.address = data.address;
      // this.toastr.success('Successful ');
    }, error => {
      throwError(error);
      // this.toastr.success('Error ');
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    
  }

}
