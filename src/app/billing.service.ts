import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
// export interface BillDetails {
//   product: {
//     id: number;
//     name: string;
//     price: number;
//   };
//   quantity: number;
//   price: number;
//   subTotle: number; // spelling from backend
// }

// export interface Bill {
//   id: number;
//   invoiceNo: string;
//   date: string;
//   totalAmount: number;
//   paymentMethod: string;
//   status: string;
//   user: {
//     id: number;
//     username: string;
//     // Add more if needed
//   };
//   billDetails: BillDetails[];
// }


// bill-response.model.ts
export interface BillDetails {
  productName: string;
  price: number;
  quantity: number;
  subTotle: number; // match spelling from backend
}

export interface BillResponse {
  id: number; // 👈 add this
  invoiceNo: string;
  username: string;
  date: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  items: BillDetails[];
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  // private apiUrl = 'http://localhost:8080/Billing';
  private apiUrl = environment.apiBaseUrl+'/Billing';

  constructor(private http: HttpClient) {}

  /** Generate Bill */
  createBill(cartIds: number[], paymentMethod: string): Observable<BillResponse> {
    const request = { cartIds, paymentMethod };
    return this.http.post<BillResponse>(`${this.apiUrl}/api/bill`, request);
  }

  /** Fetch Bill by ID */
  getBillById(billId: number): Observable<BillResponse> {
    return this.http.get<BillResponse>(`${this.apiUrl}/api/bill/${billId}`);
  }
}
