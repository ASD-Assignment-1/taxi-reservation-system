import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { BookingOverviewComponent } from './booking-overview/booking-overview.component';
import { DriverManagementComponent } from './driver-management/driver-management.component';
import { ReportsComponent } from './reports/reports.component';
import { SystemSettingsComponent } from './system-settings/system-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    UserManagementComponent,
    BookingOverviewComponent,
    DriverManagementComponent,
    ReportsComponent,
    SystemSettingsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
