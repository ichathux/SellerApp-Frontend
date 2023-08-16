import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { ListingPageComponent } from './dashboard/listing/listing-page/listing-page.component';
import { CatalogPageComponent } from './dashboard/catalog-page/catalog-page.component';
import { ProfilePageComponent } from './dashboard/profile-page/profile-page.component';
import { MainComponent } from './dashboard/main/main.component';
import { BarcodeReaderComponent } from './dashboard/barcode-reader/barcode-reader.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'sign-up', component: SignupComponent },
  { path: 'sign-in', component: SigninComponent},
  { path: 'complete-profile', component: CompleteProfileComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'listing-page', component: ListingPageComponent, canActivate: [AuthGuard]},
  { path: 'catalog-page', component: CatalogPageComponent, canActivate: [AuthGuard]},
  { path: 'profile-page', component: ProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'barcode-reader', component: BarcodeReaderComponent}
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
