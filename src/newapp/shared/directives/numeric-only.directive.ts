import { on } from '@ngrx/store';
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumericOnly]',
})
export class NumericOnlyDirective {
  private regex = /^[0-9]*$/; // Allow digits only
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Enter', 'Escape', 'Home'];

  constructor(private control: NgControl) {}

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.specialKeys.includes(event.key)) {
      return;
    }

    // Block dot key or anything not a digit
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedInput = event.clipboardData?.getData('text/plain') ?? '';
    if (!this.regex.test(pastedInput)) {
      event.preventDefault();
    }
  }
}
