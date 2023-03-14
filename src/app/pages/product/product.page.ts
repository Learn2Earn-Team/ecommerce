import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  public item1: any = {c_id : null , discription: null , image: null , name: null ,  price_per_unit: null , quantity: null , sc_id: null, total_quantity: null, color: null , size: null};
  public cart: {}[] = [];
  public cart1: any = {};
  public data: any ={name:"Men Premium Shalwar Kameez Off White", brand: "Riwaj" ,price:"2200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}
 public store:any
  public suitData: any;
  public CartData: any;
 public productdetail: any;
  max_profit: number = 100 ;
  profit! : number ;
  constructor(public router: Router, public global: GlobalService , public toast : ToastService) {}

 async ngOnInit() {
     this.productdetail =  history.state.data;
  await console.log(this.productdetail);

  }

 async addcart(item: any){

    item.profit = this.profit;
    let cartData:any = [];
    let cartArray :any= [];
  await this.global.Cart.subscribe(res=> {
      cartData = res;
      console.log(cartData);
    })
    if(cartData.length===0){
      cartArray.push(item);
      this.global.set_Cart(cartArray)
    }
    else{
    const found = cartData.find((item1:any)=> item1.sc_id == item.sc_id)
    console.log(found)
    if(found){
      for(let i=0; i<cartData.length; i++){
        if(cartData[i].sc_id=== found.sc_id){
          cartData[i].quantity++;
          this.global.set_Cart(cartData);
        }
      }
    }
    else{
      cartData.push(item)
      this.global.set_Cart(cartData)
    }


    }
    this.toast.presentToast("Added To Cart Successfully")
     this.router.navigate(['./cart']);
  }

  cart11(){
    this.router.navigate(['cart'])
   }

   prof(){
    this.router.navigate(['tabs/tab3'])
   }

   search(){
    this.router.navigate(['tabs/tab2'])
   }



  //  share(){

  //  }


}
