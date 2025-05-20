import { Component, OnInit } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'app-conversion-tracker',
  templateUrl: './conversion-tracker.component.html',
  styleUrls: ['./conversion-tracker.component.scss'],
})
export class ConversionTrackerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onRangeSelected(event: DateRange<Date>) {
    console.log('Selected range:', event);
  }
}
