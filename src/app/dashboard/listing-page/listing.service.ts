import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http'
import { FileDetails } from './file-details.model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http : HttpClient) { }

  bulkUpload(file : File): Observable<FileDetails> {
    console.log('sending request')
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileDetails>('http://localhost:8080/seller-app/api/listing/bulkUpload', formData);
  }

  getFiles(page: number, size : number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("size",size);
    return this.http.get('http://localhost:8080/seller-app/api/listing/files',{params:queryParams});
  }
  
}
