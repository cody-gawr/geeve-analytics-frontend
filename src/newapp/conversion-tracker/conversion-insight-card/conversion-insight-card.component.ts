import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversion-insight-card',
  templateUrl: './conversion-insight-card.component.html',
  styleUrls: ['./conversion-insight-card.component.scss'],
})
export class ConversionInsightCardComponent implements OnInit {
  @Input() icon: string | null = null;
  @Input() description: string | null = null;
  @Input() value: number | null = null;
  @Input() metric: number | null = null;

  get safeIcon(): string {
    return this.icon?.trim() || 'info';
  }

  get safeDescription(): string {
    return this.description?.trim() || 'No description available';
  }

  get safeValue(): number {
    return typeof this.value === 'number' ? this.value : 0;
  }

  get safeMetric(): number {
    return typeof this.metric === 'number' ? this.metric : 0;
  }

  get metricDirectionIcon(): string {
    return this.safeMetric >= 0 ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  get metricSign(): string {
    return this.safeMetric >= 0 ? '+' : '-';
  }

  constructor() {}

  ngOnInit() {}
}
