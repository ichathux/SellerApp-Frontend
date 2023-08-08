import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private toaster : ToastrService) { 
    axios.defaults.baseURL = "http://localhost:8081/";
    
  }

  getAuthToken(): string | null{
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null, username: string, requestToken: string): void{
    if(token !== null){
      window.localStorage.setItem("auth_token", token);
      const expiredAt= (String)((new Date).getTime()+2160000);
      window.localStorage.setItem("expiredAt", expiredAt);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("requestToken",requestToken);
    }else{
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("expiredAt");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("requestToken");
    }
  }

  logout():void{
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("expiredAt");
    window.localStorage.removeItem("requestToken");
    window.location.reload();
  }
  checkAuthTokenValid():boolean{
    const epochNow= (new Date).getTime();
    if(this.getAuthToken() !== null){
      if((Number)(window.localStorage.getItem("expiredAt")) < epochNow){
        // console.log("expired ", epochNow);
        this.logout();
        return false;
      }else{
        // console.log("not expired");
        return true;
      }
    }else{
      return true;
    }
    
  }
  checkUserLoggedIn():boolean{
    if(this.getAuthToken() !== null){
      return this.checkAuthTokenValid();
    }
    return false;
  }
  requestWithParams(method : string, url : string, data : Params){
    let headers = {};

    if(this.getAuthToken() !== null){
      headers = {"Authorization" : "Bearer " + this.getAuthToken()};
    }

    if(url !== 'api/listing/bulkUpload'){
      axios.defaults.headers.post["Content-type"] = "application/json";
    }
    
    return axios({
        method : method,
        url : url,
        params : data,
        headers : headers
      });
    

  }
  requestWithParams1(method : string, url : string, data : Params): Observable<any>{
    let headers = {};

    if(this.getAuthToken() !== null){
      headers = {"Authorization" : "Bearer " + this.getAuthToken()};
    }

    if(url !== 'api/listing/bulkUpload'){
      axios.defaults.headers.post["Content-type"] = "application/json";
    }
    
    return new Observable(observer =>{
      axios({
        method : method,
        url : url,
        params : data,
        headers : headers
      }).then(response => {
        observer.next(response.data);
        observer.complete();
        // this.toaster.success(response.data);
      }).catch(error => {
        observer.error(error);
        this.toaster.error(error);
      })
    })

  }
  requestWithoutJsonFormatParams(method : string, url : string, data : Params){
    let headers = {};

    if(this.getAuthToken() !== null){
      headers = {"Authorization" : "Bearer " + this.getAuthToken()};
    }
    
    axios.defaults.headers.post["Content-type"] = "application/xml";
    
    
    return axios({
      method : method,
      url : url,
      params : data,
      headers : headers
    })

  }
  request (method : string,url : string, data : any) : Promise<any>{
    
    this.checkAuthTokenValid() 
    let headers = {};
    
    if(this.getAuthToken() !== null){
      headers = {"Authorization" : "Bearer " + this.getAuthToken()};
    }

    if(url === "api/listing/bulkUpload"){
      axios.defaults.headers.post["Content-type"] = "application/xml";
    }else{
      axios.defaults.headers.post["Content-type"] = "application/json";
    }

    return axios({
      method : method,
      url : url,
      data : data,
      headers : headers
    }).catch(err => {
      this.toaster.error(err);
    })
  }
}
