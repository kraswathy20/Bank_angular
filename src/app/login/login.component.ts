import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data="Your Perfect Banking Partner!"
  inputplaceholder="Enter Account Number"

  acno=''
  // or acno:any

  psw=''

  
  // dependency injection
  constructor(private router:Router,private ds:DataService){ }


  login(){
    var acnum=this.acno
    var psw=this.psw
    var userDetails=this.ds.userDetails
    if(acnum in userDetails){
      if(psw==userDetails[acnum]["password"]){
        alert("login Successfull!!")
        this.router.navigateByUrl('dashboard')
      }
      else{
        alert("Incorrect Password!")
      }

    }
    else{
      alert("user not Found!!")
    }
    // alert("login clicked")
  }


  
  
}
