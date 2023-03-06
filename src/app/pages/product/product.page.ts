import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public data: any ={name:"Men Premium Shalwar Kameez Off White", brand: "Riwaj" ,price:"2200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}
 public store:any
  public suitData: any;
  public CartData: any;
 
  constructor(public router: Router, public global: GlobalService) {}



  // cart(store:any){
  //   this.global.set_addcart(this.store);
  //   console.log(store);
  //   this.router.navigate(['cart'])
  //  }

  // async AddToCart(fooditem:any) {
  //   let cartData:any = [];
  //   let cartArray = [];
  //   console.log(fooditem);
  //    this.global.Addcart.subscribe(res=> {
  //       cartData = res;      
  //     });
  //     if(cartData.length == 0) {
  //       cartArray.push(fooditem);
  //       this.global.set_addcart(cartArray);
  //           this.badgeValue++;
  //     this.global.set_cartbadge(this.badgeValue);
  //     }
  //     else {
  //       const found = cartData.find((item:any) => item.id == fooditem.id)
  //       console.log(found);
  //       if(found) {
  //         for(let i = 0; i < cartData.length; i++) {
  //         if(cartData[i].id === found.id) {
  //           cartData[i].qtn++;
  //           cartData[i].total = cartData[i].total + cartData[i].price
  //           console.log('repeat', cartData);
            
  //           this.global.set_addcart(cartData);
  //         }
  //       }
  //       }
  //       else {
  //         cartData.push(fooditem);
  //         this.global.set_addcart(cartData);
  //         this.badgeValue++;
  //         this.global.set_cartbadge(this.badgeValue);
  //       }
        
  //     }
  //   this.router.navigate(['/tab3'] , {state : {data :1}});
  // }
   
async cart( store:any) {
  console.log(store)
  let cartData:any = [];
  let cartArray = [];
  this.global.Addcart.subscribe(res => {
    cartData = res;
  });
  if(cartData.length == 0) {
          cartArray.push(store);
          console.log(cartArray)
          this.global.set_addcart(cartArray);
        }
          else {
            cartData.push(store);
            console.log(cartData)
            this.global.set_addcart(cartData);
          }
          this.router.navigate(['/cart']);
}
   

  ngOnInit() {
    this.stor()
  }
  
  stor(){
    this.global.Nextproduct.subscribe(res=>{
      this.store=res;
      console.log(this.store)
    });

}
}
