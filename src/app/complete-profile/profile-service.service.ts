import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompleteProfilePayload } from './complete-profile-request.payload';
import { AuthService } from '../auth/shared/auth.service';
import { UserDetailsResponsePayload } from '../auth/signin/sellerDetails.response.payload';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  complete_profile(completeProfilePayload : CompleteProfilePayload) : Observable<any>{
    console.log('in complete profile service');
    return this.http.post('http://localhost:8080/seller-app/api/account/completeProfile', 
    completeProfilePayload);
  }

  get_profile_details() : Observable<any>{
    return this.http.get('http://localhost:8080/seller-app/api/account/getDetails');
  }

  getUserProfile(){
    return this.http.get<UserDetailsResponsePayload>('http://localhost:8080/seller-app/api/account/getSellerProfile');
  }
}
