import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConversionRecord } from './conversion-table/conversion-table.component';
import { MatDialog } from '@angular/material/dialog';
import { StartCampaignDialogComponent } from '../shared/components/start-campaign-dialog/start-campaign-dialog.component';
import { distinctUntilChanged, map, filter, Subject, takeUntil } from 'rxjs';
import { ClinicFacade } from '../clinic/facades/clinic.facade';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../shared/services/notification.service';
import { MatSelect } from '@angular/material/select';

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
  conversionCodes: string[] = ['Option A', 'Option B', 'Option C'];
  conversionCodeForm: FormGroup = new FormGroup({
    selectedConversionCode: new FormControl<string | null>(null),
    newConversionCode: new FormControl<string | null>(null),
  });
  consultsData: ConversionRecord[] = [
    {
      patient: 'John Doe',
      visitDate: '2023-05-10',
      consult: 'Initial',
      status: 'Pending',
      lastCampaign: 'Spring Boost',
    },
    {
      patient: 'Jane Smith',
      visitDate: '2023-05-12',
      consult: 'Follow-up',
      status: 'Waiting',
      lastCampaign: 'April Reach',
    },
  ];

  recommendedData: ConversionRecord[] = [
    {
      patient: 'Mike Ross',
      visitDate: '2023-04-20',
      consult: 'Completed',
      status: 'Converted',
      lastCampaign: 'Winter Promo',
    },
  ];

  notSuitableData: ConversionRecord[] = [
    {
      patient: 'Mike Ross',
      visitDate: '2023-04-20',
      consult: 'Completed',
      status: 'Converted',
      lastCampaign: 'Winter Promo',
    },
  ];

  declinedData: ConversionRecord[] = [
    {
      patient: 'Rachel Zane',
      visitDate: '2023-04-01',
      consult: 'Initial',
      status: 'Declined',
      lastCampaign: 'March Madness',
    },
  ];

  constructor(
    public dialog: MatDialog,
    private clinicFacade: ClinicFacade,
    private notifier: NotificationService,
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
}
