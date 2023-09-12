import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AxiosService } from '../axios.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @Output() onSubmitRegisterEvent = new EventEmitter();

  active: string = 'login';
  firstName: string = '';
  lastName: string = '';
  contact: string = '';
  username: string = '';
  password: string = '';
  businessName: string = '';
  country: string = '';
  countries: any[] = [];

  private apiUrl = 'https://restcountries.com/v3.1/all'; // Rest Countries API endpoint

  constructor(
    private axiosService: AxiosService,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  getCountries(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  onSubmitRegister(): void {
    console.log('registering user');
    this.onRegister({
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password,
      contact: this.contact,
      businessName: this.businessName,
      country: this.country,
    });
  }

  onRegister(input: any): void {
    console.log('sending request');
    this.axiosService
      .request('POST', 'api/auth/register', {
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        password: input.password,
        contact: input.contact,
        businessName: input.businessName,
        country: input.country,
      })
      .then((response) => {
        console.log(response.data);
        this.authService.setAuthToken(
          response.data.token,
          input.username,
          response.data.requestToken
        );
        this.router.navigate(['/dashboard']);
        this.toastr.success('User Registered.');
        this.toastr.success('User Logged in.');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(error);
      });
  }
}
