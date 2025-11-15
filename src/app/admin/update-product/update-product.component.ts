import { Component } from '@angular/core';
import { ProductInterface, ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

  products: ProductInterface[] = [];
  errorMessage: string = '';
  flag: boolean = false;

  selectedProduct: ProductInterface = {
    id: 0,
    name: '',
    brand: '',
    type: '',
    color: '',
    price: 0,
    quantity: 1,
    description: '',
    imageUrl: ''
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
           this.products = data;
        
      },
      error: (err) => {
        this.errorMessage = `Failed to load products: ${err}`;
      }
    });
  }

  editProduct(product: ProductInterface) {
    this.selectedProduct = { ...product }; // clone to avoid direct binding
    this.flag = true;
  }

  updateProduct() {
    this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct)
      .subscribe({
        next: (data) => {
          console.log("Product updated:", data);
          this.flag = false;
          this.loadProducts(); // refresh list
        },
        error: (err) => {
          console.error("Update failed:", err);
        }
      });
  }

  deleteProduct(productId: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          alert("Product deleted successfully");
          this.flag = false;
          this.loadProducts(); // refresh list
        },
        error: (err) => {
          console.error("Delete failed:", err);
          alert("Failed to delete product");
        }
      });
    }
  }
}
