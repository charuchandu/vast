import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from '../user.service';
//import { from } from 'rxjs';

@Component({
  selector: 'app-uregister',
  templateUrl: './uregister.component.html',
  styleUrls: ['./uregister.component.css']
})
export class UregisterComponent implements OnInit {
     
  file:any;
 		     incomingfile(event:any)
          {
  			  this.file= event.target.files[0];
    		  }


          formData=new FormData();


  constructor(private us:UserService,public rt:Router) { }

  ngOnInit(): void {
  }
  userRegistration(ref:NgForm){
    let userObject=ref.value;
    console.log(userObject);
     //adding image and other data to FormData object
     this.formData.append('photo',this.file,this.file.name);
 
     this.formData.append("userObject",JSON.stringify(userObject))

    this.us.uregister(this.formData).subscribe(
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
