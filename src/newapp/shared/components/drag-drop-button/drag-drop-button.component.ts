import { CampaignService } from '@/newapp/campaigns/services/campaign.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject} from 'rxjs';

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
  @Input() closeEvent:Subject<string>;
  @Input() isOpen = false;
  @Input() isDone = false;
  @Input() onlyView: boolean = false;
  @Input() disabled = false;
  @Input() desc = '';

  startDate: string = '';
  endDate: string = '';
  minAge: number | null = null;
  maxAge: number | null = null;
  itemCodes: string[] = [];
  all = '';


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
    if(this.disabled) return;
    if(this.onlyView) return;
    this.isOpen = !this.isOpen;
    this.campaignSerivce.setSelectedIcon(this.filterName);
  }

  getClassList() {
    let classList = 'layout';
    if(!this.onlyView) classList += ' fixed-size';
    else classList += ' padding-size';
    if(this.isOpen){
      classList += ' border-c';
    }
    if(this.isDone) classList += ' done';
    if(this.disabled){
      classList += ' disabled';
    }
    return classList;
  }

}
