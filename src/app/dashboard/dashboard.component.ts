import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


user:any


// acno:any
// psw:any
// amnt:any

// acno1:any
// psw1:any
// amnt1:any

  constructor(private ds:DataService,private fb:FormBuilder) { 
    this.user=this.ds.currentUser
  }
  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
    amnt:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })

  withdrawForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]+')]],
    psw1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
    amnt1:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })
  deposit(){
    var acno=this.depositForm.value.acno
    var psw=this.depositForm.value.psw
    var amnt=this.depositForm.value.amnt
    if(this.depositForm.valid){
    const result=this.ds.deposit(acno,psw,amnt)
    if(result){
      alert(`Your account has been credited with amount ${amnt}.Your availabale balance is ${result}`)
    }
    else{
      alert("incorrect account Number or password!")
    }
  }
  else{
    alert("invalid Form")
  }
  }

  withdraw(){
    var acno=this.withdrawForm.value.acno1
    var psw=this.withdrawForm.value.psw1
    var amnt=this.withdrawForm.value.amnt1
    if(this.withdrawForm.valid){
    const result=this.ds.withdraw(acno,psw,amnt)
    if(result){
      alert(`Your account has been debited with amount ${amnt}.Your availabale balance is ${result}`)
    }
  }
  else{
    alert("invalid Form!")
  }

  }

}
