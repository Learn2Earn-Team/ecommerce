import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public user: any = {frist_name: null , last_name: null , email: null , password : null , mobile_no: null , address: null , cnic: null , city: null, state: null, zip_code: null};

  constructor(public router: Router , public apicall: ApicallService , public global: GlobalService) { }

  ngOnInit() {
  }
   signup(){
    console.log(this.user)
    this.apicall.api_createuser(this.user);
    
  }
  back(){
    this.router.navigate(['login'])
  }
}
