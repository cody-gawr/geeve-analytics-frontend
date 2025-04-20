import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, map } from 'rxjs';

@Component({
  selector: 'compare-mode-toggle',
  templateUrl: './compare-mode-toggle.component.html',
  styleUrls: ['./compare-mode-toggle.component.scss'],
})
export class CompareModeToggleComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(private layoutFacade: LayoutFacade) {
    // this.layoutFacade.setCompareMode(false);
  }

  get compareMode$() {
    return this.layoutFacade.compare$.pipe(
      takeUntil(this.destroy$),
      map(v => (v ? 'on' : 'off')),
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onChangeCompareMode(event) {
    this.layoutFacade.setCompareMode(event.value === 'on');
  }
}
