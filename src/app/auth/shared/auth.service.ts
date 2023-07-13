import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { map, Observable, tap, throwError } from 'rxjs';
import { SigninRequestPayload } from '../signin/signin.request.payload';
import { SigninResponse } from '../signin/signin.response.payload';
import { LocalStorageService } from 'ngx-webstorage'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  refreshToken() {

    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }

    return this.httpClient.post<SigninResponse>('http://localhost:8080/api/auth/refresh/token',
      refreshTokenPayload)
       .pipe(tap((response) => {


        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  checkRefreshTokenExpired(){
    const expiredAt = this.localStorage.retrieve('expiresAt');
    const epochNow = (new Date).getTime();
    
    if(expiredAt < epochNow){
      console.log('expire '+ expiredAt);
      this.logout();
    }
  }

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router) {
      
   }

   signup(signupRequestPayload : SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/seller-app/api/auth/signup', signupRequestPayload, 
    {responseType: 'text'});
   }

   signIn(signinRequestPayload : SigninRequestPayload): Observable<boolean>{
    console.log('in auth service');
    return this.httpClient.post<SigninResponse>('http://localhost:8080/seller-app/api/auth/signIn',
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

      
      return true;
    }));
   }

  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
   }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  logout() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }

    this.httpClient.post('http://localhost:8080/seller-app/api/auth/logout', refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.router.navigateByUrl('');
  }
  isLoggedIn(): boolean {
    console.log('is logged in')
    // this.checkRefreshTokenExpired();
    return this.getJwtToken() != null;
  }

}
