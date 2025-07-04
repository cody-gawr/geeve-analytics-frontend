import { ConversionCode, ConversionTrackerRecord } from '@/newapp/models/conversion-tracker';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ConversionTrackerFacade } from '../facades/conversion-tracker.facade';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DentistFacade } from '@/newapp/dentist/facades/dentists.facade';
import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';

@Component({
  selector: 'app-conversion-table',
  templateUrl: './conversion-table.component.html',
  styleUrls: ['./conversion-table.component.scss'],
})
export class ConversionTableComponent implements OnInit, OnDestroy {
  @Input() data: ConversionTrackerRecord[] = [];
  @Input() isDentistMode: boolean;

  private destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  public payload: {
    clinicId: number;
    providerId: number;
    startDate: string;
    endDate: string;
    consultCode: string;
  } | null = null;
  get displayedColumns(): string[] {
    return this.isDentistMode
      ? [
          'select',
          'patient',
          'consultDate',
          'consult',
          'treatmentStatus',
          'convertedDate',
          'notes',
          'lastCampaign',
        ]
      : [
          'select',
          'patient',
          'provider',
          'consultDate',
          'consult',
          'treatmentStatus',
          'convertedDate',
          'notes',
          'lastCampaign',
        ];
  }

  treatmentStatusOptions: { value: string; name: string }[] = [
    { value: 'CONSULT', name: 'Consult' },
    { value: 'RECOMMENDED', name: 'Recommended' },
    { value: 'PRE-TREATMENT', name: 'Pre-Treatment' },
    { value: 'IN-TREATMENT', name: 'In-Treatment' },
    { value: 'COMPLETED', name: 'Completed' },
    { value: 'NOT_SUITABLE', name: 'Not Suitable' },
    { value: 'DECLINED', name: 'Declined' },
  ];

  get selectedConversionCode$(): Observable<ConversionCode> {
    return this.conversionTrackerFacade.selectedConversionCode$;
  }

  constructor(
    public dialog: MatDialog,
    private clinicFacade: ClinicFacade,
    private dentistFacade: DentistFacade,
    private layoutFacade: LayoutFacade,
    private conversionTrackerFacade: ConversionTrackerFacade,
  ) {}

  ngOnInit() {
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
        this.payload = {
          clinicId: <number>clinicId,
          providerId: providerId === 'all' ? 0 : <number>providerId,
          startDate: moment(start).format('YYYY-MM-DD'),
          endDate: moment(end).format('YYYY-MM-DD'),
          consultCode,
        };
      });
  }

  ngOnDestroy(): void {}

  onTreatmentStatusChange(recordId: number, event: MatSelectChange) {
    this.conversionTrackerFacade.updateConversionTracker(
      recordId,
      { treatmentStatus: event.value },
      this.payload,
    );
  }

  onOpenNotesDialog(recordId: number, notes: string | null) {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      width: '450px',
      data: {
        mode: notes === null ? 'Create' : 'Update',
        notes,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (!result) {
          return;
        }

        const { notes } = result;
        this.conversionTrackerFacade.updateConversionTracker(recordId, { notes }, this.payload);
      });
  }
}
