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

  public data: any =[{name:"Men Collection", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Women Collection", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Winter Collection", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Under Garments", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]



  constructor(public global :GlobalService , public apiCall : ApicallService, public router: Router) {}

  public category:any =[{c_id:"", name:"", img:""}]


  ngOnInit() {
    this.get_category();

  }

  get_category(){
    this.apiCall.api_getcategory();
    this.global.Category.subscribe( res =>{
      this.category = res;
    });
  }


  cart(){
    this.router.navigate(['cart'])
   }

   type = 'Men';


 
   segmentChanged(ev: any) {
     console.log('Segment changed', ev);
   }


}
