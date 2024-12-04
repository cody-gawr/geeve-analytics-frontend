import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'drag-drop-button',
  templateUrl: './drag-drop-button.component.html',
  styleUrls: ['./drag-drop-button.component.scss'],
})
export class DragDropButtonComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  @Input() iconName: string;
  @Input() filterName: string;
  @Input() title: string;
  @Input() selectedIcon$: Observable<string>;
  @Input() closeEvent:Subject<string>;
  isOpen = false;
  @Input() isDone = false;

  constructor() {

  }

  ngOnInit(): void {
    this.selectedIcon$?.pipe(takeUntil(this.destroy$)).subscribe(
      (selectedIconName: string) => {
        if(selectedIconName === this.filterName) this.isOpen = true;
        else this.isOpen = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onClose() {
    this.closeEvent && this.closeEvent.next(this.filterName);
  }

}
