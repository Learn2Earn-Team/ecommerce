import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 public user:any={name:'',email:'',password:'',confirm_password:'',number:'',adress:'' }
  constructor( public router:Router) { }

  ngOnInit() {
  }
   signup(){
    console.log(this.user)
    this.router.navigate(['login'])
  }
  back(){
    this.router.navigate(['login'])
  }
}
