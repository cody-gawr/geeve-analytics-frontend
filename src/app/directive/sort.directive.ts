import { Directive, Input, Renderer2, ElementRef, HostListener } from '@angular/core';

import { Sort } from '../util/sort';

@Directive({
  selector: '[appSort]',
})
export class SortDirective {
  @Input() appSort: Array<any> = [];

  constructor(
    private renderer: Renderer2,
    private targetElement: ElementRef,
  ) {}

  @HostListener('click')
  sortData() {
    const sort = new Sort();

    const elem = this.targetElement.nativeElement;

    const order = elem.getAttribute('data-order');

    const property = elem.getAttribute('data-name');

    if (order === 'desc') {
      this.appSort.sort(sort.startSort(property, order));
      elem.setAttribute('data-order', 'asc');
    } else {
      this.appSort.sort(sort.startSort(property, order));
      elem.setAttribute('data-order', 'desc');
    }
  }
}
