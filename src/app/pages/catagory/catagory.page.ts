import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "./../../services/global.service";
import { ApicallService } from "./../../services/apicall.service";
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.page.html',
  styleUrls: ['./catagory.page.scss'],
})
export class CatagoryPage implements OnInit {

  FilterTerm! : string ;
  public data: any =[{name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]

  interval : any ;
  product : any[] = [] ;
  items : any[] = [] ;

  constructor(public global :GlobalService , public apicall : ApicallService, public router: Router) {}




  ngOnInit() {


    this.global.Productbucat.subscribe(res=>{
      this.product = res
      this.items = []
      console.log(res)
      if(res.length == 0){
         this.getproducts()
      }else{
        this.generateItems()
      }

    })


  }

  gotodetail(value: any){
    console.log(value);
    this.router.navigate(['product'] , {state : {data : value}});
  }


  cart(){
    this.router.navigate(['cart'])
   }

   prof(){
    this.global.User.subscribe(res=>{
      if(res === ''){
        console.log('ss')
        this.router.navigate(['login'])
      }else{
        this.router.navigate(['tabs/tab3'])
      }
    })
   }

   search(){
    this.router.navigate(['tabs/tab2'])
   }


   type = 'deposit';



   segmentChanged(ev: any) {
     console.log('Segment changed', ev);
   }


   async getproducts(){
    // await this.apicall.api_getallproducts()
    this.global.Product.subscribe(res=>{
        this.product = res
        console.log(res)
    })
     this.generateItems()
  }


   generateItems() {
    if(this.product.length >=1){
      const count = this.items.length;
    if( this.product.length >= count + 50){
      for (let i = 0; i < 50; i++) {
        this.items.push(this.product[count + i]);
      }
    }else{
      this.items = this.product
    }
    clearInterval(this.interval)
    }
  }
  onIonInfinite(ev:any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
