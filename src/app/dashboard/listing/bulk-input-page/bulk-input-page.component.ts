import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListingService } from '../../service/listing.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { AxiosService } from 'src/app/axios.service';
import { PagePayload } from 'src/app/payload/page.payload'
import { DatePipe } from '@angular/common';
import {NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bulk-input-page',
  templateUrl: './bulk-input-page.component.html',
  styleUrls: ['./bulk-input-page.component.css']
})
export class BulkInputPageComponent implements OnInit{

  faDownload = faDownload;  

  file!: File;
  fileUris: Array<string> = [];
  private page : number = 0;
  private size : number = 5;
  files : Array<any> | undefined;
  pages : Array<number> | undefined;
  
  pagePayload !: PagePayload ;
  
  constructor(
    private uploadService : ListingService,
    private spinner : NgxSpinnerService){}

    
    ngOnInit(): void {
      this.spinner.show();
      this.getUploadedFiles();
    }

  selectFile(event: any) {
    this.file = event.target.files.item(0);
    console.log('file ',this.file)
  }

  uploadFile() {
    console.log('uploading file ',this.file)
    this.uploadService.bulkUpload(this.file);
    this.getUploadedFiles();
  }
  getUploadedFiles(){
    console.log();
    this.uploadService.getFiles(this.page, this.size).subscribe(response =>   {
      this.files = response.content;
      this.pages = new Array(response.totalPages);
      console.log(response);
      this.spinner.hide();
    });

  }

  setPage(i : number, event : any){
    this.page = i;
    this.getUploadedFiles();
  }

  
}
