import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  addedProducts : AddedProduct[] = [];
  $cart : BehaviorSubject<any> = new BehaviorSubject<any>([]);
  $totalPrice : BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor() { }

  getCartTotal(){
    this.$cart.subscribe(res => {
      let totalPrice = 0;
      res.forEach((element : any) => {
        totalPrice += element.price * element.quantity;
      });
      this.$totalPrice.next(parseFloat(totalPrice.toFixed(2)));
    })
  }

  removeFromCart(product : any){
    const index = this.addedProducts.findIndex(p => p.name == product.name);

    if (index != -1) {
      this.addedProducts.splice(index, 1);
      this.$cart.next(this.addedProducts);
    }

    this.$cart.subscribe(res => {
      localStorage.setItem('cart', JSON.stringify(res));
    })
  }
}

export interface AddedProduct {
  name: string,
  quantity: number,
  price: 0,
  image: string,
}
