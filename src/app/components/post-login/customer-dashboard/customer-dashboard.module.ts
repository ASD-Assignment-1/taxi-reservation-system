import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { ReserveTaxiComponent } from './reserve-taxi/reserve-taxi.component';
import { AvailableDriversComponent } from './available-drivers/available-drivers.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ReserveTaxiComponent,
    AvailableDriversComponent,
    BookingHistoryComponent,
    SettingsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    FormsModule,
    GoogleMapsModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class CustomerDashboardModule { }
