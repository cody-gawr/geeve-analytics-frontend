import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[customButton]',
})
export class CustomButtonDirective {
  @Input() disabled: boolean = false;
  @Input() hoverEffect: boolean = true;

  @HostListener('mouseover')
  onMouseOver() {
    if (this.hoverEffect) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.7');
    } else {
      //this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.7')
    }
  }
  @Input('appHover') case: string = '';
  @HostListener('mouseout') onMouseOut() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
  }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.applyPrimary();

    window.onresize = (event: any) => {
      if (event.target.innerWidth < 1249) {
        this.applySmallPrimary();
      } else {
        this.applyPrimary();
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['disabled'].currentValue || changes['disabled'].currentValue == undefined) {
      this.applyPrimary();
    } else {
      this.applyDisabled();
    }
  }

  applyDisabled() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(0, 0, 0, 0.12)');
    this.renderer.setStyle(this.el.nativeElement, 'color', 'rgba(0, 0, 0, 0.38)');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    //this.renderer.setStyle(this.el.nativeElement, 'gap', '5px');
    //this.renderer.setStyle(this.el.nativeElement, 'padding', '6px 16px');
    this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid transparent');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '4px');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'background-color 0.3s, color 0.3s, border-color 0.3s',
    );
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '700');
    this.renderer.setStyle(this.el.nativeElement, 'text-transform', 'uppercase');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '14px');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '0.875rem');
    this.renderer.setStyle(this.el.nativeElement, 'line-height', '1.25rem');
    // this.renderer.setStyle(this.el.nativeElement, 'height', '36px');
    this.renderer.setStyle(this.el.nativeElement, 'font-family', 'Gilroy-Regular');
    this.renderer.setStyle(this.el.nativeElement, 'letter-spacing', '1px');
    this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center');
  }

  applyPrimary() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    //this.renderer.setStyle(this.el.nativeElement, 'gap', '5px');
    //this.renderer.setStyle(this.el.nativeElement, 'padding', '6px 16px');
    this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'background', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid transparent');
    this.renderer.setStyle(this.el.nativeElement, 'background', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '4px');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#009688');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'background-color 0.3s, color 0.3s, border-color 0.3s',
    );
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '700');
    this.renderer.setStyle(this.el.nativeElement, 'text-transform', 'uppercase');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '14px');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '0.875rem');
    this.renderer.setStyle(this.el.nativeElement, 'line-height', '1.25rem');
    // this.renderer.setStyle(this.el.nativeElement, 'height', '36px');
    this.renderer.setStyle(this.el.nativeElement, 'font-family', 'Gilroy-Regular');
    this.renderer.setStyle(this.el.nativeElement, 'letter-spacing', '1px');
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center');
  }

  applySmallPrimary() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '10px');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '0.675rem');
    this.renderer.setStyle(this.el.nativeElement, 'line-height', '0.75rem');
  }
}
