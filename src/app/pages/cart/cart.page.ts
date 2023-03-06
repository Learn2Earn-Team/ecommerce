import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public data: any;
  public quantity: any = 1;
  public cart_data :any;
  
  plus(){
    if(this.quantity<4){
      this.quantity++
    }

  }


  sub(){
    if(this.quantity>1){  
    this.quantity--;

    }
  }

  
  constructor(public router: Router , public global:GlobalService) {}

  ngOnInit() {
    this.global.Addcart.subscribe(res=>{
      this.cart_data=res;
      console.log(this.cart_data)

    });
  }
  cart(){
    this.router.navigate(['confirm'])
   }

   cart_store(){
    this.global.Addcart.subscribe(res=>{
      this.cart_data=res;
      console.log(this.cart_data)

    });
}
delete(chatfil: any){
  this.cart_data.splice(chatfil,1);
  
}
}