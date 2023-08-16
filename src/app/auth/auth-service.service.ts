import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  private isAuthenticated = false;
 
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
