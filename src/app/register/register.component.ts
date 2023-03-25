import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  


constructor(private ds:DataService,private router:Router,private fb:FormBuilder){}

// create reactive form of register form
registerForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
  psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
})

register(){
  
    // let userDetails=this.ds.userDetails
    var uname=this.registerForm.value.uname
    var acno=this.registerForm.value.acno
    var psw=this.registerForm.value.psw

    if(this.registerForm.valid){
    this.ds.register(uname,acno,psw).subscribe((result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message)
      this.router.navigateByUrl('')

    }
    )

    
    // console.log(uname,acno,psw);
  }
  else{
    alert("invalid Form")
  }
}

}
