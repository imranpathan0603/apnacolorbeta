import { Component, OnInit } from '@angular/core';
import { ProductInterface, ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-product-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-product-list.component.html',
  styleUrl: './admin-product-list.component.css'
})
export class AdminProductListComponent implements OnInit {

  products:ProductInterface[]=[];
  errorMessage:string='';

 
  constructor( private productService:ProductService,
    private cartService:CartService,
    private authService:AuthService
  ){
  }
  ngOnInit(): void {
   this.productService.getProducts().subscribe({
    next:(data)=>{
      this.products=data;
    },
    error:(err)=>{
      this.errorMessage=`failed to load products ${err}`;
    }
   })
  }
  flag:boolean=false;

addToCart(productId: number) {
  // const userIdStr = this.authService.getUserId();
  const userIdStr = this.authService.getUserId();  

  // const userIdStr = this.authService.getUserId();  
  console.log('User ID:', userIdStr); // ✅ check what value you're getting

  if (!userIdStr) {

    alert('Please login first');
    return;
  }
  const userId =  Number(userIdStr);
  if (isNaN(userId)) {
    alert('Invalid user ID');
    return;
  }
  this.cartService.addToCart(userId, productId).subscribe({
    next: () => alert('Product added to cart'),
    error: err => alert('Failed to add to cart: ' + err)
  });
}

getProductImageUrl(productId: number): string {
  return `http://localhost:8080/api/products/${productId}/image`;
}



}
