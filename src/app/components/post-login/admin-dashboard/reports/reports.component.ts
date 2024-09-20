import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ReservationService } from 'src/app/services/reservation/reservation.service';


@UntilDestroy()
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  paymentData = [
    { date: new Date(), driverName: 'John Doe', paymentStatus: 'Completed', paymentTime: new Date(), amount: 1200 },
    { date: new Date(), driverName: 'Jane Doe', paymentStatus: 'Pending', paymentTime: new Date(), amount: 1000 }
  ];

  protected displayedColumns: string[] = ['date', 'driverName', 'paymentStatus', 'paymentTime', 'amount', 'actions'];

  protected form:FormGroup
  constructor(private fb:FormBuilder,private service:ReservationService){
    this.form = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  submit() {
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





