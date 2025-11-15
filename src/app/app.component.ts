import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

// import { HomeComponent } from './home/home.component';
import { AdminProductListComponent } from './admin/admin-product-list/admin-product-list.component';
import { AdminProductAddComponent } from './admin/admin-product-add/admin-product-add.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { User } from './User';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { AdminLandingPageComponent } from './admin/admin-landing-page/admin-landing-page.component';
import { AdminUserManagementComponent } from './admin/admin-user-management/admin-user-management.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { CustomerProductListComponent } from './customer/customer-product-list/customer-product-list.component';
import { CustomerProductCartComponent } from './customer/customer-product-cart/customer-product-cart.component';
import { FooterComponent } from './customer/footer/footer.component';
import { AboutUsComponent } from './customer/about-us/about-us.component';
import { ContactComponent } from './customer/contact/contact.component';
import { ProductDetailsComponent } from './customer/product-details/product-details.component';
import { InvoiceComponent } from './customer/invoice/invoice.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    
    // HomeComponent,
    FormsModule,
    CommonModule,

    // Adminpage
    AdminProductListComponent,
    AdminProductAddComponent,
    UpdateProductComponent,
    AdminHomeComponent,
    CartComponent,
    AdminLandingPageComponent,
    AdminUserManagementComponent,

    // customer
    CustomerHomeComponent,
    CustomerProductListComponent,
    CustomerProductCartComponent,
    FooterComponent,
    AboutUsComponent,
    ContactComponent,
    ProductDetailsComponent,
    InvoiceComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'project';

  username = '';
  password = '';
  message = '';

  flag: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}
  isAdminLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;

  // login() {
  //   this.authService.login(this.username, this.password).subscribe({
  //     next: (res: any) => {
  //       // this.message = res; // res should be "Welcome, user/"
  //       this.message = `${res.message}, ${res.username} with role ${res.role}`;
  //       sessionStorage.setItem('isLoggedIn', 'true');
  //   sessionStorage.setItem('username', res.username);
  //   sessionStorage.setItem('role', res.role);
  //       // console.log('Username:', res.username);
  //       // console.log('Role:', res.role);
  //       this.successMessage=`User added Successfully  ${res.username}`

  //       if (res.role == "ADMIN") {
  //         this.flag=false;
  //         this.isAdminLoggedIn = true;
  //         this.status = false;
  //         this.router.navigate(['/admin']);
  //         this.router.navigateByUrl('/adminHome');
  //       }
  //       else if (res.role == "CUSTOMER") {
  //         this.flag=false;
  //         this.isCustomerLoggedIn = true;
  //       }
  //     },
  //     error: (err) => {
  //       this.message = err.error; // Show backend message like "Invalid username or password."
  //  this.errorMessage="please try again"
  //     }
  //   });
  // }
  ngOnInit() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const role = sessionStorage.getItem('role');
  
    if (isLoggedIn && role) {
      this.isAdminLoggedIn = role.toUpperCase() === 'ADMIN';
      this.isCustomerLoggedIn = role.toUpperCase() === 'CUSTOMER';
      this.flag = false;
      this.status = false;
    }
  }
  

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.message = `${res.message}, ${res.username} with role ${res.role}`;
        // sessionStorage.setItem('isLoggedIn', 'true');
        // sessionStorage.setItem('username', res.username);
        // sessionStorage.setItem('role', res.role);
// alert("response"+res.id)
        this.successMessage = `User logged in successfully: ${res.username}`;
        this.errorMessage = '';
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('role', res.role); // e.g., 'ADMIN' or 'CUSTOMER'
        sessionStorage.setItem('username', res.username);
        sessionStorage.setItem('userId', res.userId);

        const role = res.role?.toUpperCase();
       
       
        if (role === 'ADMIN')
           {
            // sessionStorage.setItem('userId', res.id.toString());
          // sessionStorage.setItem('userId', res.id.toString());
          this.flag = false;
          this.isAdminLoggedIn = true;
          this.status = false;
          this.router.navigate(['/adminHome']);
        }
        
        else if (role === 'CUSTOMER') {
          this.flag = false;
          this.isCustomerLoggedIn = true;
          this.status = false;
          this.router.navigate(['/customerHome']); // Update this route as needed
        }
      },
      error: (err) => {
        this.message = err.error;
        this.errorMessage = 'Invalid username or password. Please try again.';
        this.successMessage = '';
      },
    });
  }

  Singup() {
    this.router.navigateByUrl('/signup');
  }

  status: boolean = true;
  Show() {
    this.status = !this.status;
  }

  // ********************************************************************signup
  successMessage: string = '';
  errorMessage: string = '';
  sflag: boolean = false;

  user: User = {
    id:0,
    username: '',
    contactNo: '',
    email: '',
    address: '',
    password: '',
    role: '',
  };

  // constructor(private authservice: AuthService) {
  //   this.flag = false;
  // }

  signup(): void {
    const newUser = { ...this.user };

    this.authService.signup(newUser).subscribe({
      next: (response) => {
        this.sflag = true;
        this.successMessage = 'User added successfully!';
        this.errorMessage = ''; // Clear any old error
      },
      error: (err) => {
        this.successMessage = ''; // Clear any old success
        this.errorMessage = `Failed to add user: ${
          err.message || err.statusText || err
        }`;
      },
    });
  }
}
