import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';

const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'sign-up', component: SignupComponent },
  { path: 'sign-in', component: SigninComponent}
  // { path: 'complete-profile', component: CompleteProfileComponent, canActivate: [AuthGuard]}
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
