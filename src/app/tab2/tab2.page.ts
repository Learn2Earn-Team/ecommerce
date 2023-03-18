import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../services/apicall.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Ng2SearchPipe } from 'ng2-search-filter';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  FilterTerm!: string ;
  public data: any =[{name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]

  products : any[] = []
  backup : any[] = []
  items : any[] = []
  public interval : any ;
  constructor(public router: Router,
    public api : ApicallService,
    public global : GlobalService,
    public filter : Ng2SearchPipe
    ) {}

 async ngOnInit() {
     await this.getproducts()
   this.interval = setInterval(()=>{
    console.log("data is not loaded")
   this.generateItems()
  },500);
}

 async getproducts(){
  await this.api.api_getallproducts()
  this.global.Product.subscribe(res=>{
      this.products = res
      this.backup = res
      console.log(res)
  })
}

filterr(){
     if(this.FilterTerm == ''){
          this.products = this.backup
          this.items = []
          this.generateItems()
     }else{
      this.products  = this.filter.transform(this.products , this.FilterTerm)
     this.items = []
     this.generateItems()
     }
}

detail(d: any){
  // this.global.set_nextproduct(d);
  console.log(d);
  this.router.navigate(['product'] , {state : {data : d}});
 }


generateItems() {
  if(this.products.length >=1){
    const count = this.items.length;
  if( this.products.length >= count + 50){
    for (let i = 0; i < 50; i++) {
      this.items.push(this.products[count + i]);
    }
  }else{
    this.items = this.products
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



}
