import { MenuService } from '../../shared/services/menu.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment, { Moment } from 'moment';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss']
})
export class AppTopbarComponent implements OnInit {
  @Input() toggleSideBar: () => void;
  @Input() isSidenavVisible: Boolean;
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  title: string;

  range = new FormGroup({
    start: new FormControl<Moment | null>(moment().subtract(1, 'weeks')),
    end: new FormControl<Moment | null>(moment()),
  });

  constructor(private menuService: MenuService) {
    this.menuService.menuSource$
      .pipe(
        map((menu) => menu.key),
        takeUntil(this.destroy$)
      )
      .subscribe((v) => (this.title = v));
  }

  ngOnInit() {}
}
