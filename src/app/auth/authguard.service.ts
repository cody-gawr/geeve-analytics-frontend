   // AuthGuard
    import { MatSnackBar } from '@angular/material';
    import { Router } from '@angular/router';
    import { Injectable } from '@angular/core';
    import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from 
    '@angular/router';
    import { Observable } from 'rxjs/Observable';
	import { CookieService } from "angular2-cookie/core";

  @Injectable()
  export class AuthGuard implements CanActivate {
  constructor(private router: Router,  private snackBar: MatSnackBar,private _cookieService: CookieService) {}

  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | 
  boolean { 
        if (this._cookieService.get("token")) {
            return true;
       } else {
           this.router.navigateByUrl('/login');
          //this.snackBar.open('Please Login to Continue');
       }
    }
}                                                                                             