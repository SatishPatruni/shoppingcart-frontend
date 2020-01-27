import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductResponse, OrderResponse } from '../../models/reponse-models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<ProductResponse> {
    console.log('Calling endpoint: ' + environment.serverEndPoint + 'products');
    return this.httpClient.get<ProductResponse>(
      environment.serverEndPoint + 'products'
    );
  }

  addProductToOrder(orderId, productId): Observable<OrderResponse> {
    console.log('Calling endpoint: ' + environment.serverEndPoint + 'orders/' + orderId);
    return this.httpClient.put<OrderResponse>(
      environment.serverEndPoint + 'orders/' + orderId, { productId: productId }
    );
  }

  createOrder(productId): Observable<OrderResponse> {
    console.log('Calling endpoint: ' + environment.serverEndPoint + 'orders');
    return this.httpClient.post<OrderResponse>(
      environment.serverEndPoint + 'orders', { productId: productId }
    );
  }

  getOrderInfo(orderId): Observable<OrderResponse> {
    console.log('Calling endpoint: ' + environment.serverEndPoint + 'orders/' + orderId);
    return this.httpClient.get<OrderResponse>(
      environment.serverEndPoint + 'orders/' + orderId);
  }
}
