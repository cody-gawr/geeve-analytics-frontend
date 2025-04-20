import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  ReflectiveInjector,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
export interface ITooltipData {
  title: string;
  info?: string;
  direction?: string;
}

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  // We can pass string, template or component
  @Input('tooltip') content: ITooltipData;
  private componentRef: ComponentRef<TooltipComponent>;

  constructor(
    private element: ElementRef,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
  ) {}

  @HostListener('mouseover')
  mouseenter() {
    if (this.componentRef) return;
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'tooltipConfig',
        useValue: {
          host: this.element.nativeElement,
        },
      },
      {
        provide: 'data',
        useValue: this.content,
      },
    ]);
    this.componentRef = this.vcr.createComponent(factory, 0, injector);
  }

  @HostListener('mouseout')
  mouseout() {
    this.destroy();
  }

  destroy() {
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }

  ngOnDestroy() {
    this.destroy();
  }
}
