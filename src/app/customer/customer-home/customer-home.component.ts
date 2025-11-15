import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ProductService } from '../../product.service';
import { CartService } from '../../cart.service';
import { FormsModule } from '@angular/forms';
import { CustomerProductListComponent } from '../customer-product-list/customer-product-list.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-customer-home',
  imports: [RouterOutlet,RouterModule,FormsModule,CustomerProductListComponent,CommonModule,FooterComponent],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.css'
}) 
export class CustomerHomeComponent {
  menuOpen: boolean = false;

  constructor(private router: Router,private authService:AuthService,
    private productService: ProductService,
  private cartService: CartService,
  
  ) {}
  cartCount:number=0
  userId: number = Number(sessionStorage.getItem('userId'));

 ngOnInit() {
 this.cartService.cartCount$.subscribe(count => {
 this.cartCount = count;
 });

 // Also make sure to load current count on first load
 this.cartService.refreshCount(this.userId);
}


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  get isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }
  
  get isCustomer(): boolean {
    return this.authService.getRole() === 'CUSTOMER';
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}
