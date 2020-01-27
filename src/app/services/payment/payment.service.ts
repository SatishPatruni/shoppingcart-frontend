import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentOrderResponse } from '../../models/reponse-models';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  public placeOrder(orderInfo): Observable<PaymentOrderResponse> {
    console.log('Calling endpoint: ' + environment.serverEndPoint + 'orders/' + orderInfo.orderId + '/payment/razorpay');
    return this.httpClient.post<PaymentOrderResponse>(
      environment.serverEndPoint + 'orders/' + orderInfo.orderId + '/payment/razorpay', orderInfo
    );
  }

  public closeTransaction(orderInfo): Observable<PaymentOrderResponse> {
    console.log('Calling endpoint: ' + environment.serverEndPoint + 'orders/' + orderInfo.orderId + '/payment/razorpay/verify');
    return this.httpClient.post<PaymentOrderResponse>(
      environment.serverEndPoint + 'orders/' + orderInfo.orderId + '/payment/razorpay/verify', orderInfo
    );
  }
}
