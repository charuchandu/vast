import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AdminService} from '../admin.service';
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  username:any;
  photo:any;
  email:any;
  adminObj:any;
  constructor(public ads:AdminService,private as:AuthenticationService) { }

  ngOnInit(): void {
    //read user name local storage 
   this.username=localStorage.getItem("username");
   this.photo=localStorage.getItem("photo");
   this.email=localStorage.getItem("email");

   //get user object
   this.ads.getAdmin(this.username).subscribe(
     res=>{
       this.adminObj=res["message"];
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

  saveUpdatedAdmin(ref:NgForm){
    console.log(ref.value);
    let adminObj=ref.value;
    this.updateFormStatus=false;
    this.ads.updateAdmin(adminObj).subscribe(
      res=>{
        alert("admin data updated successfull")
        this.adminObj=res["adminObj"]
      },
      err=>{
        console.log(err);
        alert("error in admin update");
      }
    )
  }

  adminLogout(){
    this.as.logout();
  }

}
