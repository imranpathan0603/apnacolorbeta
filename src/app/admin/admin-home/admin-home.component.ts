import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatCardActions, MatCardModule } from '@angular/material/card';
import { AdminLandingPageComponent } from '../admin-landing-page/admin-landing-page.component';
@Component({
  selector: 'app-admin-home',
  imports: [RouterOutlet,RouterModule,RouterLink,CommonModule,MatButtonModule,MatCardModule,MatCardActions,
    MatIconButton,MatIconModule,
    AdminLandingPageComponent
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent   {
  menuOpen: boolean = false;

  constructor(private router: Router,private authService:AuthService) {}

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
