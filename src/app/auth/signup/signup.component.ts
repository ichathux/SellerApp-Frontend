import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  
  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;

  constructor(){
    this.signupRequestPayload = {
      email : '',
      password : ''
    }
  }

  ngOnInit() { 
      this.signupForm = new FormGroup({
        username : new FormGroup('',[Validators.required, Validators.email]),
        password : new FormGroup('',Validators.required)
      })
  }
  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email')?.value; 
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
  }
}