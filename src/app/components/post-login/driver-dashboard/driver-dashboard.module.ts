import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverDashboardRoutingModule } from './driver-dashboard-routing.module';
import { StatusToggleComponent } from './status-toggle/status-toggle.component';
import { CurrentTripComponent } from './current-trip/current-trip.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Add this line
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { TripReviewComponent } from './trip-review/trip-review.component';
@NgModule({
  declarations: [
    StatusToggleComponent,
    CurrentTripComponent,
    TripHistoryComponent,
    SettingsComponent,
    TripReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DriverDashboardRoutingModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule
  ]
})
export class DriverDashboardModule { }
