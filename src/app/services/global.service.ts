import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  private product = new BehaviorSubject<any>('');
  public Product = this.product.asObservable();

  set_product(product : any){
    this.product.next(product);
  }

//category

private category = new BehaviorSubject<any>('');
public Category = this.category.asObservable();

set_category(category : any){
  this.category.next(category);
}

}
