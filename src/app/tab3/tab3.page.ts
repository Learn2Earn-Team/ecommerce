import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public profile:any={name:'',email:'',password:'',confirm_password:'',number:'',adress:'' }
   public UserData : any ;

  constructor(public router: Router,
      public api : ApicallService ,
      public global : GlobalService,
      public toast : ToastService

    ) {}


  ngOnInit(){
      this.verify()
  }
  update_profile(){
    console.log(this.UserData)
    this.api.api_UpdateUser(this.UserData)
    this.isModalOpen = false
    this.toast.presentToast("Profile Updated Successfully")
    //  this.api.
  }

  cart(){
    this.router.navigate(['cart'])
   }

   prof(){
    this.router.navigate(['tabs/tab3'])
   }

   order(){
    this.router.navigate(['order'])
   }
   logout(){
    this.global.set_User('')
    this.toast.presentToast("Successfully Logged Out")
    this.router.navigate(['tabs/tab1'])
   }

   notification(){
    this.router.navigate(['tabs/tab4'])
   }

  public data: any =[{name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]


  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  verify(){
    let data ;
    this.global.User.subscribe(res => {
      this.UserData = res.user;
      data = res
      console.log(this.UserData);
    });
    if(data === '')
    {
      this.toast.presentToast("Please Login To Continue")
      this.router.navigate(['login']);
    }
    else{
      console.log('logged in');

    }
    console.log('test');


  }

}
