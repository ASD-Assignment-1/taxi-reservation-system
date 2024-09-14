import { Component } from '@angular/core';


@Component({
  selector: 'app-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.scss']
})
export class BookingOverviewComponent {
  ongoingTrips = [
    {
      driverName: 'John Doe',
      driverMobile: '0771234567',
      clientName: 'Jane Smith',
      pickupLocation: '123 Main St',
      dropoffLocation: '456 Elm St',
      payment: 1500.00
    },
    {
      driverName: 'Mark Johnson',
      driverMobile: '0717654321',
      clientName: 'Michael Lee',
      pickupLocation: '789 Oak St',
      dropoffLocation: '101 Maple Ave',
      payment: 1200.00
    }
    // Add more ongoing trip data as needed
  ];


  displayedColumns: string[] = [
    'driverName',
    'driverMobile',
    'clientName',
    'pickupLocation',
    'dropoffLocation',
    'payment'
  ];
}





