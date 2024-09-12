import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';
import { debounceTime, map, switchMap } from 'rxjs';
@Component({
  selector: 'app-reserve-taxi',
  templateUrl: './reserve-taxi.component.html',
  styleUrls: ['./reserve-taxi.component.scss'],
})
export class ReserveTaxiComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: any;

  pickupControl = new FormControl();
  dropoffControl = new FormControl();
  useCurrentLocation = false;
  pickupToggle = false;
  dropoffToggle = false;

  filteredPickupResults: any[] = [];
  filteredDropoffResults: any[] = [];
  markers: any[] = [];
  routePath: any[] = [];

  center = { lat: 6.927079, lng: 79.861244 };
  zoom = 13;

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.pickupControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.searchLocations(value))
      )
      .subscribe((results) => {
        console.log(results);

        this.filteredPickupResults = results;
      });

    this.dropoffControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.searchLocations(value))
      )
      .subscribe((results) => {
        this.filteredDropoffResults = results;
      });
  }

  onCurrentLocationChange(): void {
    if (this.useCurrentLocation) {
      this.getCurrentLocation();
    } else {
      this.pickupControl.setValue('');
    }
  }

  onToggleChange(type: string): void {
    if (type === 'pickup') {
      this.dropoffToggle = false;
    } else if (type === 'dropoff') {
      this.pickupToggle = false;
    }
  }

  setPickupLocation(lat: number, lng: number): void {
    this.pickupControl.setValue(`Lat: ${lat}, Lng: ${lng}`);
    this.markers = this.markers.filter((marker) => marker.label !== 'Pickup');
    this.markers.push({ position: { lat, lng }, label: 'Pickup' });
    this.center = { lat, lng };
  }

  setDropoffLocation(lat: number, lng: number): void {
    this.dropoffControl.setValue(`Lat: ${lat}, Lng: ${lng}`);
    this.markers = this.markers.filter((marker) => marker.label !== 'Dropoff');
    this.markers.push({ position: { lat, lng }, label: 'Dropoff' });
    this.center = { lat, lng };
  }

  removeMarker(type: string): void {
    this.markers = this.markers.filter(
      (marker) => marker.label !== (type === 'pickup' ? 'Pickup' : 'Dropoff')
    );
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.pickupControl.setValue(`Lat: ${lat}, Lng: ${lng}`);
          this.center = { lat, lng };
          this.markers = [
            { position: { lat, lng }, label: 'Current Location' },
          ];
        },
        (error) => {
          console.error('Error getting current location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const latLng = event.latLng;
      const lat = latLng.lat();
      const lng = latLng.lng();
      if (this.pickupToggle) {
        this.setPickupLocation(lat, lng);
      }
      if (this.dropoffToggle) {
        this.setDropoffLocation(lat, lng);
      }
    }
  }

  searchDrivers() {
    if (this.markers.length >= 2) {
      this.calculateAndDisplayRoute();
      this.routePath = [
        {
          lat: this.markers[0].position.lat,
          lng: this.markers[0].position.lng,
        },
        {
          lat: this.markers[1].position.lat,
          lng: this.markers[1].position.lng,
        },
      ];
    }
  }

  protected toRoute(): void {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.markers[0].position.lat},${this.markers[0].position.lng}&destination=${this.markers[1].position.lat},${this.markers[1].position.lng}&travelmode=driving`;
    window.open(url, '_blank');
  }

  calculateAndDisplayRoute() {
    if (this.markers.length >= 2) {
      this.directionsService.route(
        {
          origin: this.markers[0].position,
          destination: this.markers[1].position,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(result);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    }
  }

  searchLocations(query: string) {
    if (query.length < 3) {
      return [];
    }
    return this.http
      .get<any[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      )
      .pipe(map((results) => results));
  }

  onPickupSelect(result: any) {
    this.addMarker(
      this.filteredPickupResults.find(
        (x: any) => x.place_id === result.option.id
      ),
      'Pickup'
    );
  }

  onDropoffSelect(result: any) {
    this.addMarker(
      this.filteredDropoffResults.find(
        (x: any) => x.place_id === result.option.id
      ),
      'Dropoff'
    );
  }

  addMarker(result: any, type: string) {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    this.markers = this.markers.filter((marker) => marker.label !== type);
    // Add marker to the map
    this.markers = [
      ...this.markers,
      { position: { lat, lng: lon }, label: result.display_name },
    ];

    // Center the map on the selected location
    this.center = { lat, lng: lon };
    this.zoom = 13;
  }
}
