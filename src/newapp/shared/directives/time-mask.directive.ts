import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appTimeMask]'
})
export class TimeMaskDirective {
  constructor(public ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: any) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event: any, backspace: any) {
    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length >= 2) {
      newVal = newVal.replace(/^(\d{0,2})/, '$1:');
    } else if (newVal.length <= 4) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
    } else {
      newVal = newVal.substring(0, 4);
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
    }

    this.ngControl.valueAccessor?.writeValue(newVal);
  }
}
