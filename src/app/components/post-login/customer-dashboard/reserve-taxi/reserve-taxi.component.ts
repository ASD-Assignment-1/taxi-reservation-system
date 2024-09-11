import { Component } from '@angular/core';
@Component({
  selector: 'app-reserve-taxi',
  templateUrl: './reserve-taxi.component.html',
  styleUrls: ['./reserve-taxi.component.scss'],
})
export class ReserveTaxiComponent {
  center: google.maps.LatLngLiteral = { lat: 6.9271, lng: 79.8612 }; // Example: Colombo center
  zoom = 12;
  markers: Array<{ position: google.maps.LatLngLiteral, label: string }> = [];

  pickupLocation: string = '';
  dropoffLocation: string = '';
  selectedLatLng: google.maps.LatLngLiteral | null = null;

  selectedLocationType: 'pickup' | 'dropoff' = 'pickup'; 

  isPickupSelected = false;
  isDropoffSelected = false;


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


  onCheckboxChange(type: 'pickup' | 'dropoff') {
    if (this.selectedLatLng) {
      if (type === 'pickup') {
        if (this.isPickupSelected) {
          this.pickupLocation = `${this.selectedLatLng.lat}, ${this.selectedLatLng.lng}`;
        } else {
          this.pickupLocation = '';
        }
      } else if (type === 'dropoff') {
        if (this.isDropoffSelected) {
          this.dropoffLocation = `${this.selectedLatLng.lat}, ${this.selectedLatLng.lng}`;
        } else {
          this.dropoffLocation = '';
        }
      }
    } else {
      alert('Please select a location on the map first.');
    }
  }

  searchDrivers() {
    if (this.pickupLocation && this.dropoffLocation) {
      console.log(`Searching drivers from pickup: ${this.pickupLocation} to dropoff: ${this.dropoffLocation}`);
    } else {
      alert('Please select both Pickup and Drop-off locations.');
    }
  }
}
