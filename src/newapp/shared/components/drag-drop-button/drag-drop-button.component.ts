import { CampaignService } from '@/newapp/campaigns/services/campaign.service';
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
  @Input() iconUrl: string;
  @Input() iconUrlWhite: string;
  @Input() filterName: string;
  @Input() title: string;
  // @Input() selectedFilterName$: Observable<string>;
  @Input() closeEvent:Subject<string>;
  @Input() isOpen = false;
  @Input() isDone = false;

  constructor(private campaignSerivce: CampaignService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onClose() {
    this.closeEvent && this.closeEvent.next(this.filterName);
  }

  selectFilter(){
    this.campaignSerivce.setSelectedIcon(this.filterName);
  }

}
