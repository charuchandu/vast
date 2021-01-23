import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {
     
  file:any;
 		     incomingfile(event:any)
          {
  			  this.file= event.target.files[0];
    		  }


          formData=new FormData();


  constructor(private ps:ProductService,public rt:Router) { }

  ngOnInit(): void {
  }
  addProduct(ref:NgForm){
    let productObject=ref.value;
    console.log(productObject);
     //adding image and other data to FormData object
     this.formData.append('photo',this.file,this.file.productname);
 
     this.formData.append("productObject",JSON.stringify(productObject))

    this.ps.addProduct(this.formData).subscribe(
      (res)=>{
        alert(res["message"]);
        window.location.reload();
        
      },
      (err)=>{
        console.log("err in adding product",err);
        alert("something went wrong!!")
      }
    )
  }
}
