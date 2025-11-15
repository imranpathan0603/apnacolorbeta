import { Routes } from '@angular/router';

import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminProductAddComponent } from './admin/admin-product-add/admin-product-add.component';
import { AdminProductListComponent } from './admin/admin-product-list/admin-product-list.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { AdminLandingPageComponent } from './admin/admin-landing-page/admin-landing-page.component';
import { AdminUserManagementComponent } from './admin/admin-user-management/admin-user-management.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { CustomerProductListComponent } from './customer/customer-product-list/customer-product-list.component';
import { CustomerProductCartComponent } from './customer/customer-product-cart/customer-product-cart.component';
import { CustomerLandingPageComponent } from './customer/customer-landing-page/customer-landing-page.component';
import { InteriorProductComponent } from './customer/interior-product/interior-product.component';
import { AboutUsComponent } from './customer/about-us/about-us.component';
import { ContactComponent } from './customer/contact/contact.component';
import { ExteriorProductComponent } from './customer/exterior-product/exterior-product.component';
import { ColorVisualizerComponent } from './customer/color-visualizer/color-visualizer.component';
import { ProductDetailsComponent } from './customer/product-details/product-details.component';
import { InvoiceComponent } from './customer/invoice/invoice.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AppComponent }, // use your LoginComponent if needed

  {
    path: 'adminHome',
    component: AdminHomeComponent,
    canActivate: [AuthGuard], // 👈 protect this route
    children: [
      // { path: '', redirectTo: 'adminLanding', pathMatch: 'full' },
      { path: '', component: AdminLandingPageComponent },
      { path: 'productList', component: AdminProductListComponent },
      { path: 'adminAdd', component: AdminProductAddComponent },
      { path: 'adminUpdate', component: UpdateProductComponent },
      { path: 'cart', component: CartComponent },
      // User management
      { path: 'userManagement', component: AdminUserManagementComponent },
    ],
  },

  {
    path:'customerHome',
    component:CustomerHomeComponent,
    canActivate:[AuthGuard],
    children:[
      { path: '', component: CustomerLandingPageComponent },
      {path:'customerProductList' ,component: CustomerProductListComponent },
      {path:'interiorProduct' ,component: InteriorProductComponent},
      {path:'exteriorProduct' ,component: ExteriorProductComponent},
      {path:'visualizer' ,component: ColorVisualizerComponent},
      
      {path:'productDetail/:id', component: ProductDetailsComponent , data: { renderMode: 'client' }},
      { path: 'customerCart', component: CustomerProductCartComponent },
      { path: 'aboutUs', component: AboutUsComponent },
      
      { path: 'contactUs', component: ContactComponent },
      { path: 'bill/:billId', component: InvoiceComponent , data: { renderMode: 'client' }}

      // { path: 'invoice/:billId', component: InvoiceComponent },

    ]
  },
 
];
