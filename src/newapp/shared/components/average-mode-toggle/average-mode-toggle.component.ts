import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'average-mode-toggle',
  templateUrl: './average-mode-toggle.component.html',
  styleUrls: ['./average-mode-toggle.component.scss'],
})
export class AverageModeToggleComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(private layoutFacade: LayoutFacade) {
    //this.layoutFacade.setAverage('off');
  }

  get avgMode$() {
    return this.layoutFacade.average$.pipe(takeUntil(this.destroy$));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onChangeAvgMode(event) {
    this.layoutFacade.setAverage(event.value);
  }
}
