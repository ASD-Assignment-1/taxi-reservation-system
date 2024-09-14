import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent {
  editingDriver:boolean = false;
  searchTerm: string = '';


  constructor( private dialog: MatDialog){
   
  }
  drivers: any[] = [
    {
      driverId: 'D001',
      licenseNumber: 'LIC123456',
      username: 'john_doe',
      mobile: '0712345678',
      email: 'john.doe@example.com',
      status:'Busy',
      lastLoginDate: new Date(),
      lastLogoutDate: new Date(),
      last5Trips: [
        { pickupLocation: 'Colombo', dropoffLocation: 'Kandy', driverName: 'John Doe', driverMobile: '0712345678', reviewScore: 4.5, payment: 1500 },
        { pickupLocation: 'Galle', dropoffLocation: 'Matara', driverName: 'John Doe', driverMobile: '0712345678', reviewScore: 5.0, payment: 1200 },
        { pickupLocation: 'Negombo', dropoffLocation: 'Colombo', driverName: 'John Doe', driverMobile: '0712345678', reviewScore: 4.0, payment: 2000 },
        { pickupLocation: 'Jaffna', dropoffLocation: 'Kilinochchi', driverName: 'John Doe', driverMobile: '0712345678', reviewScore: 4.8, payment: 3500 },
        { pickupLocation: 'Kurunegala', dropoffLocation: 'Dambulla', driverName: 'John Doe', driverMobile: '0712345678', reviewScore: 4.9, payment: 2200 }
      ]
    }
    // Add more drivers as needed
  ];


  // New driver model for adding
  newDriver: any = {
    licenseNumber: '',
    mobile: '',
    name: '',
    email: ''
  };


  // Selected driver for viewing/editing
  selectedDriver: any | null = null;


  // Column definitions for the table
  displayedColumns: string[] = ['driverId', 'licenseNumber', 'username', 'mobile', 'email', 'lastLoginDate', 'lastLogoutDate','status', 'actions'];


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
      last5Trips: [] // Assuming new driver has no trips yet
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
      email: ''
    };
  }


  // Function to edit driver details
  editDriver(driver: any) {
    this.editingDriver = true
    this.newDriver = { ...driver }; // Pre-fill form with selected driver details
  }


  // Function to view driver's last 5 trips
  viewDriver(driver: any,dialogRef: TemplateRef<any>) {
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
  applyFilter() {
  }
}





