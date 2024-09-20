import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@UntilDestroy()
@Component({
  selector: 'app-available-drivers',
  templateUrl: './available-drivers.component.html',
  styleUrls: ['./available-drivers.component.scss'],
})
export class AvailableDriversComponent implements OnInit{

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

  constructor(private service:ReservationService){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  protected getStars(rating: number): string[] {
    const stars = [];
    const roundedRating = Math.round(rating); 

    for (let i = 0; i < 5; i++) {
      stars.push(i < roundedRating ? 'filled' : 'outline');
    }

    return stars;
  }


  protected reserveDriver(driver: any) {
    console.log(`Reserving driver: ${driver.name}`);
  }
}
