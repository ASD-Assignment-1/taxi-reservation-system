import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  latestBookings = [
    { date: '2024-09-08', driver: 'John Doe', rating: 4 },
    { date: '2024-09-07', driver: 'Jane Smith', rating: 5 }
  ];

  latestRates = [
    { date: '2024-09-08', distance: 12, price: 15.50 },
    { date: '2024-09-07', distance: 8, price: 10.00 }
  ];
}
