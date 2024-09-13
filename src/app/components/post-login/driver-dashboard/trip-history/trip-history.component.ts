import { Component } from '@angular/core';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.scss'],
})
export class TripHistoryComponent {
  trips = [
    {
      clientName: 'John Doe',
      clientNumber: '+1234567890',
      pickupLocation: '123 Main St, Cityville',
      dropoffLocation: '456 Elm St, Cityville',
      pickupLatitude: 37.7749,
      pickupLongitude: -122.4194,
      dropoffLatitude: 37.8049,
      dropoffLongitude: -122.2711,
      payment: 25.5,
      rating: 4.5,
      feedback: 'Great ride! The driver was very friendly.',
      date:'2021-01-01'
    },
  ]; // Replace with your trip data

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'filled' : 'outline');
    }
    return stars;
  }

  getGoogleMapsUrl(trip: any) {
    const url =  `https://www.google.com/maps/dir/?api=1&origin=${trip.pickupLatitude},${trip.pickupLongitude}&destination=${trip.dropoffLatitude},${trip.dropoffLongitude}`;
  
    window.open(url, '_blank');
  }
}
