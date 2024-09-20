import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DriverService } from 'src/app/services/driver/driver.service';

@UntilDestroy()
@Component({
  selector: 'app-current-trip',
  templateUrl: './current-trip.component.html',
  styleUrls: ['./current-trip.component.scss']
})
export class CurrentTripComponent implements OnInit{

  booking = {
    pickupLocation: '123 Pickup St, Springfield',
    dropoffLocation: '456 Dropoff Ave, Springfield',
    pickupLat: 40.7128, // Latitude for pickup location
    pickupLng: -74.006, // Longitude for pickup location
    dropoffLat: 40.7308, // Latitude for dropoff location
    dropoffLng: -73.9973, // Longitude for dropoff location
    payment: 25.0,
    clientName: 'Sapumal',
    clientPhone: '077-1234556',
  };

  constructor(private servie:DriverService){

  }
  
  ngOnInit(): void {
  }

  getGoogleMapsUrl(): string {
    const { pickupLat, pickupLng, dropoffLat, dropoffLng } = this.booking;
    return `https://www.google.com/maps/dir/?api=1&origin=${pickupLat},${pickupLng}&destination=${dropoffLat},${dropoffLng}`;
  }
}
