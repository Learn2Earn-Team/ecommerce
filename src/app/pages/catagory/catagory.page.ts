import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "./../../services/global.service";
import { ApicallService } from "./../../services/apicall.service";

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.page.html',
  styleUrls: ['./catagory.page.scss'],
})
export class CatagoryPage implements OnInit {
  public data: any =[{name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]



  constructor(public global :GlobalService , public apicall : ApicallService, public router: Router) {}

  public product: any;


  ngOnInit() {
    this.global.Product.subscribe(res => {
      this.product = res;
      console.log(this.product);
    });
    if (this.product === null){
      this.apicall.api_getallproducts();
      this.global.Product.subscribe(res => {
        this.product = res;
        console.log(this.product);
      });
    }

  }

  gotodetail(value: any){
    console.log(value);
    this.router.navigate(['product'] , {state : {data : value}});
  }


  cart(){
    this.router.navigate(['cart'])
   }

   type = 'deposit';


 
   segmentChanged(ev: any) {
     console.log('Segment changed', ev);
   }


}
