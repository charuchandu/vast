import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private hc:HttpClient,public rt:Router) { }

  //user login
  getUserToken(userCredentialObject:any):Observable<any>{
    console.log(userCredentialObject);
    return this.hc.post("/user/login",userCredentialObject);
  }

  //admin login
  getAdminToken(adminCredentialObject:any):Observable<any>{
    return this.hc.post("/admin/login",adminCredentialObject);
  }
  
 //log out
  logout(){
  //clear local storage
  localStorage.clear();
  //navigate to login
  this.rt.navigateByUrl('/login');
  }

}

