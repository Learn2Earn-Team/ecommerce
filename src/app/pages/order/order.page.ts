import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

public user: any;
public userorder: any;
  constructor(public router: Router , public apicall: ApicallService , public global: GlobalService) { }

//   data:any =[{id: 3244, name:"Rehan Rana", date:"Mar 08 2023", total: "32000", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Processing"},
//   {id: 3114, name:"Usman Fareed", date:"Mar 06 2023", total: "17000", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Shipped"},
//   {id: 3874, name:"Shazaib Malik", date:"Mar 02 2023", total: "31999", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Completed"}
// ,{id: 3211, name:"Abdullah", date:"Mar 02 2023", total: "2000", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Refunded"}
// ,{id: 3420, name:"Zagham Nadeem", date:"Mar 05 2023", total: "300", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Cancelled"}]


data : any ;
  cart(){
    this.router.navigate(['cart'])
   }

   prof(){
    this.router.navigate(['tabs/tab3'])
   }

   search(){
    this.router.navigate(['tabs/tab2'])
   }

   next(o_id: any){
    this.apicall.api_getorderdetail(o_id)
    this.router.navigate(['order-detail'])
   }


   async ionViewDidEnter(){
    await this.ngOnInit();
   }

  async ngOnInit() {
    // this.cart =  history.state.data;
   await this.global.User.subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
    await this.apicall.api_getorderbyuser(this.user.user.u_id)
    await this.global.Userorder.subscribe((res:any[]) => {
      this.userorder = res;
      this.userorder = res.filter(val => val.status == 'pending')
      this.data = res.filter(val => val.status == 'confrm')
      console.log(this.userorder);
      console.log(this.data);
    });
   }

  type = 'Pending';



  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
