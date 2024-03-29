import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public cart: any;
  public total: any = 0;
  public grandtotal: any = 0;
  public item: any;
  public quantity: any = 1;
  public user :  any |'';
  public total_profit : number = 0 ;
  // tslint:disable-next-line:max-line-length
  order: any = {customer: {frist_name: null, last_name: null,  email: null , mobile_no: null , address: null, cnic: null, city: null, state: null , zip_code: null , total : null}, cart: {}};

  constructor(public router: Router , public apicall: ApicallService , public global: GlobalService,public toast : ToastService) { }

  async ionViewDidEnter(){
   await this.ngOnInit();
  }

 async ngOnInit() {
   // this.cart =  history.state.data;
   await this.global.Cart.subscribe(res => {
      this.cart = res;
      console.log(this.cart);
    });
   await this.totalsum();
  }
 async remove(i: any){
    this.cart.splice(i, 1);

    this.total = 0;
     this.total_profit = 0
    // for ( this.item of this.cart) {
    //   this.total =  this.total + this.item.price_per_unit;
    // }
    for(let i = 0 ; i< this.cart.length ; i++)
    {
      this.total = this.total + (this.cart[i].quantity * this.cart[i].price_per_unit)
      this.total_profit = this.total_profit + (this.cart[i].quantity * this.cart[i].profit)
    }
    this.grandtotal = this.total + 110 + this.total_profit;
    console.log(this.total + this.total_profit);
    this.global.set_Cart(this.cart);

    this.toast.presentToast("Removed from Cart")
  }
  totalsum(): void {
    this.total = 0;
    this.total_profit = 0 ;
    // for ( this.item of this.cart) {
    //   this.total =  this.total + this.item.price_per_unit;
    // }
    for(let i = 0 ; i< this.cart.length ; i++)
    {
      this.total = this.total + (this.cart[i].quantity * this.cart[i].price_per_unit)
      this.total_profit = this.total_profit + (this.cart[i].quantity * this.cart[i].profit)
      console.log(this.total_profit)
    }
    this.grandtotal = this.total + 110 + this.total_profit;
    console.log(this.grandtotal);

  }
  async plus(i: any) {
       if(this.cart[i].total_quantity>this.cart[i].quantity){
        this.cart[i].quantity++;
       await this.totalsum();
       }else{
        this.toast.presentToast("Only " + this.cart[i].total_quantity + " Item Left in Stock")
       }


  }
 async minus(i: any) {

  if(this.cart[i].quantity >1){
    this.cart[i].quantity--;
  }

      //this.total = this.total - this.cart[i].price_per_unit;
     await this.totalsum();

  }
  checkout(): void{

    this.global.User.subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
    if(this.user === '')
    {
      this.router.navigate(['login']);
    }
    else{
      console.log('ali');
      this.order.customer= this.user.user
      this.order.customer.total = this.grandtotal;
      this.order.customer.total_profit = this.total_profit;
      this.order.cart = this.cart;
      console.log(this.order);

      this.router.navigate(['confirm'] , {state : {data : this.order}});


    }
    console.log(this.cart);

  }
}
