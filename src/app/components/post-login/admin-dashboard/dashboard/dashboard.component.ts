import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map, switchMap } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  protected totalPassengers: number = 0;
  protected totalDrivers: number = 0;
  protected ongoingTrips: number = 0;
  protected totalRevenue: number = 0;

  protected center = { lat: 6.927079, lng: 79.861244 };
  protected zoom = 13;

  protected markers: any[] = [];
  protected routePath: any[] = [];
  protected filteredPickupResults: any[] = [];
  protected filteredDropoffResults: any[] = [];

  drivers: any[] = [];
  recentPayments: {
    clientName: string;
    tripId: string;
    amount: number;
    date: Date;
  }[] = [];

  protected reservationForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient,
    private service: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      pickupLocation: ['', Validators.required],
      dropoffLocation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSummaryData();
    this.loadRecentPayments();

    this.reservationForm
      .get('pickupLocation')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap((value) => this.searchLocations(value))
      )
      .subscribe((results) => {
        console.log(results);

        this.filteredPickupResults = results;
      });

    this.reservationForm
      .get('dropoffLocation')
      ?.valueChanges.pipe(
        debounceTime(300),
        switchMap((value) => this.searchLocations(value))
      )
      .subscribe((results) => {
        this.filteredDropoffResults = results;
      });
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

  protected loadSummaryData(): void {
    this.totalPassengers = 1200;
    this.totalDrivers = 320;
    this.ongoingTrips = 15;
    this.totalRevenue = 1580000;
  }

  protected loadRecentPayments(): void {
    this.recentPayments = [
      {
        clientName: 'John Doe',
        tripId: 'TR123',
        amount: 1500,
        date: new Date('2024-09-11T14:30:00'),
      },
      {
        clientName: 'Jane Smith',
        tripId: 'TR124',
        amount: 2500,
        date: new Date('2024-09-12T10:15:00'),
      },
      {
        clientName: 'David Lee',
        tripId: 'TR125',
        amount: 1000,
        date: new Date('2024-09-12T12:45:00'),
      },
    ];
  }

  protected openReservationModal(dialogRef: TemplateRef<any>) {
    this.dialog.open(dialogRef);
  }

  protected searchDrivers(dialogRef: TemplateRef<any>) {
    this.drivers = [
      {
        name: 'John Doe',
        image: 'assets/images/empty-user.jpg',
        mobileNumber: '+1234567890',
      },
      {
        name: 'Jane Smith',
        image: 'assets/images/empty-user.jpg',
        mobileNumber: '+0987654321',
      },
    ];
    this.closeModal();
    this.dialog.open(dialogRef);
  }

  protected reserveDriver(driver: any) {
    const { customerName, customerEmail, pickupLocation, dropoffLocation } =
      this.reservationForm.value;

    alert(`Taxi reserved for ${customerName} with ${driver.name}.`);

    this.dialog.closeAll(); // Close modal
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
      { position: { lat, lng: lon }, label: result.display_name },
    ];

    // Center the map on the selected location
    this.center = { lat, lng: lon };
    this.zoom = 13;
  }

  protected closeModal() {
    this.dialog.closeAll();
  }
}
