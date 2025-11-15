import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductInterface {
  id: number;
  name: string;
  brand: string;
  type: string;
  color: string;
  price: number;
  // selectedSize:number;
  quantity: number;
  description: string;
  imageUrl: string; // or byte array handling if needed
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api';  // Change to your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.baseUrl}/products/all`);
  }

  addProduct(formData: FormData) {
  return this.http.post('http://localhost:8080/api/products/add', formData);
}
updateProduct(id: number, product: ProductInterface): Observable<ProductInterface> {
  return this.http.put<ProductInterface>(`${this.baseUrl}/products/${id}`, product);
}

deleteProduct(id: number): Observable<string> {
  return this.http.delete(`${this.baseUrl}/products/${id}`, { responseType: 'text' });
}


searchProducts(query: string): Observable<ProductInterface[]> {
  return this.http.get<ProductInterface[]>(`http://localhost:8080/api/products/search?q=${query}`);
}



 
}
