import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverDashboardRoutingModule } from './driver-dashboard-routing.module';
import { StatusToggleComponent } from './status-toggle/status-toggle.component';
import { BookingRequestsComponent } from './booking-requests/booking-requests.component';
import { CurrentTripComponent } from './current-trip/current-trip.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Add this line
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StatusToggleComponent,
    BookingRequestsComponent,
    CurrentTripComponent,
    TripHistoryComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DriverDashboardRoutingModule,
    MatSlideToggleModule
  ]
})
export class DriverDashboardModule { }
