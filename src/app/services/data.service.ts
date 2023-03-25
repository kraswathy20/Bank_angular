import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser:any
  currentAcno:any
  userDetails:any

  constructor(private http:HttpClient) { 
    this.getData()
  }

  // userDetails:any={
  //   1000:{acno:1000,username:"anu",password:"abc123",balance:0,transaction:[]},
  //   1001:{acno:1001,username:"amal",password:"abc123",balance:0,transaction:[]},
  //   1003:{acno:1003,username:"arun",password:"abc123",balance:0,transaction:[]},
  //   1004:{acno:1004,username:"akhil",password:"abc123",balance:0,transaction:[]}
  // }

  saveData(){
    if(this.userDetails){
      localStorage.setItem("database",JSON.stringify(this.userDetails))
    }
    if(this.currentUser){
      localStorage.setItem("currentUser",this.currentUser)
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }


  getData(){
    // if there is a 'database' in 'localstorage' then it is stored to this.userdetails(since this.userdetails 
    // is used in register() for storing data)
    if(localStorage.getItem('database')){
      this.userDetails=JSON.parse(localStorage.getItem('database')||'')
    }
    // if there is 'currentUser' in 'localstorage' then it is stored to this.currentuser(since this.currentuser
    // is used in login() to store data)
    if(localStorage.getItem('currentUser')){
      this.currentUser= localStorage.getItem('currentUser')
    }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')|| '')
    }
  }


// any updation in database has to done, then its logic must be given in thz dataservice(bcz as we dont have db nw)

register(uname:any,acno:any,psw:any){
  // create api  body data 
  const data={uname,acno,psw}
  return this.http.post('http://localhost:3000/register',data)
}

login(acno:any,psw:any){
  var userDetails=this.userDetails
    if(acno in userDetails){
      if(psw==userDetails[acno]["password"]){
        this.currentUser=userDetails[acno]["username"]
        // alert("login Successfull!!")

        this.currentAcno=acno
        this.saveData()
        return true
      }
      else{
        return false
      }

    }
    else{
      return false
    }
    
}

deposit(acnum:any,password:any,amount:any){
  // inorder to avoid calling this.userDetails
  let userDetails=this.userDetails
  // convert string to integer
  var amnt=parseInt(amount)
  if(acnum in userDetails){
    if(password==userDetails[acnum]["password"]){
      // update balance
      userDetails[acnum]["balance"]+=amnt

      // transaction data store
      userDetails[acnum]["transaction"].push({Type:"CREDIT",amount:amnt})

      this.saveData()

      // return current balance
      return userDetails[acnum]["balance"]
    }
    else{
      return false
    }
  }
  else{
    return false
  }
}

withdraw(acnum:any,password:any,amount:any){
  // inorder to avoid calling this.userDetails
  let userDetails=this.userDetails
  // convert string to integer
  var amnt=parseInt(amount)
  if(acnum in userDetails){
    if(password==userDetails[acnum]["password"]){
      if(amnt<=userDetails[acnum]["balance"]){
        // update balance
      userDetails[acnum]["balance"]-=amnt

      userDetails[acnum]["transaction"].push({Type:"DEBIT",amount:amnt})
        console.log(userDetails);
        
        this.saveData()
        // return current balance
      return userDetails[acnum]["balance"]
      }
      else{
        alert("insufficient balance")
        return false
      }
      
    }
    else{
      alert("incorrect password")
      return false
    }
  }
  else{
    alert("incorrect acnum")
    return false
  }
}
getTransaction(acno:any){
  return this.userDetails[acno]["transaction"]
}
}
