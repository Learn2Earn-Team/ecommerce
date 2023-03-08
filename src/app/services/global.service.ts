import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {


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
  private category = new BehaviorSubject<any>('');
  public Category = this.category.asObservable();

  set_Category(category: any): void {
    this.category.next(category);
  }

  private feature = new BehaviorSubject<any>('');
  public Feature = this.feature.asObservable();

  set_Feature(feature: any): void {
    this.feature.next(feature);
  }
  private latest = new BehaviorSubject<any>('');
  public Latest = this.latest.asObservable();

  set_Latest(latest: any): void {
    this.latest.next(latest);
  }
  private cart = new BehaviorSubject<any>('');
  public Cart = this.cart.asObservable();

  set_Cart(cart: any): void {
    this.cart.next(cart);
  }

  private user = new BehaviorSubject<any>('');
  public User = this.user.asObservable();

  set_User(user: any): void {
    this.user.next(user);
  }
}
