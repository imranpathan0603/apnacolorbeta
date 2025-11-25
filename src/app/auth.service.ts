import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
// import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';


interface UserInterface {
  id:number;
  username: string;
  contactNo: string;
  email: string;
  address: string;
  password: string;
  role: string;

}
interface LoginResponse {
  message: string;
  username: string;
  role: string;
  id: number; // 👈 this must match backend
}

export interface UserDto {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private baseUrl = 'http://localhost:8080/auth';
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, {
      username,
      password,
    });
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/auth/${id}`);
  }


  // signup(user: UserInterface) {
  //   return this.http.post(this.baseUrl.concat('/signup'), user);
  // }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, user, {
      responseType: 'text'
    });
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
  }

  getUserId(): string | null {
    const userId = sessionStorage.getItem('userId');
    // console.log('DEBUG: getUserId() returns:', userId); // 👈 Extra debug log
    return userId;
  }

  logout(): void {
    sessionStorage.clear();
  }



  // for user management
  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}/auth/all`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/auth/${id}`);
  }
}
