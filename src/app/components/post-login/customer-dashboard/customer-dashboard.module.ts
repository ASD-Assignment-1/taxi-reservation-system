import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { ReserveTaxiComponent } from './reserve-taxi/reserve-taxi.component';
import { AvailableDriversComponent } from './available-drivers/available-drivers.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';


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
    CustomerDashboardRoutingModule
  ]
})
export class CustomerDashboardModule { }
