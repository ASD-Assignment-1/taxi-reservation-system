import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: 'customer-dashboard',
    loadChildren: () =>
      import('./customer-dashboard/customer-dashboard.module').then(
        (m) => m.CustomerDashboardModule
      ),
  },
  {
    path: 'driver-dashboard',
    loadChildren: () =>
      import('./driver-dashboard/driver-dashboard.module').then(
        (m) => m.DriverDashboardModule
      ),
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostLoginRoutingModule {}
