import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from '../user.service';
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  username:any;
  photo:any;
  email:any;
  userObj:any;
  constructor(public us:UserService,private as:AuthenticationService) { }

  ngOnInit(): void {
    //read user name local storage 
   this.username=localStorage.getItem("username");
   this.photo=localStorage.getItem("photo");
   this.email=localStorage.getItem("email");

   //get user object
   this.us.getUser(this.username).subscribe(
     res=>{
       this.userObj=res["message"];
     },
     err=>{
       alert("some went wrong");
     }
   )
  }

  updateFormStatus=false;
  showUpdateForm(){
    this.updateFormStatus=true;
  }

  saveUpdatedUser(ref:NgForm){
    console.log(ref.value);
    let userObj=ref.value;
    this.updateFormStatus=false;
    this.us.updateUser(userObj).subscribe(
      res=>{
        alert("user data updated successfull")
        this.userObj=res["userObj"]
      },
      err=>{
        console.log(err);
        alert("error in user update");
      }
    )
  }

  userLogout(){
    this.as.logout();
  }

}
