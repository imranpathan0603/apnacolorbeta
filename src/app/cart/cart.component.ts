import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItemInterface, CartService } from '../cart.service';
// import { CartService, CartItem } from '../../cart.service'; // ✅ import

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItemInterface[] = [];
  userId: number = Number(sessionStorage.getItem('userId'));

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }
  

  loadCart(): void {
    this.cartService.getCartItems(this.userId).subscribe({
      next: items => {
        
        this.cartItems = items;
        console.log('Cart loaded:', items);
      },
      error: err => console.error('Failed to load cart', err)
    });
  }

  getProductImageUrl(productId: number): string {
    return `http://localhost:8080/api/products/${productId}/image`;
  }
  


  updateQuantity(cartItemId: number, quantity: number): void {
    this.cartService.updateQuantity(cartItemId, quantity).subscribe(() => this.loadCart());
  }

  incrementQuantity(item: CartItemInterface) {
    item.quantity++;
    this.updateQuantity(item.id, item.quantity);
  }
  
  decrementQuantity(item: CartItemInterface) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item.id, item.quantity);
    }
  }
  

  removeItem(cartItemId: number): void {
    this.cartService.removeItem(cartItemId,this.userId).subscribe(() => {
      // Remove the item locally without reloading all cart items
      this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
    });
  }
  


  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
