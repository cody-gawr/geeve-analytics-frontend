import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { map, Observable, Subject, takeUntil, combineLatest } from 'rxjs';
import { LayoutFacade } from '../facades/layout.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss']
})
export class AppTopbarComponent implements OnInit {
  @Input() toggleSideBar: () => void;
  @Input() isSidenavVisible: Boolean;
  @Input() activatedUrl: string;
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  title: string;

  range = new FormGroup({
    start: new FormControl<Moment | null>(null),
    end: new FormControl<Moment | null>(null),
  });

  get isMultiClinics$() {
    return combineLatest([
      this.authFacade.authUserData$, 
      this.authFacade.rolesIndividual$
    ]).pipe(
      takeUntil(this.destroy$),
      map((data) => {
        const [authUserData, rolesIndividual] = data;
        return {
          multiClinicEnabled: (authUserData??this.authFacade.getAuthUserData()).multiClinicEnabled, 
          userType: rolesIndividual?rolesIndividual.type:0
        }
      }),
      map( ({multiClinicEnabled, userType}) => {
        return (
          (['/dashboards/clinicianproceedures', '/dashboards/finances'].includes(
            this.activatedUrl
          ) &&
            [4, 7].indexOf(userType) < 0 &&
            multiClinicEnabled == 1) ||
          ([
            '/dashboards/cliniciananalysis',
            '/dashboards/clinicianproceedures',
            '/dashboards/finances',
            '/dashboards/marketing',
            '/dashboards/frontdesk'
          ].includes(this.activatedUrl) &&
            [4, 7].indexOf(userType) < 0 &&
            multiClinicEnabled == 1)
        );
      })
    );
  };

  selectedClinic: 'all' | number | null = null;

  constructor(
    // private menuService: MenuService,
    private layoutFacade: LayoutFacade,
    // private dentistFacade: DentistFacade,
    private dashboardFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private authFacade: AuthFacade,
  ) {
    // this.dentistFacade.loadDentists();
    // this.menuService.menuSource$
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     map((menu) => menu.key),
    //   )
    //   .subscribe((v) => {this.title = v});
    this.layoutFacade.activatedRouteTitle$.pipe(
      takeUntil(this.destroy$),
    ).subscribe( v => (this.title = v));

    this.layoutFacade.dateRange$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(({start, end}) => {
      this.range.controls['start'].setValue(start);
      this.range.controls['end'].setValue(end);
    });

    this.clinicFacade.currentClinicId$.pipe(takeUntil(this.destroy$)).subscribe(c => {
      if(typeof c != 'string') {
        this.selectedClinic = c;
        
      }else{
        this.selectedClinic = 'all';
      }

      this.dashboardFacade.loadClinicAccountingPlatform(c);
    });

    this.clinicFacade.clinics$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((clinics) => {
        console.log(clinics);
    });
  }

  ngOnInit() {}

  get clinics$() {
    return this.clinicFacade.clinics$;
  }

  // get dentists$() {
  //   return this.dentistFacade.dentists$;
  // }

  onDateRangeChange(target: 'start' | 'end', event: MatDatepickerInputEvent<Moment>) {
    if(target === 'start'){
      this.range.controls['start'].setValue(event.value);
    }else if(event.value){
      this.layoutFacade.saveDateRange(this.range.controls['start'].value, event.value, 'custom');
    }
  }

  onChangeCurrentClinic(event) {
    if(event.value != 'all'){
      this.clinicFacade.setCurrentClinicId(event.value);
    }else{
      this.clinics$.pipe(takeUntil(this.destroy$)).subscribe(
        v => {
          this.clinicFacade.setCurrentClinicId(v.map(c => c.id).join(','));
        }
      );
    }
  }
}
