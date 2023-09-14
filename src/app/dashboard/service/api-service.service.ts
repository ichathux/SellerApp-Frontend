import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { AppConfig } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  login(username: string, password: string): Observable<any> {
    const requestBody = { username, password };
    return this.http.post(AppConfig.apiUrl + 'api/auth/login', requestBody);
  }

  getUserData(): Observable<any> {
    return this.userDataSubject.asObservable();
  }

  get(url: string, params?: any | undefined): Observable<any> {
    let headers = {
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    };
    return this.http.get(AppConfig.apiUrl + url, { headers, params });
  }
  post(
    url: string,
    body: any,
    data?: 'body' | undefined,
    params?: HttpParams | undefined
  ): Observable<any> {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    };
    return this.http.post(AppConfig.apiUrl + url, body, { headers, params });
  }

  put(
    url: string,
    body: any,
    params?: HttpParams | undefined
  ): Observable<any> {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    };
    return this.http.put(AppConfig.apiUrl + url, body, { headers, params });
  }

  delete(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      context?: HttpContext;
      observe?: 'body';
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
      body?: any | null;
    }
  ): Observable<any> {
    let headers = {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    };
    // options?.headers?.append('Authorization', 'Bearer ' + localStorage.getItem('auth_token'));
    // options?.headers?.set('Authorization', 'Bearer ' + localStorage.getItem('auth_token'))

    return this.http.delete(AppConfig.apiUrl + url, { headers });
  }
}
