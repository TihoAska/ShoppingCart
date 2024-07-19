import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  topProducts = [
    {
      "id": 1,
      "name": "K Plus Svježa jaja A klasa",
      "image": "../../../assets/svjeza_jaja.jpeg",
      "price": {
        "amount": 7.99,
        "currency": "Kn",
        "measureUnit": "Kom"
      }
    },
    {
      "id": 2,
      "image": "../../../assets/svjeze_mlijeko.jpeg",
      "name": "Dukat Trajno mlijeko 2,8% m.m. 1 l",
      "price": {
        "amount": 4.99,
        "currency": "Kn",
        "measureUnit": "Kom"
      }
    },
    {
      "id": 3,
      "image": "../../../assets/ribanac.png",
      "name": "Sirela Ribanac 4x40 g 3+1 gratis",
      "price": {
        "amount": 44.99,
        "currency": "Kn",
        "measureUnit": "Kg"
      }
    },
  ];

  bottomProducts = [
    {
      "id": 4,
      "name": "Svježi posni sir K Plus 500 g",
      "image": "../../../assets/svjezi_sir.jpeg",
      "price": {
        "amount": 9.99,
        "currency": "Kn",
        "measureUnit": "Kom"
      }
    },
    {
      "id": 5,
      "image": "../../../assets/kinder_pingui.jpeg",
      "name": "Kinder Pingui chocolate mliječni desert 4x30 g",
      "price": {
        "amount": 14.99,
        "currency": "Kn",
        "measureUnit": "Kom"
      }
    },
    {
      "id": 6,
      "image": "../../../assets/dukatino.jpeg",
      "name": "Dukatino svježi sir s voćem (6x50 g) 300 g",
      "price": {
        "amount": 13.99,
        "currency": "Kn",
        "measureUnit": "Kom"
      }
    }
  ]

  constructor(public productService : ProductService) {
    
  }

  ngOnInit(){
    if (typeof localStorage !== 'undefined'){
      let cart = localStorage.getItem('cart')
      if(cart){
        this.productService.$cart.next(JSON.parse(cart));
        this.productService.$cart.subscribe(res => {
          this.productService.addedProducts = [];
          res.forEach((element : any) => {
            this.productService.addedProducts.push(element);
          });
        });

        this.productService.getCartTotal();
      }
    }
  }

  getWholePrice(product : any){
    return Math.floor(product.price.amount);
  }

  getDecimalPrice(product : any){
    return Math.round((product.price.amount % 1) * 100);
  }

  addProductToCart(product : any){
    let existingProduct = this.productService.addedProducts.find(p => p.name == product.name);

    if(existingProduct){
      existingProduct.quantity++;
    } 
    else {
      this.productService.addedProducts.push({
        name: product.name,
        price: product.price.amount,
        image: product.image,
        quantity: 1,
      });
    }

    this.productService.$cart.next(this.productService.addedProducts);
    this.productService.getCartTotal();

    this.productService.$cart.subscribe(res => {
      localStorage.setItem('cart', JSON.stringify(res));
    });
  }
}
