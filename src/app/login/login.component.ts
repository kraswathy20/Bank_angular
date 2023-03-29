import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  // acno=''
  // // or acno:any

  // psw=''

  
  
  // dependency injection
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder){ }
// model form

loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
})

  login(){
    var acnum=this.loginForm.value.acno
    var psw=this.loginForm.value.psw
    if(this.loginForm.valid){
      this.ds.login(acnum,psw).subscribe((result:any)=>{

        localStorage.setItem("currentUser",JSON.stringify(result.currentUser))
        localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
        localStorage.setItem("token",JSON.stringify(result.token))

        alert(result.message)
        this.router.navigateByUrl('dashboard')

      },
      result=>{
        alert(result.error.message)
      })
    }
    else
    {
      alert("invalid form")
    }
    
    
  }


  
  
}
