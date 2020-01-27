import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product, User } from '../../models/data-models';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  paymentResponse: any;
  products: Product[];
  productCount: number;
  orderId: number;
  user: User;

  constructor(private productService: ProductService, private cookieService: CookieService, private router: Router) {
    this.orderId = +this.cookieService.get('orderId');
    this.user = JSON.parse(this.cookieService.get('user'));
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe(productRespone => {
      this.products = productRespone.products;
      this.productCount = productRespone.total;
    })
  }

  addProductToCart(productId) {
    if (this.orderId) {
      this.productService.addProductToOrder(this.orderId, productId).subscribe(orderResponse => {
        console.log('addProductToOrder orderResponse: ' + JSON.stringify(orderResponse));
      });
    }
    else {
      this.productService.createOrder(productId).subscribe(orderResponse => {
        console.log('createOrder orderResponse: ' + JSON.stringify(orderResponse));
        this.orderId = orderResponse.order.order_id;
        this.cookieService.set('orderId', JSON.stringify(orderResponse.order.order_id));
      });
    }
  }

  moveToCart() {
    this.router.navigateByUrl('cart');
  }
}
