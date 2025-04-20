import { Component, Directive, OnInit, Inject } from '@angular/core';
@Directive({
  selector: '.tooltip-container',
})
export class TooltipContainerDirective {}
@Component({
  selector: 'app-tooltip',
  template: ` <div class="tooltip-container">
    <div
      [ngClass]="{
        'custom-tooltip': true,
        'custom-tooltip-right': tooltipData && tooltipData.direction === 'right',
        'custom-tooltip-top': tooltipData && tooltipData.direction === 'top',
        'custom-tooltip-top-right': tooltipData && tooltipData.direction === 'top-right',
        'custom-tooltip-top-right-discount':
          tooltipData && tooltipData.direction === 'top-right-discount'
      }"
    >
      <div class="tooltip-title-container">
        <div class="tooltip-title">{{ tooltipData?.title ?? '' }}</div>
        <img src="../assets/images/white_heart.png" class="white-heart-icon" alt="analytics-icon" />
      </div>
      <div class="tooltip-info-text" [innerHtml]="tooltipData.info || ''"></div>
    </div>
  </div>`,
})
export class TooltipComponent implements OnInit {
  top: string;
  // @ViewChild(TooltipContainerDirective, { read: ElementRef })
  // private tooltipContainer;
  constructor(
    @Inject('tooltipConfig') private config,
    @Inject('data') public tooltipData,
  ) {}

  ngOnInit() {
    // const {top} = this.config.host.getBoundingClientRect();
    // const {height} = this.tooltipContainer.nativeElement.getBoundingClientRect();
    // this.top = `${top - height}px`;
  }
}
