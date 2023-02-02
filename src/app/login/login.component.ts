import { Component } from '@angular/core';

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

  userDetails:any={
    1000:{acno:1000,username:"anu",password:"abc123",balance:0},
    1001:{acno:1000,username:"amal",password:"abc123",balance:0},
    1003:{acno:1000,username:"arun",password:"abc123",balance:0},
    1004:{acno:1000,username:"akhil",password:"abc123",balance:0},
  }
  constructor(){}


  login(){
    var acnum=this.acno
    var psw=this.psw
    var userDetails=this.userDetails
    if(acnum in userDetails){
      if(psw==userDetails[acnum]["password"]){
        alert("login Successfull!!")
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
