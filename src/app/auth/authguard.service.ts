// AuthGuard
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { ClinicService } from '../clinic/clinic.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _cookieService: CookieService,
    private activatedRoute: Location,
    private clinicService: ClinicService
  ) {}
  /**
   *Check if user is Authenticated
   *AUTHOR - Teq Mavens
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let urlActive = this.activatedRoute.path();
    if (this._cookieService.get('is_logged_in') === 'YES') {
      const switchClinicId = state.root.paramMap['switchClinicId'];
        if (urlActive !== '/newapp/dashboard/unsubscribed') {
            let clinic_id = 0;
            let cid = parseInt(this._cookieService.get('clinic_id'));
            if(switchClinicId){
              // this._cookieService.put('clinic_id', val.switchClinicId);
              clinic_id = parseInt(switchClinicId);
            }else {
              let unsubscribedClinic: any = localStorage.getItem('unsubscribed_clinic');
              if(unsubscribedClinic && (!cid || cid === unsubscribedClinic.id)){
                unsubscribedClinic = JSON.parse(unsubscribedClinic);
                clinic_id = unsubscribedClinic?.id;
              }
            }

            if(clinic_id){
              this.clinicService.listClinics('jeeve_pay').subscribe({
                  next: (res2) => {
                    let isUnsubscribed = false, clinic;
                    if(res2?.body?.data){
                      clinic = res2.body.data.find(d => d.id === clinic_id);
                      if(clinic){
                        isUnsubscribed = !clinic.has_analytics_subscription;
                      }
                    }
                    if(isUnsubscribed){
                      localStorage.setItem('unsubscribed_clinic', JSON.stringify(clinic));
                      window.location.href = '/newapp/dashboard/unsubscribed';
                    }
                    // this.getRolesIndividual();
                  },
                  error: err => {

                  },
              });
            }

            // this.headerService.getClinic.subscribe(
            //   {
            //     next: res => {
            //       console.log(res)
            //         if(res.body.data?.findIndex(c => c.id === clinic_id) === -1){

            //         }
                  
            //     },
            //     error: () => {
            //       // this.warningMessage = "Please Provide Valid Inputs!";
            //     } 
            //   }
            // );
          }
      return true;
    }
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
