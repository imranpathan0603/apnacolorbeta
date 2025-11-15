import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ProductService } from '../../product.service';
import { CartService } from '../../cart.service';
import { ALL } from 'dns';
import { Feedback, FeedbackService } from '../../feedback.service';

@Component({
  selector: 'app-admin-landing-page',
  imports: [CommonModule],
  templateUrl: './admin-landing-page.component.html',
  styleUrl: './admin-landing-page.component.css'
})
export class AdminLandingPageComponent {
  userCount = 0;
  productCount = 0;
  totalStock = 0;
  // totalItems=0;
  feedbacks:Feedback [] = [];
  usernames: { [userId: number]: string } = {};
  constructor(
    private userService: AuthService,
    private productService: ProductService,
    private cartService:CartService,
    private feedbackService:FeedbackService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadFeedbacks();
  }

  loadDashboardStats(): void {
    // 👥 User Count
    this.userService.getAllUsers().subscribe({
      next: (users) => this.userCount = users.length,
      error: (err) => console.error('Error loading users:', err),
    });

    // 🛒 Product Count
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.productCount = products.length;
        // this.totalStock = products.reduce((acc, p) => acc + (p.quantity || 0), 0); // 📦 Total Stock
      },
      error: (err) => console.error('Error loading products:', err),
    });


   

  // constructor(private feedbackService: FeedbackService, private authService: AuthService) {}


    
  }
  loadFeedbacks(): void {
    // Call service to get all feedback from backend
    this.feedbackService.getAll().subscribe({
      next: (data) => {
        // Store feedback list
        this.feedbacks = data.reverse();
        console.log('✅ Feedback Data from API:', data);
  
        // Extract unique userIds from feedbacks
        const uniqueUserIds = [...new Set(this.feedbacks.map(fb => fb.userId))];
  
        // For each unique userId, fetch the username only once
        uniqueUserIds.forEach(userId => {
          if (!this.usernames[userId]) {  // Avoid duplicate calls
            this.authService.getUserById(userId).subscribe({
              next: (user) => {
                // Save username in dictionary for fast lookup
                this.usernames[userId] = user.username;
              },
              error: () => {
                // Fallback if user fetch fails
                this.usernames[userId] = 'Unknown User';
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('❌ Failed to load feedbacks', err);
      }
    });
  }
  
  removeFeedback(id:number){
    this.feedbackService.deleteFeedback(id).subscribe(()=>{
    this.loadFeedbacks();
      
    })
  }
  

}