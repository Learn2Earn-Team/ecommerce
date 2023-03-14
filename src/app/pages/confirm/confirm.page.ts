import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  public cart: any;

  public data: any =[{name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]

public send: boolean = false;
  public order: any;
  constructor(public router: Router , public apicall: ApicallService , public global: GlobalService , public toast : ToastService) { }

  ngOnInit() {
    this.global.Cart.subscribe(res => {
      this.cart = res;
      console.log(this.cart);
    });
    this.order = history.state.data;
    console.log(this.order);

  }

  buynow(){
    console.log(this.order);

    this.apicall.api_addorder(this.order);
    this.order = '';
    this.cart = ''
    this.global.set_Cart(this.cart)


  }

}
