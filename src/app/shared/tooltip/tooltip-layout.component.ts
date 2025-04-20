import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltip-layout',
  template: `
    <div class="custom-tooltip">
      <div class="tooltip-title-container">
        <div class="tooltip-title">Open quick search</div>
        <img src="../assets/images/white_heart.png" class="white-heart-icon" alt="analytics-icon" />
      </div>
      <div class="tooltip-info-text">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </div>
    </div>
  `,
})
export class TooltipLayoutComponent {}
