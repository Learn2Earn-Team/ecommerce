import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ApicallService {
  response: any;
  data: any;
  constructor(
    private router: Router,
    private authservice: AuthService,
    public global: GlobalService,
    public httpClient: HttpClient
  ) {}

  api_getcategory(): void {
    this.authservice.getdata('getcategory').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_Category(this.data);
        console.log(this.data, 'data Updated');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  api_productbycategory(id: any) {
    this.authservice.getdata('getproductsbycategory/' + id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_product(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  api_getallproducts(): void {
    this.authservice.getdata('getallproducts').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_product(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  api_featureproducts(): void {
    this.authservice.getdata('getfeatureproducts').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_Feature(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  api_latestproducts(): void {
    this.authservice.getdata('getlatestproducts').then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_Latest(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  api_addorder(data: any) {
    this.authservice.con(data, 'addorder').then(
      (res) => {
        this.response = JSON.parse(String(res).toString());
        if (this.response.error === false) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your order is placed',
            showConfirmButton: false,
            timer: 2000,
          });
          return 'order is placed';
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong , plz try again!',
          footer: '<a href>Why do I have this issue?</a>',
        });
        console.log(err);
      }
    );
  }
  api_createuser(data: any): void {
    this.authservice.con(data, 'signup').then(
      async (res) => {
        this.response = JSON.parse(String(res).toString());
        console.log(this.response);
        
        if (this.response.error === false) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User is created',
            showConfirmButton: false,
            timer: 2000,
          });
          return 'order is placed';
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong , plz try again!',
          footer: '<a href>Why do I have this issue?</a>',
        });
        console.log(err);
      }
    );
  }
  api_signin(data: any) {
    this.authservice.con(data, 'login').then(
      async (res) => {
        this.response = JSON.parse(String(res).toString());
          console.log(this.response);
          
        if (this.response.error === false) {
          this.global.set_User(this.response);
           this.router.navigate(['tabs/tab1'])
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'user login ',
            showConfirmButton: false,
            timer: 1000,
          });
          return 'order is placed';
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong , plz try again!',
          footer: '<a href>Why do I have this issue?</a>',
        });
        console.log(err);
      }
    );
  }

  //category
}
