
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
//import { from } from 'rxjs';

@Component({
  selector: 'app-aregister',
  templateUrl: './aregister.component.html',
  styleUrls: ['./aregister.component.css']
})
export class AregisterComponent implements OnInit {

  file:any;
 		     incomingfile(event:any)
          {
  			  this.file= event.target.files[0];
    		  }


          formData=new FormData();


  constructor(private us:AdminService,public rt:Router) { }

  ngOnInit(): void {
  }
  adminRegistration(ref:NgForm){
    let adminObject=ref.value;
    console.log(adminObject);

    this.formData.append('photo',this.file,this.file.name);
 
     this.formData.append("adminObject",JSON.stringify(adminObject))



    this.us.aregister(this.formData).subscribe(
      (res)=>{
        alert(res["message"]);
        this.rt.navigateByUrl('/login');
      },
      (err)=>{
        console.log("err in user registration",err);
        alert("something went wrong!!")
      }
    )
  }

}
