import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public rt:Router,private as:AuthenticationService) { }

  ngOnInit(): void {
  }

  login(ref:NgForm){
    let userCredentialObject=ref.value;
    console.log(userCredentialObject);

    if(userCredentialObject.type=="user"){
    this.as.getUserToken(userCredentialObject).subscribe(
      res=>{
        if(res["status"]=="failed"){
          alert(res["message"]);
        }
        else if(res["status"]=="success"){
          //store token in local storage
          localStorage.setItem("token",res["message"]);
          localStorage.setItem("username",res["username"]);
          localStorage.setItem("photo",res["photo"]);
          localStorage.setItem("email",res["email"]);
          this.rt.navigateByUrl('/userdashboard');
        }
      },
      err=>{
        console.log("error in login",err);
        alert("something went wrong in login process")
      }
    )
  }
    if(userCredentialObject.type=="admin"){
      this.as.getAdminToken(userCredentialObject).subscribe(
        res=>{
          if(res["status"]=="failed"){
            alert(res["message"]);
          }
          else if(res["status"]=="success"){
            //store token in local storage
            localStorage.setItem("token",res["message"]);
            localStorage.setItem("username",res["username"]);
            localStorage.setItem("photo",res["photo"]);
            localStorage.setItem("email",res["email"]);
            this.rt.navigateByUrl('/admindashboard');
          }
        },
        err=>{
          console.log("error in login",err);
          alert("something went wrong in login process")
        }
      )
    }
  }
}
