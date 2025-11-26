import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ProductInterface, ProductService } from '../../product.service';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';
import { AuthService, UserDto } from '../../auth.service';
import { Feedback, FeedbackService } from '../../feedback.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-details',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // Holds the current product details
  product: ProductInterface | null = null;

  // Logged-in user's ID
  userId: number | null = null;

  // List of feedback for the current product
  feedbacks: Feedback[] = [];

  // Holds the new feedback entered by the user
  newFeedback: string = '';

  // Map to store usernames based on userId (e.g., { 1: 'John', 2: 'Alice' })
  usernames: { [userId: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private feedbackService: FeedbackService,
  ) {}

  // Runs when the component loads
  ngOnInit(): void {
    const productIdStr = this.route.snapshot.paramMap.get('id'); // Get product ID from the URL
    this.userId = Number(sessionStorage.getItem('userId')); // Get logged-in user ID from session storage

    if (productIdStr) {
      const productId = Number(productIdStr);

      // Get all products and find the one matching the current productId
      this.productService.getProducts().subscribe(products => {
        this.product = products.find(p => p.id === productId) || null;
        this.loadFeedbacks(); // Load feedbacks for this product
      });
    }
  }

  // Generate the product image URL
  getProductImageUrl(productId: number): string {
    // return `http://localhost:8080/api/products/${productId}/image`;
    return `${environment.apiBaseUrl}/api/products/${productId}/image`;
  }

  // Add the product to the user's cart
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

  // Load all feedbacks for the current product
  loadFeedbacks(): void {

    if (this.product?.id) {

      this.feedbackService.getFeedbackByProduct(this.product.id).subscribe({
        next: (data) => {
          this.feedbacks = data;

          // Fetch usernames for each feedback userId (if not already fetched)
          this.feedbacks.forEach(fb => {
            if (!this.usernames[fb.userId]) {
              this.getName(fb.userId);
            }
          });
        },
        error: (err) => console.error('Error loading feedbacks', err)
      });
    }
  }

  // Get username by userId and store it in the `usernames` map
  getName(userId: number): void {
    this.authService.getUserById(userId).subscribe({
      next: (data) => {
        // Spread syntax used to trigger Angular change detection
        this.usernames = {
          ...this.usernames,
          [userId]: data.username
        };
      },
      error: (err) => console.error('Error fetching username for userId', userId)
    });
  }

  // Submit a new feedback message
  submitFeedback(): void {
    if (!this.newFeedback.trim()) return; // Don’t allow empty feedback

    if (!this.userId) {
      alert('Please log in to submit feedback.');
      return;
    }

    if (!this.product) {
      alert('Product not loaded.');
      return;
    }

    // Send the feedback to the server
    this.feedbackService.addFeedback(this.userId, this.newFeedback, this.product.id).subscribe({
      next: (fb) => {
        if (!fb.date) {
          fb.date = new Date().toISOString();
        }
        this.feedbacks.push(fb);       // Add the new feedback to the local list
        this.newFeedback = '';         // Clear the input field
      },
      error: (err) => {
        console.error('Failed to submit feedback', err);
        alert('Failed to submit feedback.');
      }
    });
  }
}
