import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service'

@Component({
  selector: 'app-cardinfo',
  templateUrl: './cardinfo.component.html',
  styleUrls: ['./cardinfo.component.css']
})
export class CardinfoComponent implements OnInit {

  viewData:any;
  constructor(public ar:ActivatedRoute,public ps:ProductService,public rt:Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe((arres)=>{
      console.log("arres",arres);
      this.ps.getProducts().subscribe((psres)=>{
        let details;
        console.log(psres);
        let arr=psres["products"]
        arr.filter(function(x:any){
          if(arres.pid==x.pid){
            details=x
          }
        })
        if(details){
          this.viewData=details
          console.log(this.viewData);
        }
      })
    },
    (err)=>{
      console.log("err");
    })
  }
cart(viewData:any){
  this.ps.cart(viewData).subscribe(
    res=>{
      alert(res["message"]);
      window.location.reload();
    },
    err=>{
      console.log(err);
    }
  )
}

}
