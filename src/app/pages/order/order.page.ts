import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {


  constructor(public router: Router) {}

  data:any =[{id: 3244, name:"Rehan Rana", date:"Mar 08 2023", total: "32000", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Processing"},
  {id: 3114, name:"Usman Fareed", date:"Mar 06 2023", total: "17000", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Shipped"},
  {id: 3874, name:"Shazaib Malik", date:"Mar 02 2023", total: "31999", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Completed"}
,{id: 3211, name:"Abdullah", date:"Mar 02 2023", total: "2000", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Refunded"}
,{id: 3420, name:"Zagham Nadeem", date:"Mar 05 2023", total: "300", address: "hkdjhak sjhdjh abdas", mobile: "0303018283", status:"Cancelled"}]



  cart(){
    this.router.navigate(['cart'])
   }

   prof(){
    this.router.navigate(['tabs/tab3'])
   }

   search(){
    this.router.navigate(['tabs/tab2'])
   }


  ngOnInit() {
  }

  type = 'Pending';



  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
