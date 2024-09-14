import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss'],
})
export class DriverManagementComponent {
  editingDriver: boolean = false;
  searchTerm: string = '';

  constructor(private dialog: MatDialog) {}
  drivers: any[] = [
    {
      driverId: 'D001',
      licenseNumber: 'LIC123456',
      name: 'john_doe',
      mobile: '0712345678',
      email: 'john.doe@example.com',
      status: 'Busy',
      lastLoginDate: new Date(),
      lastLogoutDate: new Date(),
      last5Trips: [
        {
          pickupLocation: '123 Main St, Colombo',
          dropoffLocation: '456 Beach Rd, Galle',
          driverName: 'Arun Silva',
          driverMobile: '0771234567',
          reviewScore: 4.5,
          payment: 3500.0,
        },
        {
          pickupLocation: '789 Hill St, Kandy',
          dropoffLocation: '101 River Ln, Nuwara Eliya',
          driverName: 'Dilan Perera',
          driverMobile: '0712345678',
          reviewScore: 5.0,
          payment: 4500.0,
        },
        {
          pickupLocation: '102 City Plaza, Colombo',
          dropoffLocation: '204 Sun Ave, Negombo',
          driverName: 'Kumar Fernando',
          driverMobile: '0759876543',
          reviewScore: 4.0,
          payment: 3200.0,
        },
        {
          pickupLocation: '305 Lake Rd, Anuradhapura',
          dropoffLocation: '789 Temple St, Polonnaruwa',
          driverName: 'Suresh Kumar',
          driverMobile: '0765432109',
          reviewScore: 3.5,
          payment: 2700.0,
        },
        {
          pickupLocation: '502 Garden St, Jaffna',
          dropoffLocation: '105 Ocean Rd, Mannar',
          driverName: 'Ravi Rajapaksha',
          driverMobile: '0781234567',
          reviewScore: 4.8,
          payment: 6000.0,
        },
      ],
    },
    // Add more drivers as needed
  ];

  // New driver model for adding
  newDriver: any = {
    licenseNumber: '',
    mobile: '',
    name: '',
    email: '',
  };

  // Selected driver for viewing/editing
  selectedDriver: any | null = null;

  // Column definitions for the table
  displayedColumns: string[] = [
    'driverId',
    'licenseNumber',
    'username',
    'mobile',
    'email',
    'lastLoginDate',
    'lastLogoutDate',
    'status',
    'actions',
  ];

  // Function to add a new driver
  saveDriver() {
    const newDriverId = `D00${this.drivers.length + 1}`;
    const driverToAdd: any = {
      driverId: newDriverId,
      licenseNumber: this.newDriver.licenseNumber!,
      username: this.newDriver.name!.toLowerCase().replace(/ /g, '_'),
      mobile: this.newDriver.mobile!,
      email: this.newDriver.email!,
      lastLoginDate: new Date(),
      lastLogoutDate: new Date(),
      last5Trips: [], // Assuming new driver has no trips yet
    };

    this.drivers.push(driverToAdd);
    this.clearForm();
  }

  // Clear the add/edit form
  clearForm() {
    this.newDriver = {
      licenseNumber: '',
      mobile: '',
      name: '',
      email: '',
    };
  }

  // Function to edit driver details
  editDriver(driver: any) {
    this.editingDriver = true;
    this.newDriver = { ...driver }; // Pre-fill form with selected driver details
  }

  // Function to view driver's last 5 trips
  viewDriver(driver: any, dialogRef: TemplateRef<any>) {
    this.dialog.open(dialogRef);
    this.selectedDriver = driver;
  }

  // Function to delete a driver
  deleteDriver(driver: any) {
    const index = this.drivers.indexOf(driver);
    if (index !== -1) {
      this.drivers.splice(index, 1);
    }
  }
  applyFilter() {}
}
