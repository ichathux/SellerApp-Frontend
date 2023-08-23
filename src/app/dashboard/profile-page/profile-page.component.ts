import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AxiosService } from 'src/app/axios.service';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import {Cloudinary} from '@cloudinary/url-gen'
import { AppConfig } from 'src/app/config';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit{

  userDetails : any = null;

  lat ?: any ;
  lon ?: any ;
  location : string = ''; 
  searchResult : Array<any>= [];
  city !: string ;
  panelOpenState = true;
  @ViewChild('mapContainer', { static: true }) mapContainer?: ElementRef;
  map?: L.Map;
  markers: L.Marker[] = [];
  newAddr : any= null;

  cloudinaryInstance: any;

  constructor(private axios : AxiosService, 
    private toastr : ToastrService, 
    private spinner: NgxSpinnerService,
    private http: HttpClient){
    }
  
  ngOnInit(): void {  

    this.spinner.show();
    const cld = new Cloudinary({cloud: {cloudName: 'ddzs2ixbq'}});
  
    this.axios.request("GET","api/account/getUserDetails",'').then(res => {
      this.userDetails = res.data;
      this.imageUrl = this.userDetails.logo;
      this.getCurrentLocationByCountry();
      this.addMarkerIfCordinatesExists();
    }).catch(error => {
      console.log(error);
      this.spinner.hide();
    })
  }

  searchCity(city : string){
    this
    .axios
    .request("GET", "https://nominatim.openstreetmap.org/search?format=json&q="+city,'')
    .then(res => {
      this.searchResult = res.data;
    }).catch(error => {
      console.log(error)
    })
  }

  getCurrentLocationByCountry(){
    let loc1 : string = '';
    if(this.userDetails.city === undefined){
      loc1 = this.userDetails.country;
    }else{
      loc1 = this.userDetails.city;
    }
    this.axios.request("GET", "https://nominatim.openstreetmap.org/search?format=json&q="+loc1,'').then(res => {
    // console.log(res);  
    this.searchResult = res.data;
    if (res.data.length > 0) {
          this.lat =  parseFloat(res.data[0].lat);
          this.lon =  parseFloat(res.data[0].lon);
          this.initMap();
      } else {
        throw new Error('Coordinates not found.');
      }

        this.addMarker(this.lat, this.lon , this.map)
      this.getCurrentLocationByCountry();
    }).catch(error => {
      console.log("error while getting country location "+error);
    })
  }

  sr : any;

  onChangeLocation(){
    this.lat = this.searchResult[this.userDetails.address].lat;
    this.lon = this.searchResult[this.userDetails.address].lon;
    this.userDetails.city = this.searchResult[this.userDetails.address].display_name;
    this.map?.panTo([this.lat, this.lon]);
    
  }



  initMap() {
    this.map = L.map(this.mapContainer?.nativeElement).setView([this.lat, this.lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: { latlng: any; }) => {
      this.onMapClick(e, this.map)
    });
  }

  onLocationSelect(event : any, map: any) {
    const { latlng, name } = event.result;
    const marker = L.marker(latlng).addTo(map);
    marker.bindPopup(name).openPopup();
  }
  
  locationCordinates = '';
  // marker : any;
  onMapClick(event: { latlng: any; }, map2: any) {
    
    const latLng = event.latlng;
    // console.log('Clicked at:', latLng);
    this.locationCordinates = latLng;
    this.userDetails.location = latLng.lat + ","+latLng.lng;
    // console.log(this.location);
    this.addMarker(latLng.lat, latLng.lng, map2)
  }

  addMarkerIfCordinatesExists(){
    if(this.userDetails.location !== undefined){
      this.lat = this.userDetails.location.split(',')[0];
      this.lon = this.userDetails.location.split(',')[1];
      // console.log(this.lat)
      // console.log(this.lon)

      this.addMarker(this.lat, this.lon , this.map)
      this.spinner.hide();
    }
  }

  
  addMarker(lat : any, lng: any, map: any) {
    // Remove old markers
    this.removeMarkers(map);
    // Add new marker
    const marker = L.marker([lat, lng]).addTo(map);
    // Store the marker in the markers array
    this.markers.push(marker);
    // Optionally, add a popup to the marker
    marker.bindPopup('This is my location!').openPopup();
  }

  removeMarkers(map: any) {
    // Remove all old markers from the map and the markers array
    for (const marker of this.markers) {
      map.removeLayer(marker);
    }
    this.markers = [];
  }

  selectedFile: File | undefined;
  imageUrl?: string | ArrayBuffer | null;
  img : any ;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {

      const epochTimeInSeconds: number = Math.floor(new Date().getTime() / 1000);
      const newFileName: string = epochTimeInSeconds.toString()+ localStorage.getItem("requestToken");
      const renamedFile = new File([this.selectedFile], newFileName, { type: this.selectedFile.type });

      const formData = new FormData();
      formData.append('file', renamedFile);
      formData.append('upload_preset', 'timlw13j');

      const url = `${AppConfig.cloudinaryApiPrefix}${AppConfig.cloudinaryCloudName}${AppConfig.cloudinaryApiPostfix}`;

      this.http.post<any>(url, formData).subscribe(
        response => {
          // console.log('Upload successful:', response);
          this.userDetails.logo = response.secure_url;
          if(this.userDetails.logoPublicId !== undefined){
            this.userDetails.logoPublicIdOld = this.userDetails.logoPublicId;
          }
          this.userDetails.logoPublicId = response.public_id;
          // localStorage.setItem('logo',this.userDetails.logo);
          this.sendRequest();
        },
        error => {
          console.error('Error uploading:', error);
        }
      );
    }
    
  }

  updateSettings(){
    this.spinner.show();
    this.uploadImage();
  }
  sendRequest(){
    // this.userDetails.append('logo', this.selectedFile, this.selectedFile?.name);
    this.axios.request("POST", "api/account/updateGeneralSettings", this.userDetails).then(res => {
      // console.log(res);
      this.toastr.success('Updated');
      this.spinner.hide();
    }).catch(err => {
      // console.log(err);
      this.toastr.error(err);
      this.spinner.hide();
    })
  }

}
