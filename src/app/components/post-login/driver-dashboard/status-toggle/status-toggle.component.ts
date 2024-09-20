import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DriverService } from 'src/app/services/driver/driver.service';

@UntilDestroy()
@Component({
  selector: 'app-status-toggle',
  templateUrl: './status-toggle.component.html',
  styleUrls: ['./status-toggle.component.scss']
})
export class StatusToggleComponent implements OnInit{


  protected status = false;  // Default status is "Busy"
  protected currentStatus = 'Busy';
  ongoingTrip: any;
  
  tripRequests = [
    {
      pickupLocation: '123 Main St',
      dropoffLocation: '456 Oak Ave',
      distance: 10,
      estimatedFare: 20.5
    },
    {
      pickupLocation: '789 Pine St',
      dropoffLocation: '101 Maple Dr',
      distance: 8,
      estimatedFare: 18.0
    }
  ];

  earnings = {
    today: 100,
    week: 500,
    month: 2000
  };

  constructor(private service:DriverService){

  }

  ngOnInit(): void {
  }

  onStatusChange(event: any) {
    this.currentStatus = this.status ? 'Available' : 'Busy';
  }

}
