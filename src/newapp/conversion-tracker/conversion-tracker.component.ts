import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { ConversionRecord } from './conversion-table/conversion-table.component';

@Component({
  selector: 'app-conversion-tracker',
  templateUrl: './conversion-tracker.component.html',
  styleUrls: ['./conversion-tracker.component.scss'],
})
export class ConversionTrackerComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}

  onRangeSelected(event: DateRange<Date>) {
    console.log('Selected range:', event);
  }
}
