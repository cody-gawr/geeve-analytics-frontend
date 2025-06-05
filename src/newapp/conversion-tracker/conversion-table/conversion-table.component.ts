import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

export interface ConversionRecord {
  patient: string;
  visitDate: string;
  consult: string;
  status: string;
  lastCampaign: string;
}

@Component({
  selector: 'app-conversion-table',
  templateUrl: './conversion-table.component.html',
  styleUrls: ['./conversion-table.component.scss'],
})
export class ConversionTableComponent implements OnInit, OnDestroy {
  @Input() data: ConversionRecord[] = [];
  displayedColumns: string[] = [
    'select',
    'patient',
    'visitDate',
    'consult',
    'status',
    'lastCampaign',
  ];

  treatmentStatusOptions: { value: string; name: string }[] = [
    { value: 'CONSULT', name: 'Consult' },
    { value: 'RECOMMENDED', name: 'Recommended' },
    { value: 'NOT_SUITABLE', name: 'Not Suitable' },
    { value: 'DECLINED', name: 'Declined' },
  ];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  onTreatmentStatusChange(event: MatSelectChange) {}
}
