import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  private product = new BehaviorSubject<any>('');
  public Product = this.product.asObservable();

  set_product(operate : any){
    this.product.next(operate);
  }
}
