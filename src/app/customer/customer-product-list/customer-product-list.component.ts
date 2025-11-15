import { Component, OnInit } from '@angular/core';
import { ProductInterface, ProductService } from '../../product.service';
import { CartService } from '../../cart.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,RouterModule],
  templateUrl: './customer-product-list.component.html',
  styleUrls: ['./customer-product-list.component.css'], // ✅ fixed: plural
})
export class CustomerProductListComponent implements OnInit {
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];
  
  // sizes = [1, 4, 10, 20];


  selectedType: string = '';
  selectedBrand: string = '';
  brands: string[] = [];

  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];

        // Extract unique brands
        this.brands = [...new Set(this.products.map((p) => p.brand))];
      },
      error: (err) => {
        this.errorMessage = `Failed to load products: ${err}`;
      },
    });

    this.sorting(); // Optional sorting logic
  }

  sorting(): void {
    // Optional sorting logic, e.g., by name
    this.products.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredProducts = [...this.products];
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      return (
        (this.selectedType ? product.type === this.selectedType : true) &&
        (this.selectedBrand ? product.brand === this.selectedBrand : true)
      );
    });
  }

  addToCart(productId: number): void {
    const userIdStr = this.authService.getUserId();

    if (!userIdStr) {
      alert('Please login first');
      return;
    }

    const userId = Number(userIdStr);
    if (isNaN(userId)) {
      alert('Invalid user ID');
      return;
    }

   

    this.cartService.addToCart(userId, productId).subscribe({
      next: () => alert('Product added to cart'),
      error: (err) => alert('Failed to add to cart: ' + err),
    });
  }

  getProductImageUrl(productId: number): string {
    return `http://localhost:8080/api/products/${productId}/image`;
  }
}
