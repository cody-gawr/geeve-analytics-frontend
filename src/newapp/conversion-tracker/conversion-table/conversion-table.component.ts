import { ConversionTracker } from '@/newapp/models/conversion-tracker';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-conversion-table',
  templateUrl: './conversion-table.component.html',
  styleUrls: ['./conversion-table.component.scss'],
})
export class ConversionTableComponent implements OnInit, OnDestroy {
  @Input() data: ConversionTracker[] = [];
  displayedColumns: string[] = [
    'select',
    'patient',
    'consultDate',
    'consult',
    'treatmentStatus',
    'lastCampaign',
  ];

  treatmentStatusOptions: { value: string; name: string }[] = [
    { value: 'CONSULT', name: 'Consult' },
    { value: 'RECOMMENDED', name: 'Recommended' },
    { value: 'PRE-TREATMENT', name: 'Pre-Treatment' },
    { value: 'IN-TREATMENT', name: 'In-Treatment' },
    { value: 'COMPLETED', name: 'Completed' },
    { value: 'NOT_SUITABLE', name: 'Not Suitable' },
    { value: 'DECLINED', name: 'Declined' },
  ];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  onTreatmentStatusChange(event: MatSelectChange) {}
}
