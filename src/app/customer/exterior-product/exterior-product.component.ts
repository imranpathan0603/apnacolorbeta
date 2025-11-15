import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CartService } from '../../cart.service';
import { ProductInterface, ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exterior-product',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './exterior-product.component.html',
  styleUrl: './exterior-product.component.css'
})
export class ExteriorProductComponent {




  products: ProductInterface[] = [];
    filteredProducts: ProductInterface[] = [];
  
    selectedType: string = 'Exterior';
    selectedBrand: string = '';
    brands: string[] = [];
  
    errorMessage: string = '';
  
    constructor(
      private productService: ProductService,
      private cartService: CartService,
      private authService: AuthService
    ) {}
  


    currentSlide = 0;

    slides = [
      {
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        title: 'Elegant Contemporary Facade',
        description: 'Clean lines and modern appeal for standout curb presence.'
      },
      {
        img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
        title: 'Timeless Architecture',
        description: 'A perfect blend of sophistication and resilience.'
      },
      {
        img: 'Exterior 1.png',
        title: 'Modern Outdoor Aesthetics',
        description: 'Craft the perfect curb appeal with thoughtful design.'
      }
    ];
    
  
   
      
  
    next() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }
  
    prev() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    }
  
    goToSlide(index: number) {
      this.currentSlide = index;
    }
    ngOnInit(): void {


      setInterval(() => this.next(), 5000); // Auto-slide every 5 sec
 


      this.productService.getProducts().subscribe({
        next: (data) => {
          // Only keep 'Interrior' type products
          this.products = data.filter((p) => p.type === 'Exterior');
    
          // Extract brands only from Interrior products
          this.brands = [...new Set(this.products.map((p) => p.brand))];
    
          this.sorting();         // Sort by brand
          this.applyFilters();    // Apply brand filter if selected
        },
        error: (err) => {
          this.errorMessage = `Failed to load products: ${err}`;
        },
      });
    }
    
    sorting(): void {
      this.products.sort((a, b) => a.brand.localeCompare(b.brand));
    }
    
  
    applyFilters(): void {
      this.filteredProducts = this.products.filter((product) => {
        return this.selectedBrand ? product.brand === this.selectedBrand : true;
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
