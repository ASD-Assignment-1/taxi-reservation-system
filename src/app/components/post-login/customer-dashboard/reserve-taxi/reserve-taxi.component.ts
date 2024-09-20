import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { debounceTime, map, switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-reserve-taxi',
  templateUrl: './reserve-taxi.component.html',
  styleUrls: ['./reserve-taxi.component.scss'],
})
export class ReserveTaxiComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: any;
  protected directionsService = new google.maps.DirectionsService();
  protected directionsRenderer = new google.maps.DirectionsRenderer();

  protected useCurrentLocation = false;

  protected filteredPickupResults: any[] = [];
  protected filteredDropoffResults: any[] = [];

  protected markers: any[] = [];
  protected routePath: any[] = [];

  protected center = { lat: 6.927079, lng: 79.861244 };
  protected zoom = 13;

  protected form: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      pickUp: ['', Validators.required],
      dropOff: ['', Validators.required],
      pickupToggle: [false, Validators.required],
      dropoffToggle: [false, Validators.required],
    });
  }

  ngOnInit() {
    this.form.get('pickUp')?.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.searchLocations(value))
      )
      .subscribe((results) => {
        console.log(results);

        this.filteredPickupResults = results;
      });

    this.form.get('dropOff')?.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.searchLocations(value))
      )
      .subscribe((results) => {
        this.filteredDropoffResults = results;
      });
  }

  protected onCurrentLocationChange(): void {
    if (this.useCurrentLocation) {
      this.getCurrentLocation();
    } else {
      this.form.get('pickUp')?.setValue('');
    }
  }

  protected onToggleChange(type: string): void {
    if (type === 'pickup') {
      this.form.get('dropoffToggle')?.setValue(false);
    } else if (type === 'dropoff') {
      this.form.get('pickupToggle')?.setValue(false);
    }
  }

  protected setPickupLocation(lat: number, lng: number): void {
    this.form.get('pickUp')?.setValue(`Lat: ${lat}, Lng: ${lng}`);
    this.addMarker({ lat, lon: lng }, 'Pickup');
  }

  protected setDropoffLocation(lat: number, lng: number): void {
    this.form.get('dropOff')?.setValue(`Lat: ${lat}, Lng: ${lng}`);
    this.addMarker({ lat, lon: lng }, 'Dropoff');
  }


  protected getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.form.get('pickUp')?.setValue(`Lat: ${lat}, Lng: ${lon}`);
          this.addMarker({ lat, lon }, 'Pickup');
        },
        (error) => {
          console.error('Error getting current location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  protected onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const latLng = event.latLng;
      const lat = latLng.lat();
      const lng = latLng.lng();
      if (this.form.get('pickupToggle')?.value) {
        this.setPickupLocation(lat, lng);
      }
      if (this.form.get('dropoffToggle')?.value) {
        this.setDropoffLocation(lat, lng);
      }
    }
  }

  protected searchDrivers() {
    if (this.markers.length >= 2) {
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

  protected searchLocations(query: string) {
    if (query.length < 3) {
      return [];
    }
    return this.http
      .get<any[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      )
      .pipe(map((results) => results));
  }

  protected onPickupSelect(result: any) {
    this.addMarker(
      this.filteredPickupResults.find(
        (x: any) => x.place_id === result.option.id
      ),
      'Pickup'
    );
  }

  protected onDropoffSelect(result: any) {
    this.addMarker(
      this.filteredDropoffResults.find(
        (x: any) => x.place_id === result.option.id
      ),
      'Dropoff'
    );
  }

  protected addMarker(result: any, type: string) {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    this.markers = this.markers.filter((marker) => marker.label !== type);
    // Add marker to the map
    this.markers = [
      ...this.markers,
      { position: { lat, lng: lon }, label: type },
    ];

    // Center the map on the selected location
    this.center = { lat, lng: lon };
    this.zoom = 13;
  }
}
