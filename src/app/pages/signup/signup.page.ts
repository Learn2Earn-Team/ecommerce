import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
import  firebase  from 'firebase/compat/app'
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
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
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  CountryJson = environment.CountryJson;
  payment : any = {u_id : null , type : '' , acc_no: null}
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any = '+92';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
 public recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  public user: any = {frist_name: null , last_name: null , email: null , mobile_no: null , address: null , cnic: null , city: null, state: null, zip_code: null};

  constructor(public router: Router , public apicall: ApicallService , public global: GlobalService,
    private alert: AlertController, public storage : StorageService,
    private authService:  AuthService,public toast : ToastService , public loading : LoadingController) { }

  ngOnInit() {
  }
   signup(){
    console.log(this.user)
    this.apicall.api_createuser(this.user);

  }
  back(){
    this.router.navigate(['login'])
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
  ionViewDidLoad() {
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

  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Please Wait',
      spinner: 'bubbles',
      duration : 10000
    });
    await loading.present();
  }
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
          this.loading.dismiss()
          this.OtpVerification();
        }, (err)=>{
          console.log(err)
          this.loading.dismiss()
          this.toast.presentToast("Error! If Keep Showing Try Restarting App")
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
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Confirm',
        handler: (res) => {
          this.presentLoading()
          this.authService.enterVerificationCode(res.otp).then(
            async userData => {
              this.showSuccess();
              this.postData()
            },(err)=>{
              this.loading.dismiss()
            this.toast.presentToast("Please Enter Correct Verfication Code")
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }

  postData(){
    console.log(this.user)
    this.global.set_User({error:false , user:this.user})
    this.apicall.api_createuser(this.user);
    this.global.set_Payment(this.payment)
    this.loading.dismiss()
  }
}
