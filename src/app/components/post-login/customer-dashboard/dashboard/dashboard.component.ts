import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private service: ReservationService) {}
  latestBookings = [
    { date: '2024-09-08', driver: 'John Doe', rating: 4 },
    { date: '2024-09-07', driver: 'Jane Smith', rating: 5 },
  ];

  latestRates = [
    { date: '2024-09-08', distance: 12, price: 15.5 },
    { date: '2024-09-07', distance: 8, price: 10.0 },
  ];
}
