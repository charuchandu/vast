import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public hc:HttpClient) { }

  //user registration
  uregister(userObject:any):Observable<any>{
    //http post request
   return this.hc.post("user/uregister",userObject)
  }

  getUser(username:any):Observable<any>{
    //http get req
    return this.hc.get(`/user/read/${username}`);
  }

  updateUser(userObj:any):Observable<any>{
   return this.hc.put("/user/update",userObj);
  }

  getAllUsers(users:any):Observable<any>{
   return this.hc.get<any[]>('/user/users',users)
  }
}
