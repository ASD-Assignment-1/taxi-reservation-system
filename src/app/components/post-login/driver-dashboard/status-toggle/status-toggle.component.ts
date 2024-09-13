import { Component } from '@angular/core';

@Component({
  selector: 'app-status-toggle',
  templateUrl: './status-toggle.component.html',
  styleUrls: ['./status-toggle.component.scss']
})
export class StatusToggleComponent {

  status = false;  // Default status is "Busy"
  currentStatus = 'Busy';
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

  onStatusChange(event: any) {
    this.currentStatus = this.status ? 'Available' : 'Busy';
  }

  acceptRequest(request: any) {
    this.ongoingTrip = request;  // Start the trip
  }

  declineRequest(request: any) {
    this.tripRequests = this.tripRequests.filter(r => r !== request);  // Remove the declined request
  }

  viewNotifications() {
    // Logic for viewing notifications
  }
}
