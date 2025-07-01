import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StartCampaignDialogComponent } from '../shared/components/start-campaign-dialog/start-campaign-dialog.component';
import {
  distinctUntilChanged,
  map,
  filter,
  Subject,
  takeUntil,
  Observable,
  combineLatest,
  startWith,
  shareReplay,
  take,
  withLatestFrom,
} from 'rxjs';
import { ClinicFacade } from '../clinic/facades/clinic.facade';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ConversionTrackerFacade } from './facades/conversion-tracker.facade';
import {
  ConversionCode,
  ConversionCodeDialogData,
  ConversionTrackerRecord,
  Kpi,
} from '../models/conversion-tracker';
import { LayoutFacade } from '../layout/facades/layout.facade';
import { DentistFacade } from '../dentist/facades/dentists.facade';
import moment from 'moment';
import { TreatmentStatus } from '../enums/treatment-status.enum';
import { UpsertConversionCodeValuesDialogComponent } from './update-conversion-code-values-dialog/upsert-conversion-code-values-dialog.component';
import { AuthFacade } from '../auth/facades/auth.facade';
import { validatePermission } from '../shared/helpers/validatePermission.helper';
import { CONSULTANT, USER_MASTER } from '../constants';
import { Dentist } from '../models/dentist';

@Component({
  selector: 'app-conversion-tracker',
  templateUrl: './conversion-tracker.component.html',
  styleUrls: ['./conversion-tracker.component.scss'],
})
export class ConversionTrackerComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  clinicId: number = 0;
  clinicName: string = '';
  isDentistMode: boolean;
  dentists: Dentist[] = [];
  @ViewChild('conversionCodeSelect') conversionCodeSelect!: MatSelect;
  conversionCodes: ConversionCode[] = [];
  conversionCodeForm: FormGroup = new FormGroup({
    selectedConversionCode: new FormControl<number | null>(null),
    newConsultCode: new FormControl<string | null>(null),
  });

  conversionTrackerCollections: {
    consult: ConversionTrackerRecord[];
    recommended: ConversionTrackerRecord[];
    preTreatment: ConversionTrackerRecord[];
    inTreatment: ConversionTrackerRecord[];
    completed: ConversionTrackerRecord[];
    notSuitable: ConversionTrackerRecord[];
    declined: ConversionTrackerRecord[];
  } = {
    consult: [],
    recommended: [],
    preTreatment: [],
    inTreatment: [],
    completed: [],
    notSuitable: [],
    declined: [],
  };

  metricMetadata = [
    {
      type: 'Total Consult',
      icon: 'people',
      description: 'Total Consult',
    },
    {
      type: 'Conversion Rate',
      icon: 'trending_up',
      description: 'Conversion Rate',
    },
    {
      type: 'Avg Time to Conversion',
      icon: 'schedule',
      description: 'Avg Time to Conversion',
    },
  ] as const;

  conversionTrackerMetrics: ({ type: string; icon: string; description: string } & Kpi)[] = [];

  get selectedConversionCode$(): Observable<ConversionCode | null> {
    return this.conversionTrackerFacade.selectedConversionCode$;
  }

  get selectedConsultCode$(): Observable<string> {
    return this.selectedConversionCode$.pipe(map(c => c?.consultCode ?? ''));
  }

  get isCreatingConversionCode$(): Observable<boolean> {
    return this.conversionTrackerFacade.isCreatingConversionCode$;
  }

  get conversionTrackerMetrics$() {
    return this.conversionTrackerFacade.conversionTrackerMetrics$.pipe(
      filter(v => !!v),
      map(metrics =>
        metrics.map(m => {
          const { type, currentValue, currentUnit, deltaValue, deltaUnit } = m;
          const meta = this.metricMetadata.find(meta => meta.type === type);

          return {
            currentValue,
            currentUnit,
            deltaValue,
            deltaUnit,
            ...meta,
          };
        }),
      ),
    );
  }

  constructor(
    public dialog: MatDialog,
    private clinicFacade: ClinicFacade,
    private dentistFacade: DentistFacade,
    private layoutFacade: LayoutFacade,
    private conversionTrackerFacade: ConversionTrackerFacade,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit() {
    combineLatest([this.dentistFacade.isDentistMode$, this.dentistFacade.dentists$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isDentistMode, dentists]) => {
        this.isDentistMode = isDentistMode;
        if (!isDentistMode) {
          this.dentists = dentists;
        }
      });
    this.clinicFacade.currentClinics$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        filter(clinics => !!clinics && clinics.length > 0),
        map(clinics => clinics[0]),
      )
      .subscribe(clinic => {
        this.clinicId = clinic.id;
        this.clinicName = clinic.clinicName;
        this.conversionTrackerFacade.loadConversionCodes(this.clinicId);
        this.conversionTrackerFacade.loadConversionTrackerMetrics(this.clinicId);
      });
    this.conversionTrackerFacade.conversionCodes$
      .pipe(takeUntil(this.destroy$))
      .subscribe(conversionCodes => {
        this.conversionCodes = conversionCodes;

        if (conversionCodes.length > 0) {
          this.conversionTrackerFacade.selectConversionCode(conversionCodes[0].recordId);
        }
      });

    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.dentistFacade.currentDentistId$,
      this.layoutFacade.dateRange$,
      this.selectedConversionCode$,
      this.hasPermission$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        filter(
          ([clinicId, providerId, { start, end }, conversionCode]) =>
            typeof clinicId === 'number' &&
            (typeof providerId === 'number' || providerId === 'all') &&
            !!start &&
            !!end &&
            !!conversionCode,
        ),
      )
      .subscribe(payload => {
        const [clinicId, providerId, { start, end }, { consultCode }, hasPermission] = payload;
        console.log(hasPermission);
        if (hasPermission) {
          this.conversionTrackerFacade.loadConversionTrackers({
            clinicId: <number>clinicId,
            providerId: providerId === 'all' ? 0 : <number>providerId,
            startDate: moment(start).format('YYYY-MM-DD'),
            endDate: moment(end).format('YYYY-MM-DD'),
            consultCode,
          });
        } else {
          this.layoutFacade.showClinicSelection(false);
          this.layoutFacade.showDentistSelection(false);
        }
      });

    this.conversionTrackerMetrics$.subscribe(metrics => (this.conversionTrackerMetrics = metrics));

    this.selectedConversionCode$
      .pipe(
        takeUntil(this.destroy$),
        filter(conversionCode => !!conversionCode),
      )
      .subscribe(conversionCode =>
        this.conversionCodeForm.get('selectedConversionCode').setValue(conversionCode.recordId),
      );

    this.conversionTrackerFacade.conversionTrackers$.subscribe(_conversionTrackers => {
      const conversionTrackers = _conversionTrackers.map(ct => {
        let record: ConversionTrackerRecord = ct;
        if (!this.isDentistMode) {
          record = {
            ...record,
            providerName: this.dentists.find(d => d.providerId === ct.providerId)?.name ?? '',
          };
        }

        return record;
      });

      this.conversionTrackerCollections.consult = conversionTrackers.filter(
        item => item.treatmentStatus === TreatmentStatus.Consult,
      );
      this.conversionTrackerCollections.recommended = conversionTrackers.filter(
        item => item.treatmentStatus === TreatmentStatus.Recommended,
      );
      this.conversionTrackerCollections.preTreatment = conversionTrackers.filter(
        item => item.treatmentStatus === TreatmentStatus.PreTreatment,
      );
      this.conversionTrackerCollections.inTreatment = conversionTrackers.filter(
        item => item.treatmentStatus === TreatmentStatus.InTreatment,
      );
      this.conversionTrackerCollections.completed = conversionTrackers.filter(
        item => item.treatmentStatus === TreatmentStatus.Completed,
      );
      this.conversionTrackerCollections.notSuitable = conversionTrackers.filter(
        item => item.treatmentStatus === TreatmentStatus.NotSuitable,
      );
      this.conversionTrackerCollections.declined = conversionTrackers.filter(
        item => item.treatmentStatus === TreatmentStatus.Declined,
      );
    });

    this.conversionTrackerFacade.createConversionCodeSuccess$
      .pipe(
        takeUntil(this.destroy$),
        filter(conversionCode => !!conversionCode),
      )
      .subscribe(_ => {
        this.conversionCodeForm.get('newConsultCode')?.reset();
        // ✅ Auto-close dropdown
        this.conversionCodeSelect.close();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  get hasPermission$(): Observable<boolean | null> {
    return this.authFacade.rolesIndividual$.pipe(
      filter(payload => !!payload),
      map(
        ({ data: permissions, type: userType }) =>
          validatePermission(permissions, 'conversionTracker') ||
          [USER_MASTER, CONSULTANT].indexOf(userType) >= 0,
      ),
      startWith<boolean | null>(null),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  onStartCampaign() {
    this.dialog.open(StartCampaignDialogComponent, {
      data: {
        sms_text: 'Hello, this is a test message.',
        patients: [
          {
            patient_name: 'John Doe',
            mobile: '1234567890',
          },
        ],
        clinicId: this.clinicId,
        clinicName: this.clinicName,
        campaignId: 1,
        resend: true,
      },
    });
  }

  onAddConversionCode() {
    const data: ConversionCodeDialogData = {
      mode: 'Create',
    };
    const dialogRef = this.dialog.open(UpsertConversionCodeValuesDialogComponent, {
      width: '600px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (!result) {
          return;
        }

        const { conversionCode } = result;
        this.conversionTrackerFacade.upsertConversionCode(this.clinicId, conversionCode);
      });
  }

  onUpdateConversionCode(conversionCode: ConversionCode) {
    const data: ConversionCodeDialogData = {
      mode: 'Update',
      conversionCode,
    };
    const dialogRef = this.dialog.open(UpsertConversionCodeValuesDialogComponent, {
      width: '600px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (!result) {
          return;
        }

        const { conversionCode } = result;
        this.conversionTrackerFacade.upsertConversionCode(this.clinicId, conversionCode);
      });
  }

  onDeleteConversionCode(conversionCode: ConversionCode) {
    const { clinicId, recordId } = conversionCode;
    this.conversionTrackerFacade.deleteConversionCode(clinicId, recordId);
  }

  onConversionCodeSelected(event: MatSelectChange) {
    this.conversionTrackerFacade.selectConversionCode(event.value);
  }
}
