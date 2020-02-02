import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User, Order, CartProductInfo, RazorPayOptions, RazorPayPrefill } from '../../models/data-models';
import { ProductService } from '../../services/product/product.service';
import { PaymentService } from '../../services/payment/payment.service';
import { Router } from '@angular/router';
declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderId: number;
  user: User;
  orderInfo: Order;
  cartProductInfoList: CartProductInfo[];
  orderPrice = 0;
  paymentProviderOrderId: string;
  disablePlaceOrder: boolean;

  constructor(private cookieService: CookieService, private productService: ProductService, private paymentService: PaymentService, private router: Router) {
    this.orderId = +this.cookieService.get('orderId');
    this.user = JSON.parse(this.cookieService.get('user'));
  }

  paymentResponseHandler(response) {
    this.disablePlaceOrder = true;
    console.log(response);
    let orderInfo = { orderId: this.orderId, providerInfo: response }
    this.paymentService.closeTransaction(orderInfo).subscribe(() => {
      alert('Thank you for using Satish Market! \n Your order is on your way!');
      this.cookieService.delete('orderId');
      window.location.href = 'home';
    });
  }

  placeOrder() {
    let orderInfo = {
      orderId: this.orderId,
      amount: +this.orderPrice.toFixed(2)
    };
    this.paymentService.placeOrder(orderInfo).subscribe(paymentProviderResponse => {
      //this.paymentProviderOrderId = 'order_E9HHdjuQNb8a58';
      this.paymentProviderOrderId = paymentProviderResponse.order.payment_provider_id;
      let paymentOptions = new RazorPayOptions();
      paymentOptions.key = "rzp_test_ThMPARsTfVfL7N"
      paymentOptions.order_id = this.paymentProviderOrderId;
      paymentOptions.handler = this.paymentResponseHandler.bind(this),
        paymentOptions.prefill = new RazorPayPrefill();
      paymentOptions.prefill.name = this.user.display_name;
      paymentOptions.prefill.email = this.user.user_name;
      paymentOptions.prefill.contact = '+919356980909';

      var rzp1 = new Razorpay(paymentOptions);

      rzp1.open();
    });
  }

  ngOnInit() {
    this.productService.getOrderInfo(this.orderId).subscribe(orderResponse => {
      this.cartProductInfoList = [];
      this.orderInfo = orderResponse.order;
      console.log('Processing order with ' + orderResponse.order.order_products.length + ' products')
      this.orderInfo.order_products.forEach(orderProduct => {
        let cartProductInfo = new CartProductInfo();
        cartProductInfo.count = orderProduct.count;
        cartProductInfo.name = orderProduct.product.name;
        cartProductInfo.price = +(orderProduct.product.price * orderProduct.count).toFixed(2);
        this.orderPrice += cartProductInfo.price;
        this.orderPrice = +this.orderPrice.toFixed(2);
        this.cartProductInfoList.push(cartProductInfo);
      });
      console.log('Total Order Price: ' + this.orderPrice);
    });
  }
}
