import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http'
import { FileDetails } from './file-details.model';
import { AxiosService } from 'src/app/axios.service';
import { PagePayload } from 'src/app/payload/page.payload';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http : HttpClient, private axiosService : AxiosService) { }

  bulkUpload(file : File): Promise<any> {
    console.log('sending request')
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.axiosService.request("POST", "api/listing/bulkUpload", formData)
  }

  getFiles(page1 : number, size1 : number): Promise<any>{
    return this.axiosService.requestWithParams("GET", "api/listing/files", {page : page1, size : size1});
  }
  getOrders(page1 : number, size1 : number): Promise<any>{
    return this.axiosService.requestWithParams("GET", "api/listing/orders", {page : page1, size : size1});
  }
  
}
