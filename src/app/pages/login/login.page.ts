import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
import  firebase  from 'firebase/compat/app'
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
const environment:any = {firebaseConfig : {
 apiKey: "AIzaSyBmxCszTxO9ETX53FLurCtZVmSXz9p_c2c",
 authDomain: "realbeez-66e11.firebaseapp.com",
 projectId: "realbeez-66e11",
 storageBucket: "realbeez-66e11.appspot.com",
 messagingSenderId: "266197435311",
 appId: "1:266197435311:web:104f8bf7edbeac8d3a655a",
 measurementId: "G-7W9ENPV1KX"
},
CountryJson: [
 { name: 'India', dial_code: '+91', code: 'IN' },
 { name: 'Pakistan', dial_code: '+92', code: 'PK' },
]}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {
public user:any= {mobile_no:''}

public recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
confirmationResult: any;
CountryCode: any = '+92';

constructor(public router: Router , public apicall: ApicallService , public global: GlobalService, private alert: AlertController,
  private authService:  AuthService,public loading : LoadingController) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //  this.recaptchaVerifier = undefined ;
  }

  login(){
    this.apicall.api_signin(this.user);
    console.log(this.user)

  }
  next(){


    this.router.navigate(['signup'])
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Please Wait',
      spinner: 'bubbles'
    });
    await loading.present();
  }


async ionViewDidEnter() {
  this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    size: 'invisible',
    callback: (response:any) => {
      console.log(response)
      console.log(this.recaptchaVerifier)
    },
    'expired-callback': () => {
    }
  });
}
// ionViewDidLoad() {
//   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//     size: 'invisible',
//     callback: (response:any) => {
//       console.log(response)
//       console.log(this.recaptchaVerifier)
//     },
//     'expired-callback': () => {
//     }
//   });
// }

// countryCodeChange($event: any) {
//   this.CountryCode = $event.detail.value;
//   console.log(this.CountryCode)
// }
// Button event after the nmber is entered and button is clicked
async signinWithPhoneNumber() {
  await this.presentLoading()
  console.log(this.user)
  console.log('country', this.recaptchaVerifier);

  if (this.user.mobile_no && this.CountryCode) {
    console.log(this.CountryCode + this.user.mobile_no);
    this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.user.mobile_no).then(
      success => {
        console.log(success)
        this.loading.dismiss()
        this.OtpVerification();
      }
    );
  }
}

async showSuccess() {
  const alert = await this.alert.create({
    header: 'Success',
    buttons: [
      {
        text: 'Ok',
        handler: (res) => {
          alert.dismiss();
        }
      }
    ]
  });
  alert.present();
}
async OtpVerification() {
  const alert = await this.alert.create({
    header: 'Enter OTP',
    mode: 'ios',
    backdropDismiss: false,
    inputs: [
      {
        name: 'otp',
        type: 'text',
        placeholder: 'Enter Your OTP',
      }
    ],
    buttons: [{
      text: 'Confirm',
      handler: (res) => {
        this.authService.enterVerificationCode(res.otp).then(
          async userData => {
            this.showSuccess();
            this.login()
          }
        );
      }
    }
    ]
  });
  await alert.present();
}


}
