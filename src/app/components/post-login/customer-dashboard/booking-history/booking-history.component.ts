import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss'],
})
export class BookingHistoryComponent {
  selectedDriver: any;
  selectedRating = 0;
  reviewText = '';
  ongoingTrips = [
    {
      amount: 25,
      pickup: 'Colombo',
      dropoff: 'Kandy',
      status: 'In Progress',
      driver: {
        name: 'John Doe',
        image: 'assets/images/empty-user.jpg',
        rating: 3.8,
        email: 'driver@gmail.com',
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
        rating: 3.5,
        email: 'driver@gmail.com',
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
        rating: 4,
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

  constructor(private dialog: MatDialog) {}
  payForTrip(trip: any, dialogRef: TemplateRef<any>) {
    console.log(
      `Paying for trip from ${trip.pickup} to ${trip.dropoff}, Amount: $${trip.amount}`
    );
    alert(`Payment for $${trip.amount} has been successfully processed!`);

    this.selectedDriver = trip.driver;
    trip.status = 'Paid';
    this.dialog.open(dialogRef);
  }

  toggleTripDetails(trip: any) {
    console.log(
      `Toggling details for trip from ${trip.pickup} to ${trip.dropoff}`
    );
  }

  getDriverStars(rating: number): string[] {
    const stars = [];
    const roundedRating = Math.round(rating); // Round the rating to nearest integer

    for (let i = 0; i < 5; i++) {
      stars.push(i < roundedRating ? 'filled' : 'outline');
    }

    return stars;
  }

  rateDriver(star: number) {
    this.selectedRating = star; // Set selected star rating
  }

  submitReview() {
    const review = {
      driver: this.selectedDriver,
      rating: this.selectedRating,
      reviewText: this.reviewText,
    };
    console.log('Review submitted: ', review);

    Swal.fire({
      title: 'Rate the Driver',
      text: `You are about to submit a rating for text.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Submit Rating',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle rating submission logic here
        Swal.fire(
          'Submitted!',
          'Your rating has been submitted.',
          'success'
        );
      }
    });
    // Logic to submit review to the server
  }

  getStars(rating: number) {
    // Return an array to display filled and outlined stars
    return Array(5)
      .fill(0)
      .map((_, index) => (index < rating ? 'filled' : 'outline'));
  }
}
