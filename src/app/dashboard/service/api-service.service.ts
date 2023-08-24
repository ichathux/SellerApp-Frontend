import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfig } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http : HttpClient) { }

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  login(username : string, password : string) : Observable<any> {
    const requestBody = { username, password };
    let userData : any = { /* Response data */ };
    this.http.post(AppConfig.apiUrl+'api/auth/login', requestBody).subscribe(response => {
      userData = response;
      this.userDataSubject.next(userData);
      localStorage.setItem('logo', userData.logo);
      localStorage.setItem('businessName', userData.businessName);
    }, error => {
      console.log(error)
    });
    return this.userDataSubject.asObservable();

  }

  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }
}
