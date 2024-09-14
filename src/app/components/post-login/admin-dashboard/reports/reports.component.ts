import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  fromDate: Date;
  toDate: Date;
  paymentData = [
    { date: new Date(), driverName: 'John Doe', paymentStatus: 'Completed', paymentTime: new Date(), amount: 1200 },
    { date: new Date(), driverName: 'Jane Doe', paymentStatus: 'Pending', paymentTime: new Date(), amount: 1000 }
    // Add more payment records here
  ];


  form:FormGroup
  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }
  searchPayments() {
    // Implement search logic based on fromDate and toDate
  }


  downloadCustomerReport() {
    // Implement download logic for customer report
  }


  downloadDriverReport() {
    // Implement download logic for driver report
  }


  downloadPaymentReport() {
    // Implement logic to download the table's payment report
  }
}





