import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'node_modules/ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListingPageComponent } from './dashboard/listing-page/listing-page.component';
import { ProfilePageComponent } from './dashboard/profile-page/profile-page.component';
import { CatalogPageComponent } from './dashboard/catalog-page/catalog-page.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TagInputModule } from 'ngx-chips';
import { TestPageComponent } from './test-page/test-page.component';
import { TestRegisterComponent } from './test-register/test-register.component';
import { MainComponent } from './dashboard/main/main.component';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule} from '@angular/material/radio';
import { TrackingPageComponent } from './dashboard/tracking-page/tracking-page.component';
import { SettingPageComponent } from './dashboard/setting-page/setting-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { MakeExcelFilePageComponent } from './dashboard/make-excel-file-page/make-excel-file-page.component';
import { SingleInputPageComponent } from './dashboard/listing/single-input-page/single-input-page.component';
import { BulkInputPageComponent } from './dashboard/listing/bulk-input-page/bulk-input-page.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ListingHistoryPageComponent } from './dashboard/listing/listing-history-page/listing-history-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CompleteProfileComponent,
    DashboardComponent,
    ListingPageComponent,
    ProfilePageComponent,
    CatalogPageComponent,
    TestPageComponent,
    TestRegisterComponent,
    MainComponent,
    SidebarComponent,
    TrackingPageComponent,
    SettingPageComponent,
    MakeExcelFilePageComponent,
    SingleInputPageComponent,
    BulkInputPageComponent,
    ListingHistoryPageComponent,
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
    MatIconModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
