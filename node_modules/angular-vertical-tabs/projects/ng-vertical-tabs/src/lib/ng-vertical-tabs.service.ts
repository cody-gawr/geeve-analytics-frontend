import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgVerticalTabsService {
  multi: boolean;
  selectedOptions: string[];

  constructor() {
    this.selectedOptions = [];
  }
}
