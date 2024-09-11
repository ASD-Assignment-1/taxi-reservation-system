import { Component } from '@angular/core';

@Component({
  selector: 'app-reserve-taxi',
  templateUrl: './reserve-taxi.component.html',
  styleUrls: ['./reserve-taxi.component.scss'],
})
export class ReserveTaxiComponent {
  center = { lat: 6.9271, lng: 79.8612 }; // Default center (Colombo)
  zoom = 12;

  pickupLocation: string = '';
  dropoffLocation: string = '';
  
  markers: Array<{ position: { lat: number, lng: number }, label: string, title: string }> = [];

  selectedLocationType: 'pickup' | 'dropoff' = 'pickup'; // Track which location to set

  constructor() {}

  ngOnInit(): void {}

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Determine which location (pickup/dropoff) is being set
      if (this.selectedLocationType === 'pickup') {
        this.pickupLocation = `Latitude: ${lat}, Longitude: ${lng}`;
        this.addMarker(lat, lng, 'Pickup');
      } else {
        this.dropoffLocation = `Latitude: ${lat}, Longitude: ${lng}`;
        this.addMarker(lat, lng, 'Drop-off');
      }
    }
  }

  // Add marker to the map
  addMarker(lat: number, lng: number, label: string) {
    const newMarker = {
      position: { lat, lng },
      label: label,
      title: `${label} Location`
    };

    this.markers.push(newMarker);
  }

  searchDrivers() {
    if (this.pickupLocation && this.dropoffLocation) {
      // Logic for searching drivers based on locations
      console.log(`Searching drivers from ${this.pickupLocation} to ${this.dropoffLocation}`);
    } else {
      alert('Please select both Pickup and Drop-off locations.');
    }
  }
}
