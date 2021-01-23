import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-showusers',
  templateUrl: './showusers.component.html',
  styleUrls: ['./showusers.component.css']
})
export class ShowusersComponent implements OnInit {
  users:any;
  constructor(public us:UserService) { }

  ngOnInit(): void {
    this.us.getAllUsers(this.users).subscribe(
      res=>{
        this.users=res["users"];
        console.log(this.users);
      },
      err=>{
        alert("some wrong occured");
        console.log(err);
      }
    )
  }


}
