import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../complete-profile/profile-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit{

  ownerName !: string;
  bussinessName !: string;
  contact !: string;
  address !: string;
  email !: string;

  constructor(private profile_service : ProfileService){}
  ngOnInit(): void {    
    this.profile_service.getUserProfile().subscribe((data) => {
      // console.log(data);

      this.bussinessName = data.displayName;

    })
  }

}
