import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss'],
})
export class BookingHistoryComponent {
  ongoingTrips = [
    {
      amount: 25,
      pickup: 'Colombo',
      dropoff: 'Kandy',
      status: 'In Progress',
      driver: {
        name: 'John Doe',
        image: 'assets/images/empty-user.jpg',
        rating: 4.8,
      },
    },
    {
      amount: 30,
      pickup: 'Galle',
      dropoff: 'Matara',
      status: 'In Progress',
      driver: {
        name: 'Jane Smith',
        image: 'assets/images/empty-user.jpg',
        rating: 4.5,
      },
    },
  ];

  completedTrips = [
    {
      amount: 20,
      pickup: 'Colombo',
      dropoff: 'Negombo',
      status: 'Completed',
      driver: {
        name: 'Chris Lee',
        image: 'assets/images/empty-user.jpg',
        rating: 4.9,
      },
    },
    {
      amount: 50,
      pickup: 'Batticaloa',
      dropoff: 'Jaffna',
      status: 'Completed',
      driver: {
        name: 'Sarah Khan',
        image: 'assets/images/empty-user.jpg',
        rating: 4.7,
      },
    },
  ];
  payForTrip(trip: any) {
    console.log(
      `Paying for trip from ${trip.pickup} to ${trip.dropoff}, Amount: $${trip.amount}`
    );
    alert(`Payment for $${trip.amount} has been successfully processed!`);

    trip.status = 'Paid';
  }

 
  toggleTripDetails(trip: any) {
    console.log(
      `Toggling details for trip from ${trip.pickup} to ${trip.dropoff}`
    );
  }

  getStars(rating: number): string[] {
    const stars = [];
    const roundedRating = Math.round(rating); // Round the rating to nearest integer

    for (let i = 0; i < 5; i++) {
      stars.push(i < roundedRating ? 'filled' : 'outline');
    }

    return stars;
  }
}
