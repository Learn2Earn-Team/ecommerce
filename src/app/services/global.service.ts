import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  Category: any;

  constructor() { }

  private product = new BehaviorSubject<any>('');
  public Product = this.product.asObservable();

  set_product(Product : any){
    this.product.next(Product);
  }
  private nextproduct = new BehaviorSubject<any>('');
  public Nextproduct = this.nextproduct.asObservable();

  set_nextproduct(nextproduct : any){
    this.nextproduct.next(nextproduct);
  }


  private addcart = new BehaviorSubject<any>('');
  public Addcart = this.addcart.asObservable();

  set_addcart(addcart : any){
    this.addcart.next(addcart);
  }
}
