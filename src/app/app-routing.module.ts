import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pre-login',
    loadChildren: () => import('./components/pre-login/pre-login.module').then(m => m.PreLoginModule)
  },
  {
    path: 'post-login',
    loadChildren: () => import('./components/post-login/post-login.module').then(m => m.PostLoginModule)
  },
  { path: '', redirectTo: 'pre-login/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'pre-login/login' }  // wildcard for undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
