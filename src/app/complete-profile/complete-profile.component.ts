import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompleteProfilePayload } from './complete-profile-request.payload';
import { ProfileService } from './profile-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})
export class CompleteProfileComponent implements OnInit{

  completeProfileForm !: FormGroup;
  completeProfilePayload!: CompleteProfilePayload;

  constructor(
    private profile_service :ProfileService,
    private router : Router,
    private toastr : ToastrService,
    private http : HttpClient){
    
    this.completeProfilePayload = {
      businessName : '',
      ownerName : '',
      address : '',
      contactNo : '',
      location : '',
      businessType : ''
    }
  }
  ngOnInit(){
    this.completeProfileForm = new FormGroup({
      businessName : new FormControl('',[Validators.required]),
      ownerName : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required]),
      contactNo : new FormControl('',[Validators.required]),
      location : new FormControl('',[Validators.required]),
      businessType : new FormControl('',[Validators.required])
    })
    
    // const headers = { 'Authorization': 'Bearer '+ this.authService.getJwtToken};
    // const body = { title: 'Angular POST Request Example' };
    // this.http.get<any>('http://localhost:8080/seller-app/api/account/test', {headers}).subscribe(data => {
    // });
    
  }
  completeProfile(){
    console.log("profile updating")
    this.completeProfilePayload.businessName = this.completeProfileForm.get('businessName')?.value;
    this.completeProfilePayload.ownerName = this.completeProfileForm.get('ownerName')?.value;
    this.completeProfilePayload.address = this.completeProfileForm.get('address')?.value;
    this.completeProfilePayload.contactNo = this.completeProfileForm.get('contactNo')?.value;
    this.completeProfilePayload.location = this.completeProfileForm.get('location')?.value;
    this.completeProfilePayload.businessType = this.completeProfileForm.get('businessType')?.value;
    
    console.log(this.completeProfilePayload);

    this.profile_service.complete_profile(this.completeProfilePayload)
    .subscribe((data) => {
      console.log(data)
      // this.router.navigate(['/dashboard']);
      this.toastr.success('Profile updated complete!');
    })
  }
  getDetails(){
    this.profile_service.get_profile_details().subscribe((data) => {
      this.toastr.success("success");
    })
  }

}
