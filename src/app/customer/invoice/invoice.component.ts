import { Component, OnInit } from '@angular/core';
import {  BillingService, BillResponse } from '../../billing.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

    bill: BillResponse | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private billingService: BillingService
    ) {}
  
    ngOnInit(): void {
      const billId = Number(this.route.snapshot.paramMap.get('billId'));
      if (billId) {
        this.billingService.getBillById(billId).subscribe({
          next: (data) => {
            this.bill = data;
          },
          error: () => {
            alert('Failed to load bill');
          }
        });
      }
    }
  
    downloadInvoice(): void {
      const element = document.getElementById('invoice');
      if (element) {
        import('html2pdf.js').then((html2pdf) => {
          html2pdf.default()
            .from(element)
            .set({ filename: `${this.bill?.username } ${this.bill?.invoiceNo}.pdf` })
            .save();
        });
      }
    }
  }
  
