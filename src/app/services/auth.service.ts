import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//const apiUrl = 'https://Learn2earnn.com/hospital/public/';
const apiUrl = 'http://localhost/ecommerce/public/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }



  // geting posts

  getdata(type: any) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + type).
      subscribe(res => {
        resolve(JSON.stringify(res));
      },  (err) => {
        reject(err);
        console.log(err);
      });
    });
  }



}