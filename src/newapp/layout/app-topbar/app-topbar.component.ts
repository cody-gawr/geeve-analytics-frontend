import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment, { Moment, isMoment } from 'moment';
import {
  map,
  Subject,
  takeUntil,
  combineLatest,
  take,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { LayoutFacade } from '../facades/layout.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';
import _ from 'lodash';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss'],
})
export class AppTopbarComponent implements OnInit {
  @Input() toggleSideBar: () => void;
  @Input() isSidenavVisible: Boolean;
  @Input() activatedUrl: string;
  @ViewChild('multiClinicsSelectElem') multiSelectElement;
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  title: string;

  range = new FormGroup({
    start: new FormControl<Moment | null>(null),
    end: new FormControl<Moment | null>(null),
  });

  get enableAllClinics$() {
    return combineLatest([
      this.authFacade.rolesIndividual$,
      this.clinicFacade.clinics$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([rolesIndividual, totalClinics]) => {
        const userType = rolesIndividual ? rolesIndividual.type : 0;
        return (
          totalClinics.length > 1 &&
          ['/dashboards/healthscreen'].includes(this.activatedUrl) &&
          userType != 7
        );
      })
    );
  }

  get isMultiClinics$() {
    return combineLatest([
      this.authFacade.authUserData$,
      this.authFacade.rolesIndividual$,
      this.clinicFacade.clinics$,
    ]).pipe(
      filter(
        ([authUserData, rolesIndividual, clinics]) =>
          rolesIndividual !== null && clinics.length > 0
      ),
      map(data => {
        const [authUserData, rolesIndividual, clinics] = data;
        const result = authUserData ?? this.authFacade.getAuthUserData();
        return {
          multiClinicEnabled: {
            dash1Multi: result?.dash1Multi,
            dash2Multi: result?.dash2Multi,
            dash3Multi: result?.dash3Multi,
            dash4Multi: result?.dash4Multi,
            dash5Multi: result?.dash5Multi,
          },
          userType: rolesIndividual ? rolesIndividual.type : 0,
          totalClinicsLength: clinics.length,
        };
      }),
      map(({ multiClinicEnabled, userType, totalClinicsLength }) => {
        const value =
          totalClinicsLength > 1 &&
          ((this.activatedUrl == '/newapp/dashboard/cliniciananalysis' &&
            multiClinicEnabled.dash1Multi == 1) ||
            (this.activatedUrl == '/newapp/dashboard/clinicianproceedures' &&
              multiClinicEnabled.dash2Multi == 1) ||
            (this.activatedUrl == '/newapp/dashboard/frontdesk' &&
              multiClinicEnabled.dash3Multi == 1) ||
            (this.activatedUrl == '/newapp/dashboard/marketing' &&
              multiClinicEnabled.dash4Multi == 1) ||
            (this.activatedUrl == '/newapp/dashboard/finances' &&
              multiClinicEnabled.dash5Multi == 1)) &&
          ![4, 7].includes(userType);

        return value;
      })
    );
  }

  get isEnableDentistDropdown$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.authFacade.rolesIndividual$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([selectedClinics, roleData]) => {
        return (
          selectedClinics.length == 1 &&
          [2, 3, 5, 6, 7].indexOf(roleData?.type) >= 0 &&
          [
            '/newapp/dashboard/cliniciananalysis',
            '/newapp/dashboard/clinicianproceedures',
          ].includes(this.activatedUrl)
        );
      })
    );
  }

  get isDentistUser$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.authFacade.rolesIndividual$,
    ]).pipe(
      takeUntil(this.destroy$),
      map(([selectedClinics, roleData]) => {
        return (
          selectedClinics.length == 1 &&
          [2, 3, 5, 6, 7].indexOf(roleData?.type) < 0 &&
          [
            '/newapp/dashboard/cliniciananalysis',
            '/newapp/dashboard/clinicianproceedures',
          ].includes(this.activatedUrl)
        );
      })
    );
  }

  selectedClinic: 'all' | number | null = null;
  selectedMultiClinics: Array<'all' | number> = [];

  selectedDentist: 'all' | number | null = 'all';

  get clinics$() {
    return this.clinicFacade.clinics$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  get dentists$() {
    return this.dentistFacade.dentists$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  constructor(
    private layoutFacade: LayoutFacade,
    private dashboardFacade: DashboardFacade,
    private clinicFacade: ClinicFacade,
    private authFacade: AuthFacade,
    private dentistFacade: DentistFacade,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}

  setCookieVal(val: string) {
    this.cookieService.put('clinic_id', val);
    const values = this.cookieService.get('clinic_dentist')?.split('_');
    if (val && values) {
      values[0] = val;
      this.cookieService.put('clinic_dentist', values.join('_'));
    }
  }

  ngOnInit() {
    combineLatest([
      this.isEnableDentistDropdown$,
      this.clinicFacade.currentClinics$,
      this.isDentistUser$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(params => {
        const [isEnable, clinics, isDentistUser] = params;
        if (clinics.length > 0) {
          if (isEnable) {
            this.dentistFacade.loadDentists(clinics[0].id, 0);
          } else if (isDentistUser) {
            this.dentistFacade.loadSpecificDentist(clinics[0].id);
          }
        }
      });

    combineLatest([this.dentistFacade.dentistId$, this.isDentistUser$])
      .pipe(
        takeUntil(this.destroy$),
        filter(([dentistId, isDentistUser]) => dentistId && isDentistUser)
      )
      .subscribe(([dentistId]) => {
        this.dentistFacade.setCurrentDentistId(dentistId);
      });

    this.layoutFacade.activatedRouteTitle$
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => (this.title = v));

    this.layoutFacade.dateRange$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ start, end }) => {
        this.range.controls['start'].setValue(
          isMoment(start) ? start : moment(start)
        );
        this.range.controls['end'].setValue(isMoment(end) ? end : moment(end));
      });

    combineLatest([
      this.clinicFacade.currentClinics$,
      this.enableAllClinics$,
      this.clinicFacade.isMultiSelection$,
      this.clinicFacade.clinics$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(
          ([currentClinics, isEnableAll, isMulti, clinics]) =>
            clinics.length > 0 && isMulti !== null
        ),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(([currentClinics, isEnableAll, isMulti, clinics]) => {
        if (isMulti == null) return;
        const currentClinicIDs = currentClinics.map(c => c.id);
        if (isMulti) {
          if (currentClinicIDs == undefined) return;
          if (currentClinicIDs.length === clinics.length) {
            this.selectedMultiClinics = [...currentClinicIDs, 'all'];
            this.setCookieVal('all');
          } else {
            this.selectedMultiClinics = currentClinicIDs;
            const idList = currentClinicIDs.join(',');
            this.setCookieVal(idList);
          }
        } else {
          if (currentClinicIDs.length === 1) {
            this.selectedClinic = currentClinicIDs[0];
            const val = currentClinicIDs[0].toString();
            this.setCookieVal(val);
          } else if (currentClinicIDs.length == clinics.length && isEnableAll) {
            this.selectedClinic = 'all';
            this.setCookieVal('all');
          } else if (currentClinicIDs.length > 1 && !isEnableAll) {
            this.clinicFacade.setCurrentSingleClinicId(currentClinicIDs[0]);
          }
        }
      });

    this.clinicFacade.currentClinics$
      .pipe(
        takeUntil(this.destroy$),
        map(currentClinics => currentClinics.map(c => c.id)),
        distinctUntilChanged((prev, curr) => _.min(prev) == _.min(curr))
      )
      .subscribe(currentClinicIDs => {
        if (currentClinicIDs.length > 0) {
          this.dashboardFacade.loadClinicAccountingPlatform(
            _.min(currentClinicIDs)
          );
        }
      });

    this.dentistFacade.currentDentistId$
      .pipe(takeUntil(this.destroy$))
      .subscribe(dentistId => {
        this.selectedDentist = dentistId;
      });

    this.isMultiClinics$.subscribe((value: boolean) =>
      this.clinicFacade.setMultiClinicSelection(value)
    );
  }

  getClinicName$(clinicId: Array<number | 'all'>) {
    return this.clinicFacade.clinics$.pipe(
      takeUntil(this.destroy$),
      map(values => {
        if (clinicId.length > 1 && clinicId.includes('all'))
          return 'All Clinics';
        else return values.find(v => v.id == clinicId[0])?.clinicName || '';
      })
    );
  }

  onDateRangeChange(
    target: 'start' | 'end',
    event: MatDatepickerInputEvent<Moment>
  ) {
    if (target === 'end' && !!event.value) {
      this.layoutFacade.saveDateRange(
        this.range.controls['start'].value,
        event.value,
        'custom',
        1,
        this.range.controls['start'].value.date() ==
          this.range.controls['start'].value.clone().startOf('month').date() &&
          event.value.date() == event.value.clone().endOf('month').date()
      );

      this.layoutFacade.setTrend('off');
    }
  }

  onChangeCurrentClinic(event: MatSelectChange) {
    this.clinicFacade.setCurrentSingleClinicId(event.value);
    this.dentistFacade.setCurrentDentistId('all');
    this.layoutFacade.setTrend('off');
  }

  onChangeCurrentDentist(event: MatSelectChange) {
    this.dentistFacade.setCurrentDentistId(event.value);
  }

  previousSelectedMultiClinics: Array<number | 'all'> = null;

  onChangeMultiClinics(event: MatSelectChange) {
    this.clinicFacade.clinics$.pipe(take(1)).subscribe(clinics => {
      this.previousSelectedMultiClinics = this.selectedMultiClinics.slice();
      const clinicIDs = event.value;
      const isPrevAll =
        this.previousSelectedMultiClinics.filter(v => v !== 'all').length ===
        clinics.length;
      let currentMultiClinicIds: Array<'all' | number> = [];
      if (
        clinicIDs.length == clinics.length &&
        !clinicIDs.includes('all') &&
        isPrevAll
      ) {
        currentMultiClinicIds = [];
      } else if (
        (clinicIDs.length == clinics.length &&
          !clinicIDs.includes('all') &&
          !isPrevAll) ||
        (clinicIDs.includes('all') && !isPrevAll)
      ) {
        currentMultiClinicIds = [...clinics.map(c => c.id), 'all'];
      } else {
        const selectedClinicIDs = <number[]>clinicIDs.filter(c => c != 'all');
        currentMultiClinicIds = selectedClinicIDs;
      }
      this.selectedMultiClinics = currentMultiClinicIds;
    });
  }

  onApplyMultiClinics() {
    const values = <number[]>this.selectedMultiClinics.filter(v => v !== 'all');
    if (values.length > 0) {
      this.clinicFacade.setCurrentMultiClinicIDs(values);
      this.dentistFacade.setCurrentDentistId('all');
      this.layoutFacade.setTrend('off');
    } else {
      this.toastr.error('You must select one clinic at least!');
    }
    this.multiSelectElement.toggle();
  }

  onMultiSelectPanelOpened(event: MatSelectChange) {
    if (!event) {
      combineLatest([
        this.clinicFacade.currentClinics$,
        this.clinicFacade.isMultiSelection$,
        this.clinicFacade.clinics$,
      ])
        .pipe(take(1))
        .subscribe(([currentClinics, isMulti, clinics]) => {
          if (isMulti == null) return;
          const currentClinicIDs = currentClinics.map(c => c.id);
          if (isMulti) {
            if (currentClinicIDs == undefined) return;
            if (currentClinicIDs.length === clinics.length) {
              this.selectedMultiClinics = [...currentClinicIDs, 'all'];
            } else {
              this.selectedMultiClinics = currentClinicIDs;
            }
          }
        });
    }
  }
}
