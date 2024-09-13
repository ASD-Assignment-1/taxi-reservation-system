import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  totalPassengers: number = 0;
  totalDrivers: number = 0;
  ongoingTrips: number = 0;
  totalRevenue: number = 0;



  center = { lat: 6.927079, lng: 79.861244 };
  zoom = 13;
  markers: any[] = [];
  routePath: any[] = [];
  filteredPickupResults: any[] = [];
  filteredDropoffResults: any[] = [];

  recentActivities: { description: string; time: string }[] = [];
  drivers :any[]= [];
  recentPayments: {
    clientName: string;
    tripId: string;
    amount: number;
    date: Date;
  }[] = [];
  reservationForm: FormGroup;
  constructor(private fb: FormBuilder, private dialog: MatDialog,private http: HttpClient) {
    this.reservationForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      pickupLocation: ['', Validators.required],
      dropoffLocation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSummaryData();
    this.loadRecentActivities();
    this.loadRecentPayments();

    this.reservationForm.get('pickupLocation')?.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.searchLocations(value))
      )
      .subscribe((results) => {
        console.log(results);

        this.filteredPickupResults = results;
      });

    this.reservationForm.get('dropoffLocation')?.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.searchLocations(value))
      )
      .subscribe((results) => {
        this.filteredDropoffResults = results;
      });
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

  loadSummaryData(): void {
    this.totalPassengers = 1200;
    this.totalDrivers = 320;
    this.ongoingTrips = 15;
    this.totalRevenue = 1580000;
  }

  loadRecentActivities(): void {
    this.recentActivities = [
      { description: 'New driver registered: John Doe', time: '2 hours ago' },
      {
        description: 'New passenger booked a ride: Jane Smith',
        time: '3 hours ago',
      },
      {
        description: 'Trip completed by driver: David Lee',
        time: '4 hours ago',
      },
    ];
  }

  loadRecentPayments(): void {
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

  openReservationModal(dialogRef: TemplateRef<any>) {
    this.dialog.open(dialogRef);
  }

  searchDrivers(dialogRef: TemplateRef<any>) {
    this.drivers = [
      { name: 'John Doe', image: 'assets/images/empty-user.jpg', mobileNumber: '+1234567890' },
      { name: 'Jane Smith', image: 'assets/images/empty-user.jpg', mobileNumber: '+0987654321' }
    ];
    this.closeModal();
    this.dialog.open(dialogRef);
  }

  getAvailableDrivers(pickup: string, dropoff: string) {
    // Mock data - replace with real driver search logic
    return [
      { id: 1, name: 'Driver 1' },
      { id: 2, name: 'Driver 2' },
    ];
  }

  reserveDriver(driver:any) {
    const { customerName, customerEmail, pickupLocation, dropoffLocation } = this.reservationForm.value;

    // Perform reservation logic here
    alert(`Taxi reserved for ${customerName} with ${driver.name}.`);
    
    this.dialog.closeAll(); // Close modal
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

  closeModal() {
    this.dialog.closeAll();
  }
}
