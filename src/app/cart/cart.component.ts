import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../product.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  cardData:any;
  
  constructor(public ps:ProductService) { }

  ngOnInit(): void {
    this.ps.cartData().subscribe(
      res=>{
        this.cardData=res["cart"]
        console.log(this.cardData);
      },
      err=>{
        console.log(err);
      }
    )
  }
    
  delete(pid:any){
    this.ps.delete(pid).subscribe(
      res=>{
        console.log(res["message"]);
        window.location.reload();
      },
      err=>{
        console.log(err);
      }
    )
  }


}
