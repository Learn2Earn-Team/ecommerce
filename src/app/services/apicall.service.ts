import { NavController } from '@ionic/angular';
import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';
import { OneSignalService } from './onesignal.service';

@Injectable({
  providedIn: 'root',
})
export class ApicallService {
  response: any;
  is_payment : boolean =  false
  data: any;
  constructor(
    private router: Router,
    private authservice: AuthService,
    public global: GlobalService,
    public httpClient: HttpClient,
    public toast : ToastService,
    public storage : StorageService,
    private oneSignal: OneSignalService,
    public navCTRL : NavController  ) {}

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



  async api_productbycategory(id: any) {
   await this.authservice.getdata('getproductsbycategory/' + id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_productbucat(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  api_getPayment(u_id: any) {
    this.authservice.getdata('getpayment/' + u_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data)
        this.global.set_Payment(this.data);
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
          this.toast.presentToast("Order placed Successfully");
          this.oneSignal.sendNotification('New Order Placed','A New Order Placed Click to View');
          console.log(this.response);
          this.router.navigate(['order'])
        }
        else {
          console.log('zaib');
        }
      },
      (err) => {
      }
    );
  }

  api_UpdateUser(data: any) {
    this.authservice.con(data, 'updateuser').then(
      (res) => {
        this.response = JSON.parse(String(res).toString());
        console.log(this.response)
      },
      (err) => {
        console.log(err)

      }
    );
  }

  api_InsertPayment(data: any) {
    this.authservice.con(data, 'insertpayment').then(
      (res) => {
        this.response = JSON.parse(String(res).toString());
        console.log(this.response)
      },
      (err) => {
        console.log(err)

      }
    );
  }

  api_UpdatePayment(data: any) {
    this.authservice.con(data, 'updatepayment').then(
      (res) => {
        this.response = JSON.parse(String(res).toString());
        console.log(this.response)
      },
      (err) => {
        console.log(err)

      }
    );
  }

  async api_createuser(data: any) {
    await this.authservice.con(data, 'signup').then(
      async (res) => {
        this.response = JSON.parse(String(res).toString());
        console.log(this.response);

        if (this.response.error === false) {
         this.is_payment = true
         await this.api_signin(data)
          // this.router.navigate(['login'])
          // Swal.fire({
          //   position: 'top-end',
          //   icon: 'success',
          //   title: 'User is created',
          //   showConfirmButton: false,
          //   timer: 2000,
          // });
        }
      },
      (err) => {
        this.toast.presentToast("Something Went Wronge Try Again")
      }
    );
  }

  async api_getSlides() {
    await this.authservice.getdata('getslides').then( (result) => {
      let data = JSON.parse(String(result));
      this.global.set_Slides(data);
      console.log(data);
    }, (err) => {

      console.log(err);
    });
  }
 async  api_signin(data: any) {
   await this.authservice.con(data, 'login').then(
      async (res) => {
        this.response = JSON.parse(String(res).toString());
          console.log(this.response);

        if (this.response.error === false) {
          this.global.set_User(this.response);
          let data : any ;
          this.global.payment.subscribe((res :any)=>{
               data = res
          })
          if(this.is_payment){
            console.log(this.response.user.u_id)
            data.u_id= this.response.user.u_id
            console.log(res)
            setTimeout(() => {
              console.log(data)
              this.api_InsertPayment(data)
            }, 1000);
          }else{
            console.log('else')
            this.api_getPayment(this.response.user.u_id)
          }
           this.storage.set("login" , this.response)
           this.navCTRL.navigateRoot(['tabs/tab1'])
          // Swal.fire({
          //   position: 'top-end',
          //   icon: 'success',
          //   title: 'user login ',
          //   showConfirmButton: false,
          //   timer: 1000,
          // });
          // return 'order is placed';
          this.toast.presentToast("Successfully Logged In")
        }else if(this.response.error === true){
          this.toast.presentToast(this.response.message + ' Please Signup')

        }
      },
      (err) => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'Something went wrong , plz try again!',
        //   footer: '<a href>Why do I have this issue?</a>',
        // });
        // console.log(err);
      }
    );
  }



  api_getorderbyuser(id: any) {
    this.authservice.getdata('getorderuser/' + id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_Userorder(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  api_getBase64(sc_id: any) {
    this.authservice.getdata('get_base64/' + sc_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data)
        this.global.set_Base64(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  api_getCountOrders(u_id: any) {
    this.authservice.getdata('getCountOrder/' + u_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data)
        this.global.set_ordercounts(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

async  api_getImages(sc_id: any) {
   await this.authservice.getdata('productImages/' + sc_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data)
        this.global.set_ProductImages(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async  api_getColors(sc_id: any) {
    await this.authservice.getdata('productColors/' + sc_id).then(
       (result) => {
         let data = JSON.parse(String(result));
         console.log(data)
         this.global.set_ProductColors(data);
         // this.router.navigate(['customerdetail']);
       },
       (err) => {
         console.log(err);
       }
     );
   }

   async  api_getSizes(sc_id: any) {
    await this.authservice.getdata('productSizes/' + sc_id).then(
       (result) => {
         let data = JSON.parse(String(result));
         console.log(data)
         this.global.set_ProductSizes(data);
         // this.router.navigate(['customerdetail']);
       },
       (err) => {
         console.log(err);
       }
     );
   }

  api_getorderdetail(id: any) {
    this.authservice.getdata('getorderdetail/' + id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        this.global.set_orderdetail(this.data);
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  api_CancelOrder(o_id: any) {
    this.authservice.getdata('CancelOrder/' + o_id).then(
      (result) => {
        let data = JSON.parse(String(result));
            console.log(data)
            if(data){
              this.toast.presentToast("Order is Cancelled Successfully")
              history.back()
            }
        // this.router.navigate(['customerdetail']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //category
}
