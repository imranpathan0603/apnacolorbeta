import { Injectable } from '@angular/core';
import { ProductInterface } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../environments/environment';

export interface CartItemInterface {
  id: number; // cart item id
  product: ProductInterface;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // private baseUrl = 'http://localhost:8080/api/cart';
  private baseUrl = environment.apiBaseUrl+'/api/cart';
  
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable(); // <- component will subscribe to this


  constructor(private http: HttpClient) {}

  addToCart(userId: number, productId: number, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, null, { params: { userId, productId, quantity } }).pipe(
      tap(() => this.refreshCount(userId)))
  
  }
  // Get all cart items for a user
  getCartItems(userId: number): Observable<CartItemInterface[]> {
    const url = `${this.baseUrl}/items?userId=${userId}`;
    return this.http.get<CartItemInterface[]>(url);
  }
 

  // Update quantity of a cart item
  updateQuantity(cartItemId: number, quantity: number): Observable<any> {
    const url = `${this.baseUrl}/update?cartItemId=${cartItemId}&quantity=${quantity}`;
    return this.http.put(url, {});
  }

  // Remove an item from cart
  removeItem(cartItemId: number,userId:number): Observable<any> {
    const url = `${this.baseUrl}/remove?cartItemId=${cartItemId}`;
    return this.http.delete(url,  { responseType: 'text' }).pipe(
      tap(() => this.refreshCount(userId)));
    
  }

  refreshCount(userId: number) {
      this.getCartItems(userId).subscribe(items => {
        this.cartItems = items;
        this.cartCount.next(items.length);
      });
    }
    
}
