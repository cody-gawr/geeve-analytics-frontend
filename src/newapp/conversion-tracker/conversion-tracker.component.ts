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
  mergeMap,
  startWith,
  shareReplay,
} from 'rxjs';
import { ClinicFacade } from '../clinic/facades/clinic.facade';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ConversionTrackerFacade } from './facades/conversion-tracker.facade';
import { ConversionCode, ConversionTracker } from '../models/conversion-tracker';
import { LayoutFacade } from '../layout/facades/layout.facade';
import { DentistFacade } from '../dentist/facades/dentists.facade';
import moment from 'moment';
import { TreatmentStatus } from '../enums/treatment-status.enum';
import { UpdateConversionCodeValuesDialogComponent } from './update-conversion-code-values-dialog/update-conversion-code-values-dialog.component';
import { AuthFacade } from '../auth/facades/auth.facade';
import { validatePermission } from '../shared/helpers/validatePermission.helper';
import { CONSULTANT, USER_MASTER } from '../constants';

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
  @ViewChild('conversionCodeSelect') conversionCodeSelect!: MatSelect;
  conversionCodes: ConversionCode[] = [];
  conversionCodeForm: FormGroup = new FormGroup({
    selectedConversionCode: new FormControl<number | null>(null),
    newConsultCode: new FormControl<string | null>(null),
  });

  conversionTrackerCollections: {
    consult: ConversionTracker[];
    recommended: ConversionTracker[];
    preTreatment: ConversionTracker[];
    inTreatment: ConversionTracker[];
    completed: ConversionTracker[];
    notSuitable: ConversionTracker[];
    declined: ConversionTracker[];
  } = {
    consult: [],
    recommended: [],
    preTreatment: [],
    inTreatment: [],
    completed: [],
    notSuitable: [],
    declined: [],
  };

  get selectedConversionCode$(): Observable<ConversionCode> {
    return this.conversionTrackerFacade.selectedConversionCode$;
  }

  get selectedConsultCode$(): Observable<string> {
    return this.selectedConversionCode$.pipe(map(c => c?.consultCode ?? ''));
  }

  get isCreatingConversionCode$(): Observable<boolean> {
    return this.conversionTrackerFacade.isCreatingConversionCode$;
  }

  constructor(
    public dialog: MatDialog,
    private clinicFacade: ClinicFacade,
    private dentistFacade: DentistFacade,
    private layoutFacade: LayoutFacade,
    private notifier: NotificationService,
    private conversionTrackerFacade: ConversionTrackerFacade,
    private authFacade: AuthFacade,
  ) {}

  ngOnInit() {
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
      });
    this.conversionTrackerFacade.conversionCodes$
      .pipe(takeUntil(this.destroy$))
      .subscribe(conversionCodes => {
        this.conversionCodes = conversionCodes;
        console.log({ conversionCodes });
        if (conversionCodes.length > 0) {
          this.conversionTrackerFacade.selectConversionCode(conversionCodes[0].recordId);
        }
      });

    combineLatest([
      this.clinicFacade.currentClinicId$,
      this.dentistFacade.currentDentistId$,
      this.layoutFacade.dateRange$,
      this.selectedConversionCode$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        filter(payload => payload.every(item => !!item)),
      )
      .subscribe(payload => {
        const [clinicId, providerId, { start, end }, { consultCode }] = payload;

        this.conversionTrackerFacade.loadConversionTrackers({
          clinicId: <number>clinicId,
          providerId: providerId === 'all' ? 0 : <number>providerId,
          startDate: moment(start).format('YYYY-MM-DD'),
          endDate: moment(end).format('YYYY-MM-DD'),
          consultCode,
        });
      });

    this.selectedConversionCode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(conversionCode =>
        this.conversionCodeForm.get('selectedConversionCode').setValue(conversionCode.recordId),
      );

    this.conversionTrackerFacade.conversionTrackers$.subscribe(conversionTrackers => {
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
    const newConsultCode = this.conversionCodeForm.get('newConsultCode')?.value;
    if (!newConsultCode) {
      return;
    }

    if (this.conversionCodes.map(c => c.consultCode).includes(newConsultCode)) {
      this.notifier.showError('Conversion code already exists!');
      return;
    }

    this.conversionTrackerFacade.createConversionCode(this.clinicId, newConsultCode);
  }

  onUpdateConversionCode(conversionCode: ConversionCode) {
    this.dialog.open(UpdateConversionCodeValuesDialogComponent, {
      data: conversionCode,
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
