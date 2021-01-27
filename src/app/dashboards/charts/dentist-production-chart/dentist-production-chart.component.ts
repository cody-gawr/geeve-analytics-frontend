import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dentist-production-chart',
  templateUrl: './dentist-production-chart.component.html',
  styleUrls: ['./dentist-production-chart.component.css']
})
export class DentistProductionChartComponent implements OnInit {

  @Input() chartData: Array<any>;
  @Input() chartLabels: Array<string>;
  @Input() loading: boolean = true;

  private dentistProductionLabelsByIndex: Array<string> = []
  constructor() { }

  ngOnInit() {
  }

}
