import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { UregisterComponent } from './uregister/uregister.component';
import { AregisterComponent } from './aregister/aregister.component';
import { HttpClientModule } from '@angular/common/http';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { ShowusersComponent } from './showusers/showusers.component';
import { CardinfoComponent } from './cardinfo/cardinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    AboutusComponent,
    UregisterComponent,
    AregisterComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    ShowproductsComponent,
    AddproductsComponent,
    ShowusersComponent,
    CardinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ShowHidePasswordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
