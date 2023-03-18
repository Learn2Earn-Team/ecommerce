import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const apiUrl = 'https://Learn2earnn.com/ecommerece/public/';
// const apiUrl = 'http://localhost/ecommerece/public/';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public confirmationResult?: firebase.auth.ConfirmationResult;

  constructor(public http: HttpClient,private fireAuth: AngularFireAuth) { }
con(data: any, type: any) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, data).subscribe(
        (res) => {
          resolve(JSON.stringify(res));
        },
        (err) => {
          reject(err);
          console.log(err);
        }
      );
    });
  }


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

  public signInWithPhoneNumber(recaptchaVerifier: any, phoneNumber: any) {
    return new Promise<any>((resolve, reject) => {

      this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch((error) => {
          console.log(error);
          reject('SMS not sent');
        });
    });
  }


  public async enterVerificationCode(code: string) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult?.confirm(code).then(async (result) => {
        console.log(result);
        const user = result.user;
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      });

    });
  }


}
