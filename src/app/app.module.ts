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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'node_modules/ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenInterceptor } from './auth/token-interceptor';
import { ListingPageComponent } from './dashboard/listing-page/listing-page.component';
import { ProfilePageComponent } from './dashboard/profile-page/profile-page.component';
import { CatalogPageComponent } from './dashboard/catalog-page/catalog-page.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TagInputModule } from 'ngx-chips';
import { TestPageComponent } from './test-page/test-page.component';
import { TestRegisterComponent } from './test-register/test-register.component';
import { MainComponent } from './dashboard/main/main.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio'
// import { FormsModule } from '@angular/forms';

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
    DashboardSidebarComponent,
    DashboardNavbarComponent,
    ListingPageComponent,
    ProfilePageComponent,
    CatalogPageComponent,
    TestPageComponent,
    TestRegisterComponent,
    MainComponent,
    SidebarComponent,
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
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
