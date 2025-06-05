import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConversionRecord } from './conversion-table/conversion-table.component';
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
    selectedConversionCode: new FormControl<string | null>(null),
    newConversionCode: new FormControl<string | null>(null),
  });

  conversionTrackerCollections: {
    consult: ConversionTracker[];
    recommended: ConversionTracker[];
    notSuitable: ConversionTracker[];
    declined: ConversionTracker[];
  } = {
    consult: [],
    recommended: [],
    notSuitable: [],
    declined: [],
  };

  get selectedConversionCode$(): Observable<ConversionCode> {
    return this.conversionTrackerFacade.selectedConversionCode$;
  }

  constructor(
    public dialog: MatDialog,
    private clinicFacade: ClinicFacade,
    private dentistFacade: DentistFacade,
    private layoutFacade: LayoutFacade,
    private notifier: NotificationService,
    private conversionTrackerFacade: ConversionTrackerFacade,
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
      .subscribe(conversionCodes => (this.conversionCodes = conversionCodes));

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

    this.conversionTrackerFacade.conversionTrackers$.subscribe(conversionTrackers => {
      console.log(conversionTrackers);
      this.conversionTrackerCollections.consult = conversionTrackers;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
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

  addConversionCode() {
    const newConversionCode = this.conversionCodeForm.get('newConversionCode')?.value;
    if (!newConversionCode) {
      return;
    }

    if (this.conversionCodes.includes(newConversionCode)) {
      this.notifier.showError('Conversion code already exists!');
      return;
    }

    this.conversionCodes.unshift(newConversionCode);
    this.conversionCodeForm.get('selectedConversionCode')?.setValue(newConversionCode);
    this.conversionCodeForm.get('newConversionCode')?.reset();

    // ✅ Auto-close dropdown
    this.conversionCodeSelect.close();
  }

  onConversionCodeSelected(event: MatSelectChange) {
    this.conversionTrackerFacade.selectConversionCode(event.value);
  }
}
