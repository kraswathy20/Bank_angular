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

    const result=this.ds.login(acnum,psw)
    if(result){
      alert("login Success!");
      this.router.navigateByUrl('dashboard')
    }
    else{
      alert("incorrect acno or password")
    }
    
  }


  
  
}
