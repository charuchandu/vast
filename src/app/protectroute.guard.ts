import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtectrouteGuard implements CanActivate {
  canActivate():any{
    let token=localStorage.getItem("token");

    //check token
    //if(token){
   //   return true;
    //}
    //else{
    //  return false;
   // }
  }
  
}
