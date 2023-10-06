import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-duration-tabs',
  templateUrl: './dashboard-duration-tabs.component.html',
  styleUrls: ['./dashboard-duration-tabs.component.css'],
})
export class DashboardDurationTabsComponent implements OnInit {
  @Output() selectDuration = new EventEmitter<string>();

  constructor() {}

  durations = [
    {
      label: 'This Month',
      value: 'm',
      class: 'filter_m',
    },
    {
      label: 'Last Month',
      value: 'lm',
      class: 'filter_lm',
    },
    {
      label: 'This Quarter',
      value: 'q',
      class: 'filter_q',
    },
    {
      label: 'Last Quarter',
      value: 'lq',
      class: 'filter_lq',
    },
    {
      label: 'Calendar Year',
      value: 'cytd',
      class: 'filter_cytd',
    },
    {
      label: 'Financial Year',
      value: 'fytd',
      class: 'filter_fytd',
    },
  ];

  ngOnInit() {}
}
