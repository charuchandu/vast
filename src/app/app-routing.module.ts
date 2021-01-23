import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { from } from 'rxjs';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from'./products/products.component';
import {RegisterComponent} from'./register/register.component';
import {LoginComponent} from'./login/login.component';
import {AboutusComponent} from'./aboutus/aboutus.component';
import {CartComponent} from './cart/cart.component';
import {UregisterComponent} from './uregister/uregister.component';
import {AregisterComponent} from './aregister/aregister.component';
import {UserdashboardComponent} from './userdashboard/userdashboard.component';
import {AdmindashboardComponent} from './admindashboard/admindashboard.component';
import {ShowproductsComponent} from './showproducts/showproducts.component';
import {AddproductsComponent} from './addproducts/addproducts.component';
import {ShowusersComponent} from './showusers/showusers.component';
import {CardinfoComponent} from './cardinfo/cardinfo.component'
import { from } from 'rxjs';
import { ProtectrouteGuard } from './protectroute.guard';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"products",component:ProductsComponent},
  {path:"register",component:RegisterComponent},
  {path:"user/uregister",component:UregisterComponent},
  {path:"admin/aregister",component:AregisterComponent},
  {path:"login",component:LoginComponent},
  {path:"aboutus",component:AboutusComponent},
  
  {path:"userdashboard",component:UserdashboardComponent,children:[
    {path:"cart",component:CartComponent},
  ]},
  {path:"admindashboard",component:AdmindashboardComponent,children:[
    {path:"showproducts",component:ShowproductsComponent},
    {path:"addproducts",component:AddproductsComponent},
    {path:"showusers",component:ShowusersComponent},
    //{path:"",redirectTo:"/showproducts",pathMatch:"full"}
  ]},
  {path:"cardinfo/:pid",component:CardinfoComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
