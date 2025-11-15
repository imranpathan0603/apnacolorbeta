
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router) {}

//   canActivate(): boolean {
//     const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

//     if (isLoggedIn) {
//       return true;
//     }

//     this.router.navigate(['/login']); // Redirect if not logged in
//     return false;
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const role = sessionStorage.getItem('role'); // Assume this is set as 'ADMIN' or 'CUSTOMER'

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    const url = state.url;

    if (url.includes('/adminHome') && role !== 'ADMIN') {
      alert('Access denied. Admins only.');
      this.router.navigate(['/login']);
      return false;
    }

    if (url.includes('/customerHome') && role !== 'CUSTOMER') {
      alert('Access denied. Customers only.');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
