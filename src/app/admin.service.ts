import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(public hc:HttpClient) { }

  //admin registration
  aregister(adminObject:any):Observable<any>{
    //http post request
   return this.hc.post("admin/aregister",adminObject)
  }
  getAdmin(username:any):Observable<any>{
    //http get req
    return this.hc.get(`/admin/read/${username}`);
  }

  updateAdmin(adminObj:any):Observable<any>{
   return this.hc.put("/admin/update",adminObj);
  }

}
