import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { map, Observable, Subject, takeUntil, combineLatest } from 'rxjs';
import { LayoutFacade } from '../facades/layout.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { Clinic } from '@/newapp/models/clinic';

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

  get enableAllClinics$(){
    return this.authFacade.rolesIndividual$.pipe(
      takeUntil(this.destroy$),
      map(rolesIndividual => {
        const userType = rolesIndividual?rolesIndividual.type:0;
        return ['/dashboards/healthscreen'].includes(
                this.activatedUrl
              ) && userType != 7
      })
    )
  }

  get isMultiClinics$() {
    return combineLatest([
      this.authFacade.authUserData$, 
      this.authFacade.rolesIndividual$
    ]).pipe(
      map((data) => {
        const [authUserData, rolesIndividual] = data;
        const result = authUserData??this.authFacade.getAuthUserData();
        return {
          multiClinicEnabled: {
            dash1Multi: result?.dash1Multi,
            dash2Multi: result?.dash2Multi,
            dash3Multi: result?.dash3Multi,
            dash4Multi: result?.dash4Multi,
            dash5Multi: result?.dash5Multi,
          }, 
          userType: rolesIndividual?rolesIndividual.type:0
        }
      }),
      map( ({multiClinicEnabled, userType}) => {
        const value = (
          (this.activatedUrl == '/newapp/dashboard/cliniciananalysis' && multiClinicEnabled.dash1Multi == 1) ||
          (this.activatedUrl == '/newapp/dashboard/clinicianproceedures' && multiClinicEnabled.dash2Multi == 1) ||
          (this.activatedUrl == '/newapp/dashboard/frontdesk' && multiClinicEnabled.dash3Multi == 1) ||
          (this.activatedUrl == '/newapp/dashboard/marketing' && multiClinicEnabled.dash4Multi == 1) ||
          (this.activatedUrl == '/newapp/dashboard/finances' && multiClinicEnabled.dash5Multi == 1)
        ) && ![4, 7].includes(userType);
        this.clinicFacade.setMultiClinicSelection(value);
        return value;
      })
    );
  }

  selectedClinic: 'all' | number | null = null;
  selectedMultiClinics: Array<'all' | number> = [];

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

    combineLatest([
      this.clinicFacade.currentClinics$,
      this.enableAllClinics$,
      this.clinicFacade.isMultiSelection$,
      this.clinicFacade.clinics$
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(([currentClinics, isEnableAll, isMulti, clinics]) => {
        if(isMulti == null) return;
        const currentClinicIDs = currentClinics.map(c => c.id);
        if(isMulti) {
          if(currentClinicIDs == undefined) return;
          if(currentClinicIDs.length === clinics.length){
            this.selectedMultiClinics = [...currentClinicIDs, 'all']
          }else{
            this.selectedMultiClinics = currentClinicIDs;
          }
        }else{
          if(currentClinicIDs.length === 1){
            this.selectedClinic = currentClinicIDs[0];
            this.dashboardFacade.loadClinicAccountingPlatform(currentClinicIDs[0]);
          }else if(currentClinicIDs.length == clinics.length && isEnableAll) {
            this.selectedClinic = 'all';
          }else {
            this.selectedClinic = null;
          }
          
        }
    });
  }

  ngOnInit() {}

  get clinics$() {
    return this.clinicFacade.clinics$;
  }

  getClinicName$(clinicId: number | null) {
    return this.clinicFacade.clinics$.pipe(
      takeUntil(this.destroy$),
      map(
        values => values.find(v => v.id==clinicId)?.clinicName || ''
    ));
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
    this.clinicFacade.setCurrentSingleClinicId(event.value);
  }

  onChangeMultiClinics(event) {
    const isPrevAll = this.selectedMultiClinics.includes('all');
    this.clinicFacade.setCurrentMultiClinicIDs(event.value, isPrevAll);
  }
}
