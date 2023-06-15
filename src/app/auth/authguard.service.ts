// AuthGuard
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private _cookieService: CookieService,
    private activatedRoute: Location
  ) {}
  /**
   *Check if user is Authenticated
   *AUTHOR - Teq Mavens
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._cookieService.get('userid')) {
      let urlActive = this.activatedRoute.path();
      if (
        this._cookieService.get('stepper') &&
        parseInt(this._cookieService.get('stepper')) < 4 &&
        urlActive != '/setup' &&
        urlActive != '/login'
      ) {
        this.router.navigateByUrl('/login');
        //this.router.navigateByUrl('/setup');
      } else {
        return true;
      }

      // return true;
    } else {
      this.router.navigateByUrl('/login');
      //this.snackBar.open('Please Login to Continue');
    }
  }
}
