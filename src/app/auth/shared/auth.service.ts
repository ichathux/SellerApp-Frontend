import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { map, Observable } from 'rxjs';
import { SigninRequestPayload } from '../signin/signin.request.payload';
import { SigninResponse } from '../signin/signin.response.payload';
import { LocalStorageService } from 'ngx-webstorage'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router) {
      
   }

   signup(signupRequestPayload : SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, 
    {responseType: 'text'});
   }

   signIn(signinRequestPayload : SigninRequestPayload): Observable<boolean>{
    console.log('in auth service');
    return this.httpClient.post<SigninResponse>('http://localhost:8080/api/auth/signIn',
    signinRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      console.log(data);
      console.log(data.sellerDetails.completed);
      if(data.sellerDetails.completed){
        this.router.navigateByUrl('dashboard');
      }else{
        this.router.navigateByUrl('complete-profile');
      }
      // this.loggedIn.emit(true);
      // this.username.emit(data.username);
      
      return true;
    }));
   }

   getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
   }
}
