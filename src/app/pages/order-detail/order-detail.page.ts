import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  public detail: any;
  stateData : any ;
  constructor(public alert : AlertController, public router: Router , public apicall: ApicallService , public global: GlobalService) { }


  cart(){
    this.router.navigate(['cart'])
   }

   prof(){
    this.router.navigate(['tabs/tab3'])
   }

   search(){
    this.router.navigate(['tabs/tab2'])
   }


 async ngOnInit() {
     this.stateData = history.state.data
     console.log(this.stateData)
    await this.global.Orderdetail.subscribe(res => {
      this.detail = res;
      console.log(this.detail);
    });
  }

 async cancelOrder(){
      const alert = await this.alert.create({
        header: 'Alert!',
        subHeader: 'Are you sure Wanna Cancel The Order?',
        mode: "ios",
        buttons: [
          {
            text:"Cancel"
          },
          {
            text:"Yes",
            handler: (res)=>{
              this.apicall.api_CancelOrder(this.stateData.o_id)
              console.log(this.stateData.o_id)
            }
          }
        ]
      });

      await alert.present();

  }


}
