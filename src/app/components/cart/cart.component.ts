import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(public productService : ProductService) {
    
  }

  getProductPrice(product : any){
    return parseFloat((product.price * product.quantity).toFixed(2));
  }
}
