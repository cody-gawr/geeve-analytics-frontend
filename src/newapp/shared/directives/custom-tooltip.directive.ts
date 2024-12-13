import { Directive, Input, ElementRef, HostListener, ComponentRef, Component, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-custom-tooltip',
  template: `<div class="tooltip-content" [innerHTML]="tooltipContent"></div>`,
  styles: [`
        .tooltip-content {
            background-color: #333;
            color: white;
            padding: 8px;
            border-radius: 4px;
            font-size: 14px;
            max-width: 300px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 7px;
        }
  `]
})
export class CustomTooltipComponent {
  @Input() tooltipContent!: string;
}

@Directive({
  selector: '[appTooltip]'
})
export class CustomTooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipContent!: string;

  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private elementRef: ElementRef) {}

  @HostListener('mouseenter')
  showTooltip() {
    if (!this.tooltipContent) return;

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
          },
        ]),
      hasBackdrop: false,
    });

    const tooltipPortal = new ComponentPortal(CustomTooltipComponent);
    const tooltipRef: ComponentRef<CustomTooltipComponent> = this.overlayRef.attach(tooltipPortal);
    tooltipRef.instance.tooltipContent = this.tooltipContent;
  }

  @HostListener('mouseleave')
  hideTooltip() {
    this.disposeTooltip();
  }

  ngOnDestroy() {
    this.disposeTooltip();
  }
  private disposeTooltip() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = undefined!;
    }
  }
}
