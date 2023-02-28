import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public data: any ={name:"Men Premium Shalwar Kameez Off White", brand: "Riwaj" ,price:"2200", img:"./../../assets/c9d98d2cae95ded97d6b10a303652169.jpg"}
 
    
  constructor(public router: Router) {}



  cart(){
    this.router.navigate(['cart'])
   }

  ngOnInit() {
  }

}
