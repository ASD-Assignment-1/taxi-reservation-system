import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch  {
  constructor(private router: Router, private service: StorageService) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    const isAuthenticated = true;
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return isAuthenticated;
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   const session = this.service.getSession();

   
  //   if (state.url === '/' || state.url === '/redeem/') {
  //     if (session) {
  //       this.router.navigate(['./post-login/dashboard']);
  //       return false;
  //     }
  //   } else {
  //     if (!session && state.url.includes('post-login')) {
  //       this.router.navigate(['..']);
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   const session = this.service.getSession();

  //   if (currentState.url == '/post-login/dashboard') {
  //     return session == null;
  //   }

  //   return true;
  // }
}
