import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser:any
  currentAcno:any

  constructor() { }

  userDetails:any={
    1000:{acno:1000,username:"anu",password:"abc123",balance:0,transaction:[]},
    1001:{acno:1001,username:"amal",password:"abc123",balance:0,transaction:[]},
    1003:{acno:1003,username:"arun",password:"abc123",balance:0,transaction:[]},
    1004:{acno:1004,username:"akhil",password:"abc123",balance:0,transaction:[]}
  }
// any updation in database has to done, then its logic must be given in thz dataservice(bcz as we dont have db nw)

register(uname:any,acno:any,psw:any){
  if(acno in this.userDetails){
    return false
  }
  else{
    this.userDetails[acno]={acno,username:uname,password:psw,balance:0}
    // console.log(this.userDetails);
    
    return true
  }

}

login(acno:any,psw:any){
  var userDetails=this.userDetails
    if(acno in userDetails){
      if(psw==userDetails[acno]["password"]){
        this.currentUser=userDetails[acno]["username"]
        // alert("login Successfull!!")

        this.currentAcno=acno
       
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
