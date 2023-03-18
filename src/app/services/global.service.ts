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

  private productbucat = new BehaviorSubject<any>('');
  public Productbucat = this.productbucat.asObservable();

  set_productbucat(productbucat : any){
    this.productbucat.next(productbucat);
  }

  private Payment = new BehaviorSubject<any>('');
  public payment = this.Payment.asObservable();

  set_Payment(Payment : any){
    this.Payment.next(Payment);
  }

  private Slides = new BehaviorSubject<any>('');
  public slides = this.Slides.asObservable();

  set_Slides(slides : any){
    this.Slides.next(slides);
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

  private userorder = new BehaviorSubject<any>('');
  public Userorder = this.userorder.asObservable();

  set_Userorder(userorder: any): void {
    this.userorder.next(userorder);
  }

  private Base64 = new BehaviorSubject<any>('');
  public base64 = this.Base64.asObservable();

  set_Base64(Base64: any): void {
    this.Base64.next(Base64);
  }


  private OrderCounts = new BehaviorSubject<any>('');
  public ordercounts = this.OrderCounts.asObservable();

  set_ordercounts(OrderCounts: any): void {
    this.OrderCounts.next(OrderCounts);
  }

  private ProductImages = new BehaviorSubject<any>('');
  public productImages = this.ProductImages.asObservable();

  set_ProductImages(productImages: any): void {
    this.ProductImages.next(productImages);
  }

  private orderdetail = new BehaviorSubject<any>('');
  public Orderdetail = this.orderdetail.asObservable();

  set_orderdetail(orderdetail: any): void {
    this.orderdetail.next(orderdetail);
  }

}
