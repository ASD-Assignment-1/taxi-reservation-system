import { Component } from '@angular/core';

@Component({
  selector: 'app-available-drivers',
  templateUrl: './available-drivers.component.html',
  styleUrls: ['./available-drivers.component.scss'],
})
export class AvailableDriversComponent {
  tripAmount: number = 50.75; // Example amount
  pickupLocation = '123 Main St,123 Main St,123 Main St,123 Main St,123 Main St'; // Set the pickup location dynamically
  dropoffLocation = '456 Elm St,123 Main St,123 Main St'; // Set the drop-off location dynamically
  drivers = [
    {
      name: 'John Doe',
      image: 'assets/images/empty-user.jpg',
      rate: 4.5,
    
    },
    {
      name: 'Jane Smith',
      image: 'assets/images/empty-user.jpg',
      rate: 4.8,
      
    },
    {
      name: 'Mark Wilson',
      image: 'assets/images/empty-user.jpg',
      rate: 3.9,
      
    },
    {
      name: 'John Doe',
      image: 'assets/images/empty-user.jpg',
      rate: 4.5,
    
    },
    {
      name: 'Jane Smith',
      image: 'assets/images/empty-user.jpg',
      rate: 4.8,
      
    },
    {
      name: 'Mark Wilson',
      image: 'assets/images/empty-user.jpg',
      rate: 3.9,
      
    },
  ];

  getStars(rating: number): string[] {
    const stars = [];
    const roundedRating = Math.round(rating); // Round the rating to nearest integer

    for (let i = 0; i < 5; i++) {
      stars.push(i < roundedRating ? 'filled' : 'outline');
    }

    return stars;
  }


  reserveDriver(driver: any) {
    // Handle driver reservation
    console.log(`Reserving driver: ${driver.name}`);
  }
}
