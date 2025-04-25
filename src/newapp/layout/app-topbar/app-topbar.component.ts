import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment, { Moment, isMoment } from 'moment';
import {
  map,
  Subject,
  BehaviorSubject,
  Observable,
  takeUntil,
  combineLatest,
  take,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { LayoutFacade } from '../facades/layout.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { AuthFacade } from '@/newapp/auth/facades/auth.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';
import _ from 'lodash';
import { MatSelectChange } from '@angular/material/select';
import { Clinic } from '@/newapp/models/clinic';
import { Router } from '@angular/router';
import { CampaignFacade } from '@/newapp/campaigns/facades/campaign.facade';
import { ICampaign } from '@/newapp/campaigns/services/campaign.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss'],
})
export class AppTopbarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() toggleSideBar: () => void;
  @Input() isSidenavVisible: Boolean;
  @Input() activatedUrl: string;
  @ViewChild('multiClinicsSelectElem') multiSelectElement;
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  public title: string;
  public activatedRoute = new BehaviorSubject<string>('');
  public activatedRoute$: Observable<string> = this.activatedRoute.asObservable();
  public unsubscribedClinic: Clinic = null;

  range = new FormGroup({
    start: new FormControl<Moment | null>(null),
    end: new FormControl<Moment | null>(null),
  });

  get enableAllClinics$() {
    return combineLatest([
      this.authFacade.rolesIndividual$,
      this.clinicFacade.clinics$,
      this.activatedRoute$,
    ]).pipe(
      map(([rolesIndividual, totalClinics, activatedRoute]) => {
        const userType = rolesIndividual ? rolesIndividual.type : 0;
        return (
          totalClinics?.length > 1 &&
          ['/dashboards/healthscreen'].includes(activatedRoute) &&
          userType != 7
        );
      }),
    );
  }

  get isEnableDentistDropdown$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.authFacade.rolesIndividual$,
      this.activatedRoute$,
    ]).pipe(
      map(([selectedClinics, roleData, activatedRoute]) => {
        return (
          selectedClinics.length == 1 &&
          [2, 3, 5, 6, 7].indexOf(roleData?.type) >= 0 &&
          [
            '/newapp/dashboard/cliniciananalysis',
            '/newapp/dashboard/clinicianproceedures',
          ].includes(activatedRoute)
        );
      }),
    );
  }

  get isDentistUser$() {
    return combineLatest([
      this.clinicFacade.currentClinics$,
      this.authFacade.rolesIndividual$,
      this.activatedRoute$,
    ]).pipe(
      map(([selectedClinics, roleData, activatedRoute]) => {
        return (
          selectedClinics.length == 1 &&
          [2, 3, 5, 6, 7].indexOf(roleData?.type) < 0 &&
          [
            '/newapp/dashboard/cliniciananalysis',
            '/newapp/dashboard/clinicianproceedures',
          ].includes(activatedRoute)
        );
      }),
    );
  }

  get isMultiClinics$() {
    return this.clinicFacade.isMultiSelection$;
  }

  // Following variables should be public.
  selectedClinic: Clinic | null = null;
  selectedClinicId: 'all' | number | null = null;
  selectedMultiClinics: Array<'all' | number> = [];

  selectedDentist: 'all' | number | null = 'all';

  get clinics$() {
    return this.clinicFacade.clinics$;
  }

  get dentists$() {
    return this.dentistFacade.dentists$;
  }

  get hideDatePicker$() {
    return this.layoutFacade.hideDatePicker$;
  }

  get hideClinicSelectionDropdown$() {
    return this.layoutFacade.hideClinicSelectionDropdown$;
  }

  get campaignName$(): Observable<string | null> {
    return this.campaignFacade.campaign$.pipe(
      map(campaign => (campaign ? campaign.description : null)),
    );
  }

  paths$ = this.layoutFacade.paths$;

  constructor(
    private readonly layoutFacade: LayoutFacade,
    private readonly clinicFacade: ClinicFacade,
    private authFacade: AuthFacade,
    private dentistFacade: DentistFacade,
    private readonly campaignFacade: CampaignFacade,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    if (router.url === '/newapp/dashboard/unsubscribed') {
      const clinicStr = localStorage.getItem('unsubscribed_clinic');
      this.unsubscribedClinic = clinicStr && JSON.parse(clinicStr);
    } else {
      this.unsubscribedClinic = null;
    }
  }

  setCookieVal(val: string) {
    const values = this.cookieService.get('clinic_dentist')?.split('_');
    if (val && values) {
      values[0] = val;
      this.cookieService.put('clinic_dentist', values.join('_'));
    }
  }

  ngOnInit() {
    combineLatest([
      this.authFacade.authUserData$,
      this.authFacade.rolesIndividual$,
      this.clinicFacade.clinics$,
      this.activatedRoute$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(([, rolesIndividual, clinics]) => rolesIndividual !== null && clinics?.length > 0),
        map(data => {
          const [authUserData, rolesIndividual, clinics, activatedRoute] = data;

          return {
            multiClinicEnabled: {
              dash1Multi: authUserData?.dash1Multi,
              dash2Multi: authUserData?.dash2Multi,
              dash3Multi: authUserData?.dash3Multi,
              dash4Multi: authUserData?.dash4Multi,
              dash5Multi: authUserData?.dash5Multi,
            },
            userType: rolesIndividual ? rolesIndividual.type : 0,
            totalClinicsLength: clinics?.length,
            activatedRoute,
          };
        }),
      )
      .subscribe(({ multiClinicEnabled, userType, totalClinicsLength, activatedRoute }) => {
        const value =
          totalClinicsLength > 1 &&
          ((activatedRoute == '/newapp/dashboard/cliniciananalysis' &&
            multiClinicEnabled.dash1Multi == 1) ||
            (activatedRoute == '/newapp/dashboard/clinicianproceedures' &&
              multiClinicEnabled.dash2Multi == 1) ||
            (activatedRoute == '/newapp/dashboard/frontdesk' &&
              multiClinicEnabled.dash3Multi == 1) ||
            (activatedRoute == '/newapp/dashboard/marketing' &&
              multiClinicEnabled.dash4Multi == 1) ||
            (activatedRoute == '/newapp/dashboard/finances' &&
              multiClinicEnabled.dash5Multi == 1)) &&
          ![4, 7].includes(userType);

        this.clinicFacade.setMultiClinicSelection(value);
      });

    combineLatest([
      this.isEnableDentistDropdown$,
      this.clinicFacade.currentClinics$,
      this.isDentistUser$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
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
        filter(([dentistId, isDentistUser]) => dentistId && isDentistUser),
      )
      .subscribe(([dentistId]) => {
        this.dentistFacade.setCurrentDentistId(dentistId);
      });

    this.layoutFacade.activatedRouteTitle$
      .pipe(takeUntil(this.destroy$))
      .subscribe(v => (this.title = v));

    this.layoutFacade.dateRange$.pipe(takeUntil(this.destroy$)).subscribe(({ start, end }) => {
      this.range.controls['start'].setValue(isMoment(start) ? start : moment(start));
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
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
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
            this.selectedClinic = currentClinics[0];
            this.selectedClinicId = currentClinicIDs[0];
            const val = currentClinicIDs[0].toString();
            this.setCookieVal(val);
          } else if (currentClinicIDs.length == clinics.length && isEnableAll) {
            this.selectedClinicId = 'all';
            this.setCookieVal('all');
          } else if (currentClinicIDs.length > 1 && !isEnableAll) {
            this.clinicFacade.setCurrentSingleClinicId(currentClinicIDs[0]);
          }
        }
      });

    this.clinicFacade.currentClinics$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => _.min(prev.map(p => p.id)) == _.min(curr.map(c => c.id)),
        ),
      )
      .subscribe(currentClinicIDs => {
        if (currentClinicIDs.length > 0) {
          const clinic = currentClinicIDs.find(
            cu => cu.id === _.min(currentClinicIDs.map(c => c.id)),
          );
          this.clinicFacade.loadClinicAccountingPlatform(clinic.id, clinic.connectedwith);
        }
      });

    this.dentistFacade.currentDentistId$.pipe(takeUntil(this.destroy$)).subscribe(dentistId => {
      this.selectedDentist = dentistId;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.activatedUrl) {
      this.activatedRoute.next(changes.activatedUrl.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  getClinicName$(clinicId: Array<number | 'all'>) {
    return this.clinicFacade.clinics$.pipe(
      map(values => {
        if (clinicId.length > 1 && clinicId.includes('all')) return 'All Clinics';
        else return values.find(v => v.id == clinicId[0])?.clinicName || '';
      }),
    );
  }

  onDateRangeChange(target: 'start' | 'end', event: MatDatepickerInputEvent<Moment>) {
    if (target === 'end' && !!event.value) {
      this.layoutFacade.saveDateRange(
        this.range.controls['start'].value,
        event.value,
        'custom',
        1,
        // this.range.controls['start'].value.date() ==
        //   this.range.controls['start'].value.clone().startOf('month').date() &&
        //   event.value.date() == event.value.clone().endOf('month').date()
      );

      this.layoutFacade.setTrend('off');
    }
  }

  onChangeCurrentClinic(event: MatSelectChange) {
    this.clinicFacade.setCurrentSingleClinicId(event.value);
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
        this.previousSelectedMultiClinics.filter(v => v !== 'all').length === clinics.length;
      let currentMultiClinicIds: Array<'all' | number> = [];
      if (clinicIDs.length == clinics.length && !clinicIDs.includes('all') && isPrevAll) {
        currentMultiClinicIds = [];
      } else if (
        (clinicIDs.length == clinics.length && !clinicIDs.includes('all') && !isPrevAll) ||
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
