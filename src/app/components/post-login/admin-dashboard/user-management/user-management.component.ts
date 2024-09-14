import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  @ViewChild('userDetailsModal') userDetailsModal: ElementRef | undefined;

  constructor( private dialog: MatDialog){

  }

  displayedColumns: string[] = ['userId','username','name','mobile', 'email','lastLogin','lastLogout', 'actions'];
  users = [
    {
      id: 1,
      username: 'JohnDoe',
      name: 'John Doe',
      mobile: '0712345678',
      email: 'john@example.com',
      lastLoginDate: '2024-09-12 08:45:00',
      lastLogoutDate: '2024-09-12 17:30:00',
      last5Trips: [
        {
          pickupLocation: '123 Main St, Colombo',
          dropoffLocation: '456 Beach Rd, Galle',
          driverName: 'Arun Silva',
          driverMobile: '0771234567',
          reviewScore: 4.5,
          payment: 3500.00
        },
        {
          pickupLocation: '789 Hill St, Kandy',
          dropoffLocation: '101 River Ln, Nuwara Eliya',
          driverName: 'Dilan Perera',
          driverMobile: '0712345678',
          reviewScore: 5.0,
          payment: 4500.00
        },
        {
          pickupLocation: '102 City Plaza, Colombo',
          dropoffLocation: '204 Sun Ave, Negombo',
          driverName: 'Kumar Fernando',
          driverMobile: '0759876543',
          reviewScore: 4.0,
          payment: 3200.00
        },
        {
          pickupLocation: '305 Lake Rd, Anuradhapura',
          dropoffLocation: '789 Temple St, Polonnaruwa',
          driverName: 'Suresh Kumar',
          driverMobile: '0765432109',
          reviewScore: 3.5,
          payment: 2700.00
        },
        {
          pickupLocation: '502 Garden St, Jaffna',
          dropoffLocation: '105 Ocean Rd, Mannar',
          driverName: 'Ravi Rajapaksha',
          driverMobile: '0781234567',
          reviewScore: 4.8,
          payment: 6000.00
        }
      ]
    },
    {
      id: 2,
      username: 'JaneDoe',
      name: 'Jane Doe',
      mobile: '0789876543',
      email: 'jane@example.com',
      lastLoginDate: '2024-09-13 09:30:00',
      lastLogoutDate: '2024-09-13 18:15:00',
      last5Trips: [
        {
          pickupLocation: '55 Green St, Colombo',
          dropoffLocation: '21 Lotus Ave, Kandy',
          driverName: 'Nuwan Jayasinghe',
          driverMobile: '0719876543',
          reviewScore: 5.0,
          payment: 4200.00
        },
        {
          pickupLocation: '98 Freedom St, Galle',
          dropoffLocation: '23 Palm St, Hikkaduwa',
          driverName: 'Amal Silva',
          driverMobile: '0721234567',
          reviewScore: 4.5,
          payment: 2500.00
        },
        {
          pickupLocation: '303 Church Rd, Jaffna',
          dropoffLocation: '156 Lighthouse St, Colombo',
          driverName: 'Chathura Perera',
          driverMobile: '0786543210',
          reviewScore: 4.2,
          payment: 5100.00
        },
        {
          pickupLocation: '111 Temple Ln, Anuradhapura',
          dropoffLocation: '12 Lakeview Dr, Sigiriya',
          driverName: 'Pradeep Kumar',
          driverMobile: '0774567890',
          reviewScore: 3.8,
          payment: 3300.00
        },
        {
          pickupLocation: '88 Rose St, Kandy',
          dropoffLocation: '56 Harbor St, Trincomalee',
          driverName: 'Samantha Fernando',
          driverMobile: '0712345679',
          reviewScore: 4.9,
          payment: 7000.00
        }
      ]
    }
  ];

  user:any
  
  

  openUserDetails(user:any,dialogRef: TemplateRef<any>) {
    this.user = user;
    this.dialog.open(dialogRef);
    // Open modal to display user last 5 trips
  }

  deleteUser(userId:any) {
    // Implement delete functionality here
  }
}
