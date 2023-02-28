import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {GlobalService} from './global.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private router: Router ,private authservice: AuthService , public global: GlobalService , public httpClient : HttpClient) { }

  public product:any;

  api_getproduct(){
    this.authservice.getdata('getproduct').then((result) => {
      this.product = JSON.parse(String(result));
      this.global.set_product(this.product);
      console.log(this.product,'data Updated');
    }, (err) => {

      console.log(err);
    });
  }
}
