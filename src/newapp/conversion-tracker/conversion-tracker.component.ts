import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { ConversionRecord } from './conversion-table/conversion-table.component';
import { MatDialog } from '@angular/material/dialog';
import { StartCampaignDialogComponent } from '../shared/components/start-campaign-dialog/start-campaign-dialog.component';
import { distinctUntilChanged, map, filter, Subject, takeUntil } from 'rxjs';
import { ClinicFacade } from '../clinic/facades/clinic.facade';

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
  unconvertedData: ConversionRecord[] = [
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

  convertedData: ConversionRecord[] = [
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

  onRangeSelected(event: DateRange<Date>) {
    console.log('Selected range:', event);
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
}
