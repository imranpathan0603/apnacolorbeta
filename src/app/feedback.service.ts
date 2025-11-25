import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Feedback {
  id: number;
  userId: number;
  username: string;
  productId:number;
  message: string;
  date: string;
  productName:string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  // private baseUrl = 'http://localhost:8080/api/feedback';
  private baseUrl = environment.apiBaseUrl+'/api/feedback';

  constructor(private http: HttpClient) {}

  // Get all feedbacks with username
  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/all`,);
  }

  addFeedback(userId: number, message: string, productId: number): Observable<Feedback> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('message', message)
      .set('productId', productId.toString());

    return this.http.post<Feedback>(`${this.baseUrl}/add`, null, { params });
  }

  getFeedbackByProduct(productId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/product/${productId}`);
  }

  
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
