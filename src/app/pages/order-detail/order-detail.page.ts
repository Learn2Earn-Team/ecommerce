import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  public detail: any;
  constructor(public router: Router , public apicall: ApicallService , public global: GlobalService) { }


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
    await this.global.Orderdetail.subscribe(res => {
      this.detail = res;
      console.log(this.detail);
    });
  }



}
