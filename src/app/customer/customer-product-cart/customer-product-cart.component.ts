import { Component, OnInit } from '@angular/core';
import { CartItemInterface, CartService } from '../../cart.service';
import { BillingService } from '../../billing.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-product-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-product-cart.component.html',
  styleUrls: ['./customer-product-cart.component.css']
})
export class CustomerProductCartComponent implements OnInit {

  cartItems: CartItemInterface[] = [];
  selectedCartIds: number[] = [];
  selectedPaymentMethod: string = 'UPI'; // Default value
  userId: number = Number(sessionStorage.getItem('userId'));
  successMessage:string='';
  errorMessage:string='';


  constructor(
    private cartService: CartService,
    private billingService: BillingService,
    private router: Router
  ) {}

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

  incrementQuantity(item: CartItemInterface): void {
    item.quantity++;
    this.updateQuantity(item.id, item.quantity);
  }

  decrementQuantity(item: CartItemInterface): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item.id, item.quantity);
    }
  }

  removeItem(cartItemId: number): void {
    this.cartService.removeItem(cartItemId, this.userId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
    });
  }

  // 💡 Checkbox logic
  onCheckboxChange(event: Event, cartItemId: number): void {
    const target = event.target as HTMLInputElement;
    const checked = target?.checked ?? false;
    this.toggleSelection(cartItemId, checked);
  }
  
  toggleSelection(cartItemId: number, checked: boolean): void {
    if (checked) {
      this.selectedCartIds.push(cartItemId);
    } else {
      this.selectedCartIds = this.selectedCartIds.filter(id => id !== cartItemId);
    }
  }
  

  // 💵 Create Bill from selected cart items
  buySelectedItems(): void {
    if (this.selectedCartIds.length === 0) {
      alert('Please select at least one item to buy.');
      this.errorMessage+="Select Minimum one product for bill";
      return;
    }

    console.log('Selected cart item IDs:', this.selectedCartIds);

    this.billingService.createBill(this.selectedCartIds, this.selectedPaymentMethod).subscribe({
      next: bill => {
        console.log('Bill Created:', bill);
        this.successMessage+="Bill  Created SuccessFully please Save your bill"
        // this.router.navigate(['/bill', bill.id]);
        
        this.router.navigate(['/customerHome/bill', bill.id]); // ✅ Navigates to invoice
      },
      error: err => {
        console.error('Failed to create bill', err);
        this.errorMessage+="Bill not created , please Try one more";
        alert('Billing failed. Try again.');
      }
    });
  }

  // Totals
  getTotalWithoutGST(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  getGSTAmount(): number {
    return this.getTotalWithoutGST() * 0.18;
  }

  getTotalWithGST(): number {
    return this.getTotalWithoutGST() + this.getGSTAmount();
  }
}


















// import { Component } from '@angular/core';
// import { CartItemInterface, CartService } from '../../cart.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-customer-product-cart',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './customer-product-cart.component.html',
//   styleUrl: './customer-product-cart.component.css'
// })
// export class CustomerProductCartComponent {

//   cartItems: CartItemInterface[] = [];
//   userId: number = Number(sessionStorage.getItem('userId'));

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.loadCart();
//   }
  
//   getTotalWithoutGST(): number {
//     return this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
//   }
  
//   getGSTAmount(): number {
//     return this.getTotalWithoutGST() * 0.18; // 18% GST
//   }
  
//   getTotalWithGST(): number {
//     return this.getTotalWithoutGST() + this.getGSTAmount();
//   }
  

//   loadCart(): void {
//     this.cartService.getCartItems(this.userId).subscribe({
//       next: items => {
        
//         this.cartItems = items;
//         console.log('Cart loaded:', items);
//       },
//       error: err => console.error('Failed to load cart', err)
//     });
//   }

//   getProductImageUrl(productId: number): string {
//     return `http://localhost:8080/api/products/${productId}/image`;
//   }
  


//   updateQuantity(cartItemId: number, quantity: number): void {
//     this.cartService.updateQuantity(cartItemId, quantity).subscribe(() => this.loadCart());
//   }

//   incrementQuantity(item: CartItemInterface) {
//     item.quantity++;
//     this.updateQuantity(item.id, item.quantity);
//   }
  
//   decrementQuantity(item: CartItemInterface) {
//     if (item.quantity > 1) {
//       item.quantity--;
//       this.updateQuantity(item.id, item.quantity);
//     }
//   }
  

//   removeItem(cartItemId: number): void {
//     this.cartService.removeItem(cartItemId,this.userId).subscribe(() => {
//       // Remove the item locally without reloading all cart items
//       this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
//     });
//   }
  


//   getTotal(): number {
//     return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
//   }
// }
