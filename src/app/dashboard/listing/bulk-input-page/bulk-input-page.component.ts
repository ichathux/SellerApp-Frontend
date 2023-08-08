import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ListingService } from '../../service/listing.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { AxiosService } from 'src/app/axios.service';
import { PagePayload } from 'src/app/payload/page.payload'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bulk-input-page',
  templateUrl: './bulk-input-page.component.html',
  styleUrls: ['./bulk-input-page.component.css']
})
export class BulkInputPageComponent implements OnInit{

  faDownload = faDownload;  

  file!: File;
  // fileDetails!: FileDetails;
  fileUris: Array<string> = [];
  private page : number = 0;
  private size : number = 5;
  files : Array<any> | undefined;
  pages : Array<number> | undefined;
  
  pagePayload !: PagePayload ;
  
  constructor(
    private uploadService : ListingService, 
    private router: Router,
    private toastr: ToastrService,
    private axiosService : AxiosService,
    private datePipe: DatePipe){}

    
    ngOnInit(): void {
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
    this.uploadService.getFiles(this.page, this.size).then(response => {
      this.files = response.data.content;
      this.pages = new Array(response.data['totalPages']);
      console.log(this.files)
    }).catch(error => {
      console.log(error);
    })

  }

  setPage(i : number, event : any){
    this.page = i;
    this.getUploadedFiles();
  }

  
}
