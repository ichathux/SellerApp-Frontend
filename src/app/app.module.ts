import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'node_modules/ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TagInputModule } from 'ngx-chips';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';

import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListingPageComponent } from './dashboard/listing/listing-page/listing-page.component';
import { ProfilePageComponent } from './dashboard/profile-page/profile-page.component';
import { CatalogPageComponent } from './dashboard/catalog-page/catalog-page.component';
import { MainComponent } from './dashboard/main/main.component';
import { TrackingPageComponent } from './dashboard/tracking-page/tracking-page.component';
import { SettingPageComponent } from './dashboard/setting-page/setting-page.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { MakeExcelFilePageComponent } from './dashboard/listing/make-excel-file-page/make-excel-file-page.component';
import { SingleInputPageComponent } from './dashboard/listing/single-input-page/single-input-page.component';
import { BulkInputPageComponent } from './dashboard/listing/bulk-input-page/bulk-input-page.component';
import { ListingHistoryPageComponent } from './dashboard/listing/listing-history-page/listing-history-page.component';
import { MatInputModule } from '@angular/material/input';
import { AboutMePageComponent } from './dashboard/about-me-page/about-me-page.component';
import { InventorySettingPageComponent } from './dashboard/inventory-setting-page/inventory-setting-page.component';
import { BarcodeReaderComponent } from './dashboard/barcode-reader/barcode-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    FooterComponent,
    CompleteProfileComponent,
    DashboardComponent,
    ListingPageComponent,
    ProfilePageComponent,
    CatalogPageComponent,
    MainComponent,
    SidebarComponent,
    TrackingPageComponent,
    SettingPageComponent,
    MakeExcelFilePageComponent,
    SingleInputPageComponent,
    BulkInputPageComponent,
    ListingHistoryPageComponent,
    AboutMePageComponent,
    InventorySettingPageComponent,
    BarcodeReaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    CanvasJSAngularChartsModule,
    TagInputModule,
    FormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatTabsModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
         
  ],
  providers: [DatePipe, {provide: LOCALE_ID, useValue: 'en-LK'}],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
