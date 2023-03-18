import { NavController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  payment : any = {u_id : null , type : '' , acc_no: null}
  public profile:any={name:'',email:'',password:'',confirm_password:'',number:'',adress:'' }
   public UserData : any = null ;
   isModalOpen = false;
   isModalOpen1 = false;
    OrderCounts : any ;
  constructor(public router: Router,
      public api : ApicallService ,
      public global : GlobalService,
      public toast : ToastService,
      public storage : StorageService,
      public navCTRL : NavController

    ) {}


  ngOnInit(){
   this.verify()
   this.api.api_getPayment(this.UserData.u_id)
   this.global.payment.subscribe(res=>{
     this.payment = res[0]
     console.log(this.payment)
   })

   this.api.api_getCountOrders(this.UserData.u_id)
   this.global.ordercounts.subscribe(res=>{
          this.OrderCounts = res
          console.log(res)
   })
  }

 async  updatePayment(){
  this.isModalOpen1 = false
    this.payment.u_id = this.UserData.u_id
    console.log(this.payment)
    await this.api.api_UpdatePayment(this.payment)
setTimeout(() => {
  this.api.api_getPayment(this.UserData.u_id)
}, 500);
  }
  update_profile(){
    console.log(this.UserData)
    this.api.api_UpdateUser(this.UserData)
    this.storage.update("login" , {error:false , user:this.UserData})
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
    this.storage.delete("login")
    this.UserData = null
    this.navCTRL.navigateForward(['tabs/tab1'])

  }

   notification(){
    this.router.navigate(['tabs/tab4'])
   }

  public data: any =[{name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]




  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpen1(isOpen: boolean) {
    this.isModalOpen1 = isOpen;
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
      this.navCTRL.navigateRoot(['login']);
    }
    console.log('test');


  }

}
