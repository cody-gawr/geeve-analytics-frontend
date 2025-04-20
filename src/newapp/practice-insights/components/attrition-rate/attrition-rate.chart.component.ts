import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'pi-attrition-rate-chart',
  templateUrl: './attrition-rate.chart.component.html',
  styleUrls: ['./attrition-rate.chart.component.scss'],
})
export class PracticeInsightAttritionRateComponent implements OnInit, OnDestroy {
  chartTitle = 'Attrition Rate';
  toolTip = 'Attrition Rate';
  durationCurrLabel = 'Current';
  noDataAlertMessage = 'Coming Soon';
  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
