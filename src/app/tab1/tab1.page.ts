import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "./../services/global.service";
import { ApicallService } from "./../services/apicall.service";
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public global :GlobalService , public apiCall : ApicallService, public router: Router) {}
  
  public product:any =[{p_id:"", name:"", price:"", brand: "", description:"", img:""}]

  cart(){
    this.router.navigate(['cart'])
   }

   ngOnInit() {
    this.get_product();

  }

  get_product(){
    this.apiCall.api_getproduct();
    this.global.Product.subscribe( res =>{
      this.product = res;
    });
  }
  

  public data: any =[{name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]


  slideOptsOne = {
    initialSlide: 0,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2.14,
      },
      // when window width is >= 480px
      440: {
        slidesPerView: 2.5,
      },

      520: {
        slidesPerView: 3,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3.5,
      },

      720: {
        slidesPerView: 4,
      },

      850: {
        slidesPerView: 4.5,
      },

      920: {
        slidesPerView: 5,
      },
      
      1060: {
        slidesPerView: 5.5,
      },

      1120: {
        slidesPerView: 6,
      },

      1380: {
        slidesPerView: 7,
      },

      1550: {
        slidesPerView: 8,
      }
    }
   };

   detail(d: any){
    this.global.set_nextproduct(d);
    console.log(d);
    this.router.navigate(['product'])
   }


   catag(){
    this.router.navigate(['catagory'])
   }


public categ: any =[{name: "Men"},{name: "Women"},{name: "Clothing"},{name: "Summer"},{name: "Winter"}]

slideOptsOnee = {
  initialSlide: 0,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 4,
    },
    // when window width is >= 480px
    440: {
      slidesPerView: 4,
    },

    520: {
      slidesPerView: 5,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 6,
    },

    720: {
      slidesPerView: 7,
    },

    850: {
      slidesPerView: 8,
    },

    

  
  }
 };


}

