import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderData {
  name: string;
  last_name: string;
  phone: string;
  country: string;
  zip: string;
  product: string;
  address: string;
  comment?: string;
}

interface OrderResponse {
  success: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://testologia.ru/order-tea';

  constructor(private http: HttpClient) { }

  createOrder(orderData: OrderData): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.apiUrl, orderData);
  }
}
