import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAuthenticated: boolean = false;

  constructor() {
    // axios.defaults.baseURL = AppConfig.apiUrl;
    const storedAuthState = localStorage.getItem('authState');

    if (storedAuthState) {
      this.isAuthenticatedSubject.next(JSON.parse(storedAuthState));
      this.isAuthenticated = JSON.parse(storedAuthState);
    }
  }

  // private isAuthenticated = false;

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }

  setAuthToken(
    token: string | null,
    username: string,
    requestToken: string
  ): void {
    if (token !== null) {
      window.localStorage.setItem('auth_token', token);
      const expiredAt = String(new Date().getTime() + 2160000);
      window.localStorage.setItem('expiredAt', expiredAt);
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('requestToken', requestToken);
      this.isAuthenticated = true;
      // this.isAuthenticatedSubject.next(true);
      localStorage.setItem('authState', 'true');
    } else {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('expiredAt');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('requestToken');
      // this.isAuthenticatedSubject.next(false);
      localStorage.removeItem('authState');
    }
  }
  logout(): void {
    this.isAuthenticated = false;
    this.isAuthenticatedSubject.next(false);
    localStorage.clear();
    window.location.reload();
  }
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
