import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '../product.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
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

  viewMore(pid:any){
    this.rt.navigateByUrl(`cardinfo/${pid}`)
    //console.log(pid);
  }

}
