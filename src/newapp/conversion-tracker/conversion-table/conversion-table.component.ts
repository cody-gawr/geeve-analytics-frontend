import { Component, Input, OnInit } from '@angular/core';

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
export class ConversionTableComponent implements OnInit {
  @Input() data: ConversionRecord[] = [];
  displayedColumns: string[] = [
    'select',
    'patient',
    'visitDate',
    'consult',
    'status',
    'lastCampaign',
  ];

  constructor() {}

  ngOnInit() {}
}
