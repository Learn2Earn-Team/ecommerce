import { ToastService } from './../../services/toast.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Share } from '@capacitor/share';
import { HttpClient } from '@angular/common/http';
import { switchMap, Observable } from 'rxjs';
import { ShareService } from 'src/app/services/share.service';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y , SwiperOptions , Virtual, EffectCards, Autoplay, EffectFlip, EffectCoverflow } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ApicallService } from 'src/app/services/apicall.service';


SwiperCore.use([Virtual]);
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y,EffectFlip,Autoplay,EffectCoverflow]);
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit,AfterViewInit , OnDestroy {
  total : number = 0 ;
  public item1: any = {c_id : null , discription: null , image: null , name: null ,  price_per_unit: null , quantity: null , sc_id: null, total_quantity: null, color: null , size: null};
  public cart: {}[] = [];
  public cart1: any = {};
  public data: any ={name:"Men Premium Shalwar Kameez Off White", brand: "Riwaj" ,price:"2200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}
 public store:any
  public suitData: any;
  public CartData: any;
 public productdetail: any;
 public productimages : any[] = []
  max_profit: number = 0 ;
  profit : number = 0 ;
  blob : any ;
  interval : any ;
  Config: SwiperOptions = {
    spaceBetween: 10,
    pagination: true,
    speed:500
  }
  @ViewChild('swiper') swiper!: SwiperComponent;

  constructor(public share:ShareService , public router: Router, public global: GlobalService , public toast : ToastService , public http : HttpClient , public api : ApicallService) {

  }
  ngAfterViewInit(): void
  {
     this.interval = setInterval(() => {
        this.swiper.swiperRef.slideNext(500);
      }, 3000);

  }

  disable(){
    console.log(this.interval)
    clearInterval(this.interval)
  }
 async ngOnInit() {
     this.productdetail =  history.state.data;
   this.max_profit = 2000



   this.api.api_getBase64(this.productdetail.sc_id)
   await this.api.api_getImages(this.productdetail.sc_id)

   this.global.productImages.subscribe(res=>{
    this.productimages = res
    console.log(res)
   })
  }

  ngOnDestroy(): void {
    this.disable()
  }

 async addcart(item: any){
    if(!this.productdetail.profit){
      item.profit = 0
    }
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



   async Share(){
    let base64 ;
    this.global.base64.subscribe(res=>{
      base64 =  res[0].image
      console.log(base64)
    })
    if(this.productdetail.profit){
      this.total = this.productdetail.profit + this.productdetail.price_per_unit
    }else{
      this.total = this.productdetail.price_per_unit
    }
    console.log(this.productdetail)
    this.share.file_share(this.productdetail.name , this.productdetail.discription ,this.total, base64)
   }



  }
