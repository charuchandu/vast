import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public hc:HttpClient) { }
  addProduct(productObject:any):Observable<any>{
    //http post request
   return this.hc.post("product/addproduct",productObject)
  }

  getAllProducts(products:any):Observable<any>{
    return this.hc.get<any[]>('/product/products',products)
   }

   deleteProduct(pid:any):Observable<any>{
     return this.hc.delete<any>(`/product/deleteproduct/${pid}`);
   }

   getProducts():Observable<any>{
     return this.hc.get<any>('/product/products');
   }

   cart(viewData:any):Observable<any>{
     return this.hc.post<any>('/cart/addToCart',viewData);
   }

   cartData():Observable<any>{
     return this.hc.get<any>('/cart/getCart');
   }

   delete(pid:any):Observable<any>{
     return this.hc.delete<any>(`/cart/deleteObj/${pid}`);
   }
}
