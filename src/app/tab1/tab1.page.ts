import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "./../services/global.service";
import { ApicallService } from "./../services/apicall.service";
import { OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y , SwiperOptions , Virtual } from 'swiper';


SwiperCore.use([Virtual]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items : any[] = []
  public interval : any ;
  public categroy: any ;
  public feature: any ;
  public latest: any ;
 public carti: any;
 public slides : any[] = []
  // tslint:disable-next-line:max-line-length
  public item1: any = {c_id : null , discription: null , image: null , name: null ,  price_per_unit: null , quantity: null , sc_id: null, total_quantity: null, color: null , size: null};
  public user: any;
  constructor(public global :GlobalService , public apicall : ApicallService, public router: Router) {}

  public product:any =[{p_id:"", name:"", price:"", brand: "", description:"", img:""}]
  public AllProducts : any[] = []
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
   Config: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 1.05,
    pagination: true
  }

   search(){
    this.router.navigate(['tabs/tab2'])
   }

   ngOnInit() {
    this.global.slides.subscribe(res=>{
      this.slides = res
      console.log(res)
    })
    this.apicall.api_getcategory();
    this.apicall.api_featureproducts();
    this.apicall.api_latestproducts();


    this.global.Category.subscribe(res => {
      this.categroy = res;
      console.log(this.categroy);
    });
    this.global.Feature.subscribe(res => {
      this.feature = res;
      console.log(this.feature);
    });
    this.global.Latest.subscribe(res => {
      this.latest = res;
      console.log(this.latest);
    });
    this.global.User.subscribe(res => {
      this.user = res;
      console.log(this.categroy);
    });


     this.getproducts()
    this.interval = setInterval(()=>{
     console.log("data is not loaded")
    this.generateItems()
   },500);

  }

  async getproducts(){
    await this.apicall.api_getallproducts()
    this.global.Product.subscribe(res=>{
        this.AllProducts = res
        console.log(res)
    })}

  goto(value : any) {
    this.router.navigate(['catagory']);
    console.log(value);
    this.apicall.api_productbycategory(value.c_id);
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


      1060: {
        slidesPerView: 4,
      },

      1350: {
        slidesPerView: 5.8,
      },


    }
   };


   detail(d: any){
    // this.global.set_nextproduct(d);
    console.log(d);
    this.router.navigate(['product'] , {state : {data : d}});
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


 generateItems() {
  if(this.AllProducts.length >=1){
    const count = this.items.length;
  if( this.AllProducts.length >= count + 50){
    for (let i = 0; i < 50; i++) {
      this.items.push(this.AllProducts[count + i]);
    }
  }else{
    this.items = this.AllProducts
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

