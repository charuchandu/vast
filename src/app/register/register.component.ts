import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private rt:Router) { }

  ngOnInit(): void {
  }
  registration(ref:NgForm){
    if(ref.value.type=="user"){
      this.rt.navigateByUrl('user/uregister')
    }
    else if(ref.value.type=="admin"){
      this.rt.navigateByUrl('admin/aregister')
    }
    else{
      alert("select type to register")
    }
  }
  login(ref:NgForm){
    this.rt.navigateByUrl('/login')
  }

}
