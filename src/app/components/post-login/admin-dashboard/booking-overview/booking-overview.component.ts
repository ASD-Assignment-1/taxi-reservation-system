import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@UntilDestroy()
@Component({
  selector: 'app-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.scss'],
})
export class BookingOverviewComponent implements OnInit {
  protected displayedColumns: string[] = [
    'driverName',
    'driverMobile',
    'clientName',
    'pickupLocation',
    'dropoffLocation',
    'payment',
  ];

  ongoingTrips = [
    {
      driverName: 'John Doe',
      driverMobile: '0771234567',
      clientName: 'Jane Smith',
      pickupLocation: '123 Main St',
      dropoffLocation: '456 Elm St',
      payment: 1500.0,
    },
    {
      driverName: 'Mark Johnson',
      driverMobile: '0717654321',
      clientName: 'Michael Lee',
      pickupLocation: '789 Oak St',
      dropoffLocation: '101 Maple Ave',
      payment: 1200.0,
    },
  ];

  constructor(private service: ReservationService) {}

  ngOnInit(): void {}
}
