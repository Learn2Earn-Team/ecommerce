import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

 
  constructor(public router: Router) {}



  cart(){
    this.router.navigate(['cart'])
   }


  public data: any =[{name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"},
  {name:"Men Premium Shalwar Kameez Off White", price:"2200", img:"./../../assets/MenPremiumShalwarKameezOff-White_3_400x.jpg.webp"},
  {name:"Men Premium Shalwar Kameez Off White", price:"5200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}]


  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


}
