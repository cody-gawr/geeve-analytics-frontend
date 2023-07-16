import { Component, OnDestroy, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit, OnDestroy {
  @Input() label = '';
  @Input() value = '';
  @Input() fontIcon = 'insert_chart';
  @Input() toolTip = '';
  @Input() iconColor = '';
  @Input() isLoading = false;
  @Input() isFullMonths = false;
  @Input() isConnectedWith = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
