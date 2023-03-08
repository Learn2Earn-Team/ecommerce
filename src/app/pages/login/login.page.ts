import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
public user:any= {username:'' ,password:''}
constructor(public router: Router , public apicall: ApicallService , public global: GlobalService) { }

  ngOnInit() {
  }

  login(){
    this.apicall.api_signin(this.user);
    console.log(this.user)
   
  }
  next(){
    

    this.router.navigate(['signup'])
  }

}
