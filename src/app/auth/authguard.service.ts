   // AuthGuard
    import { MatSnackBar } from '@angular/material';
    import { Router } from '@angular/router';
    import { Injectable } from '@angular/core';
    import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from 
    '@angular/router';
    import { Location } from "@angular/common";
    import { Observable } from 'rxjs/Observable';
	import { CookieService } from "angular2-cookie/core";

  @Injectable()
  export class AuthGuard implements CanActivate {
  constructor(private router: Router,  private snackBar: MatSnackBar,private _cookieService: CookieService, private activatedRoute: Location ) {}
/**
  *Check if user is Authenticated
  *AUTHOR - Teq Mavens
  */
  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | 
  boolean { 
        if (this._cookieService.get("token")) {
          let urlActive = this.activatedRoute.path();
          console.log(urlActive);
          if(this._cookieService.get("stepper") && parseInt(this._cookieService.get("stepper"))  < 6 && urlActive != '/setup' && urlActive != '/login'){
            this.router.navigateByUrl('/login');
            //this.router.navigateByUrl('/setup');  
          } else {
              return true;
          }          
       } else {
           this.router.navigateByUrl('/login');
          //this.snackBar.open('Please Login to Continue');
       }
    }
}                                                                                             