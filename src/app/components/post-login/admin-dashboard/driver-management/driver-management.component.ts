import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DriverStatus } from 'src/app/enums/DriverStatus.enum';
import { IDriverRegister } from 'src/app/interface/IDriverRegister';
import { IResponse } from 'src/app/interface/IResponse';
import { DriverService } from 'src/app/services/driver/driver.service';
import { DRIVER_INIT_IMAGE } from 'src/app/utility/constants/common-constant';
import { showError, showSuccess } from 'src/app/utility/helper';

@UntilDestroy()
@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss'],
})
export class DriverManagementComponent implements OnInit {
  protected displayedColumns: string[] = [
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


  protected form: FormGroup;
  protected driverId: number;

  protected driverList: any[] = [];

  protected searchTerm: string;

  editingDriver: boolean = false;
  selectedDriver: any | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: DriverService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      licenseNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.service
      .getAllDrivers(DriverStatus.AVAILABLE)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: IResponse) => {
          console.log(res);
        },
        error: (err: HttpErrorResponse) => {
          showError({
            title: 'System Error',
            text: 'Something Went Wrong',
          });
        },
      });
  }
  // drivers: any[] = [
  //   {
  //     driverId: 'D001',
  //     licenseNumber: 'LIC123456',
  //     name: 'john_doe',
  //     mobile: '0712345678',
  //     email: 'john.doe@example.com',
  //     status: 'Busy',
  //     lastLoginDate: new Date(),
  //     lastLogoutDate: new Date(),
  //     last5Trips: [
  //       {
  //         pickupLocation: '123 Main St, Colombo',
  //         dropoffLocation: '456 Beach Rd, Galle',
  //         driverName: 'Arun Silva',
  //         driverMobile: '0771234567',
  //         reviewScore: 4.5,
  //         payment: 3500.0,
  //       },
  //       {
  //         pickupLocation: '789 Hill St, Kandy',
  //         dropoffLocation: '101 River Ln, Nuwara Eliya',
  //         driverName: 'Dilan Perera',
  //         driverMobile: '0712345678',
  //         reviewScore: 5.0,
  //         payment: 4500.0,
  //       },
  //       {
  //         pickupLocation: '102 City Plaza, Colombo',
  //         dropoffLocation: '204 Sun Ave, Negombo',
  //         driverName: 'Kumar Fernando',
  //         driverMobile: '0759876543',
  //         reviewScore: 4.0,
  //         payment: 3200.0,
  //       },
  //       {
  //         pickupLocation: '305 Lake Rd, Anuradhapura',
  //         dropoffLocation: '789 Temple St, Polonnaruwa',
  //         driverName: 'Suresh Kumar',
  //         driverMobile: '0765432109',
  //         reviewScore: 3.5,
  //         payment: 2700.0,
  //       },
  //       {
  //         pickupLocation: '502 Garden St, Jaffna',
  //         dropoffLocation: '105 Ocean Rd, Mannar',
  //         driverName: 'Ravi Rajapaksha',
  //         driverMobile: '0781234567',
  //         reviewScore: 4.8,
  //         payment: 6000.0,
  //       },
  //     ],
  //   },
  //   // Add more drivers as needed
  // ];

  protected submit() {
    if (!this.driverId && !this.editingDriver) {
      const username = this.generateRandomUsername(
        this.form.get('name')?.value
      );
      const password = this.generateRandomPassword();

      const driverRequest: IDriverRegister = {
        ...this.form.value,
        userName: username,
        password: password,
        profileImage: DRIVER_INIT_IMAGE,
      };

      this.service
        .driverRegister(driverRequest)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res: IResponse) => {
            console.log(res);
            showSuccess({
              title: 'Success',
              text: 'New Driver Added Successfully',
            });
            this.clearForm();
          },
          error: (err: HttpErrorResponse) => {
            showError({
              title: 'System Error',
              text: 'Something Went Wrong',
            });
          },
        });
    } else {
      this.service
        .driverRegister(this.form.value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: (res: IResponse) => {
            showSuccess({
              title: 'Success',
              text: 'Driver Updated Successfully',
            });
            this.clearForm();
          },
          error: (err: HttpErrorResponse) => {
            showError({
              title: 'System Error',
              text: 'Something Went Wrong',
            });
          },
        });
    }
  }

  protected generateRandomUsername(name: string): string {
    const nameWithoutSpaces = name.replace(/\s+/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${nameWithoutSpaces}${randomNum}`;
  }

  protected generateRandomPassword(length: number = 10): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
      password += randomChar;
    }
    return password;
  }

  protected clearForm() {
    this.form.reset();
  }

  protected editDriver(driver: any) {
    this.editingDriver = true;
  }

  protected viewDriver(driver: any, dialogRef: TemplateRef<any>) {
    this.dialog.open(dialogRef);
    this.selectedDriver = driver;
  }

  protected deleteDriver(driver: any) {}

  protected search() {}
}
