import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
public user:any= {email:'' ,password:''}
  constructor(public router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log(this.user)
    this.router.navigate(['tabs/tab1'])
  }
  next(){
    this.router.navigate(['signup'])
  }

}
