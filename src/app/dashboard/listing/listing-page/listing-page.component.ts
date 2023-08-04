import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingService } from './listing.service';
import { Observable } from 'rxjs';
import { FileDetails } from './file-details.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit{

  faDownload = faDownload;  

  file!: File;
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];
  private page : number = 0;
  private size : number = 5;
  files : Array<any> | undefined;
  pages : Array<number> | undefined;
  
  constructor(private uploadService : ListingService, 
    private router: Router,
    private toastr: ToastrService){}

  ngOnInit(): void {
    
    // this.getUploadedFiles();
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0);
    console.log('file ',this.file)
  }

  // uploadFile() {

  //   console.log('uploading file ',this.file)
  //   this.uploadService.bulkUpload(this.file).subscribe({

  //     next: (data) => {
  //       this.fileDetails = data;
  //       this.fileUris.push(this.fileDetails.fileUri);
  //       // alert("File Uploaded Successfully")
  //       this.toastr.success('File Uploaded Successfully');
  //       this.getUploadedFiles();
  //     },
  //     error: (e) => {
  //       // console.log(e);
  //       this.toastr.success('error Ocurred');
  //     }
  //   });
  // }

  // getUploadedFiles(){
  //   this.uploadService.getFiles(this.page, this.size).subscribe((data) => {
  //     console.log(data);
  //     this.files = data['content'];
  //     this.pages = new Array(data['totalPages']);
  //     console.log(this.files);
  //   },(error) => {
  //     console.log(error.error.message);
  //   });
  // }

  // setPage(i : number, event : any){
  //   this.page = i;
  //   this.getUploadedFiles();
  // }

  

}
