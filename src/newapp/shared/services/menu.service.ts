import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { MenuChangeEvent } from '../../models/layout';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuSource = new Subject<MenuChangeEvent>();

  menuSource$ = this.menuSource.asObservable();

  constructor() {}

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }
}
