import { Component, OnInit, ViewChild } from '@angular/core';
import { ListingService } from '../../service/listing.service';
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

  ngOnInit(): void {}

  selectFile(event: any) {
    this.file = event.target.files.item(0);
    console.log('file ',this.file)
  }


}
