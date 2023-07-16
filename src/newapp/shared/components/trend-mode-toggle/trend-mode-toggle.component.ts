import { LayoutFacade } from '@/newapp/layout/facades/layout.facade';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'trend-mode-toggle',
  templateUrl: './trend-mode-toggle.component.html',
  styleUrls: ['./trend-mode-toggle.component.scss']
})
export class TrendModeToggleComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  constructor(
    private layoutFacade: LayoutFacade
  ) {
  }

  get trendMode$(){
    return this.layoutFacade.trend$
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onChangeTrendMode(event){
    this.layoutFacade.setTrend(event.value);
  }
}
