import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../product.service'; // Update the path
import { error } from 'console';

@Component({
  selector: 'app-admin-product-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent {
  productForm: FormGroup;
  selectedImageFile: File | undefined;
successMessage:string='';
errorMessage:string='';
  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: [''],
      brand: [''],
      type: [''],
      color: [''],
      price: [''],
      quantity: [''],
      description: ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();

    const product = {
      name: this.productForm.value.name,
      brand: this.productForm.value.brand,
      type: this.productForm.value.type,
      color: this.productForm.value.color,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      description: this.productForm.value.description
    };

    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    } else {
      console.warn('No image file selected!');
      return; // stop submission if image is required
    }

    this.productService.addProduct(formData).subscribe((response: any) => {
      console.log('Product added successfully', response);
      this.successMessage +="Product Added Succcessfully";
    },
    (err:any) => {
      this.errorMessage=`failed to load products ${err}`;
    }
);
  }
}
