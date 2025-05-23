import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversion-insight-card',
  templateUrl: './conversion-insight-card.component.html',
  styleUrls: ['./conversion-insight-card.component.scss'],
})
export class ConversionInsightCardComponent implements OnInit {
  @Input() type: 'Total Consult' | 'Conversion Rate' | 'Avg Time to Conversion' | null = null;
  @Input() icon: string | null = null;
  @Input() description: string | null = null;
  @Input() value: string | null = null;
  @Input() metric: number | null = null;

  get cardColorClass(): string {
    let cardColorClass = '';
    switch (this.type) {
      case 'Total Consult':
        cardColorClass = 'card-success';
        break;
      case 'Conversion Rate':
        cardColorClass = 'card-warning';
        break;
      case 'Avg Time to Conversion':
        cardColorClass = 'card-info';
        break;
    }
    return cardColorClass;
  }

  get fontColorClass(): string {
    let fontColorClass = '';
    switch (this.type) {
      case 'Total Consult':
        fontColorClass = 'text-success';
        break;
      case 'Conversion Rate':
        fontColorClass = 'text-warning';
        break;
      case 'Avg Time to Conversion':
        fontColorClass = 'text-info';
        break;
    }
    return fontColorClass;
  }

  get buttonClass(): string {
    let buttonClass = 'btn btn-outline-primary';
    switch (this.type) {
      case 'Total Consult':
        buttonClass = 'total-consult';
        break;
      case 'Conversion Rate':
        buttonClass = 'conversion-rate';
        break;
      case 'Avg Time to Conversion':
        buttonClass = 'avg-time-to-conversion';
        break;
    }
    return buttonClass;
  }

  get safeIcon(): string {
    return this.icon?.trim() || 'info';
  }

  get safeDescription(): string {
    return this.description?.trim() || 'No description available';
  }

  get safeValue(): string {
    return this.value?.trim() || 'No value available';
  }

  get safeMetric(): number {
    return typeof this.metric === 'number' ? this.metric : 0;
  }

  get metricValue(): string {
    let value = '';
    switch (this.type) {
      case 'Total Consult':
      case 'Conversion Rate':
        value = `${this.safeMetric}%`;
        break;
      case 'Avg Time to Conversion':
        value = `${this.safeMetric}d`;
        break;
    }

    return value;
  }

  get metricDirectionIcon(): string {
    return this.safeMetric >= 0 ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  get metricSign(): string {
    return this.safeMetric >= 0 ? '+' : '';
  }

  constructor() {}

  ngOnInit() {}
}
