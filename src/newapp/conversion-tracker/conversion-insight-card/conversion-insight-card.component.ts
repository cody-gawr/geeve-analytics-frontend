import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

type MetricType = 'Total Consult' | 'Conversion Rate' | 'Avg Time to Conversion';

@Component({
  selector: 'app-conversion-insight-card',
  templateUrl: './conversion-insight-card.component.html',
  styleUrls: ['./conversion-insight-card.component.scss'],
})
export class ConversionInsightCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() type: MetricType | null = null;
  @Input() icon: string | null = null;
  @Input() description: string | null = null;
  @Input() metric: number | null = null;

  @Input() currentValue: number | null = null;
  @Input() currentUnit: string | null = null;
  @Input() deltaValue: number | null = null;
  @Input() deltaUnit: string | null = null;

  /** raw input, never shown directly */
  private _rawValue: string | null = null;
  /** what the template actually binds to */
  public formattedValue: string | null = null;

  /** intercept the input so we can re-format */
  @Input()
  set value(v: string | null) {
    this._rawValue = v;
    this.updateFormattedValue();
  }

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
    return (this.currentValue ?? 0) + (this.currentUnit ?? '');
  }

  get safeDelta(): string {
    return (this.deltaValue ?? 0) + (this.deltaUnit ?? '');
  }

  get deltaDirectionIcon(): string {
    return this.deltaValue >= 0 ? 'arrow_drop_up' : 'arrow_drop_down';
  }

  get deltaSign(): string {
    return this.deltaValue >= 0 ? '+' : '';
  }

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    // if `type` changes, re-run the formatting
    if (changes.type) {
      this.updateFormattedValue();
    }
  }

  ngOnDestroy(): void {}

  private updateFormattedValue() {
    const v = this._rawValue;
    if (v == null || this.type == null) {
      this.formattedValue = v;
      return;
    }

    switch (this.type) {
      case 'Total Consult':
        this.formattedValue = v;
        break;

      case 'Conversion Rate':
        this.formattedValue = `${v}%`;
        break;

      case 'Avg Time to Conversion':
        this.formattedValue = `${v} Days`;
        break;

      default:
        this.formattedValue = v;
    }
  }
}
