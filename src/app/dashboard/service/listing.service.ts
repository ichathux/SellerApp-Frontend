import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http'
import { AxiosService } from 'src/app/axios.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http : HttpClient, private axiosService : AxiosService) { }

  bulkUpload(file : File): Promise<any> {
    console.log('sending request')
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.axiosService.request("POST", "api/listing/bulkUpload", formData).then((res) => {
      this.getFiles(0,5);
    })
  }

  getFiles(page1 : number, size1 : number): Observable<any>{
    return this.axiosService.requestWithParams1("GET", "api/listing/files", {page : page1, size : size1});
  }
  getOrders(page1 : number, size1 : number): Observable<any>{
    return this.axiosService.requestWithParams1("GET", "api/listing/orders", {page : page1, size : size1});
  }
  
}
