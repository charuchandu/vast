import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  products:any;
  constructor(public ps:ProductService,public rt:Router) { }

  ngOnInit(): void {
    this.ps.getAllProducts(this.products).subscribe(
      res=>{
        this.products=res["products"];
        console.log(this.products);
      },
      err=>{
        alert("some wrong occured");
        console.log(err);
      }
    )
  }
  delete(pid:any){
  //  let del=this.products.filter(function(pobj:any){
  //    if(pobj.pid==pid){
  //      return pobj
  //    } 
  //  });
  //  console.log(del);
   this.ps.deleteProduct(pid).subscribe(
     res=>{
       this.products=res["products"];
       console.log(this.products);
     },
     err=>{
       console.log(err);
     }
   )
  }
}
