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
  @Input() settings: string[] = [];

  startDate: string = '';
  endDate: string = '';
  minAge: number | null = null;
  maxAge: number | null = null;
  itemCodes: string[] = [];


  constructor(private campaignSerivce: CampaignService) {

  }

  ngOnInit(): void {
    if(this.settings && this.settings?.length > 0){
      if(['treatment', 'incomplete_tx_plan', 'no_appointment'].indexOf(this.filterName) > -1){
        if(this.settings?.length >= 2){
          this.startDate = this.settings[0];
          this.endDate = this.settings[1];
          if(this.settings?.length > 2){
            this.itemCodes = this.settings.slice(2);
          }
        }
      }else if(this.filterName === 'patient_age'){
        if(this.settings?.length >= 2){
          this.minAge = parseInt(this.settings[0]);
          this.maxAge = parseInt(this.settings[1]);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onClose() {
    this.closeEvent && this.closeEvent.next(this.filterName);
  }

  selectFilter(){
    console.log(this.settings)
    if(this.settings && this.settings?.length > 0){

    }else{
      this.isOpen = !this.isOpen;
      this.campaignSerivce.setSelectedIcon(this.filterName);
    }
  }

}
