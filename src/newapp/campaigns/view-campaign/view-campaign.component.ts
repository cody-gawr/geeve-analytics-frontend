import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CampaignService } from "../services/campaign.service";
import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'view-campaign',
    templateUrl: 'view-campaign.component.html',
    styleUrls: ['view-campaign.component.scss']
})
export class ViewCampaignComponent {
    dataSource = new MatTableDataSource([]);
    displayedColumns = ['created', 'patient_name', 'phone_number', 'sms_text', 'status'];
    clinicId: number = 0;
    campaignId: number = 0;
    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();

    constructor(
        private campaignService: CampaignService,
        private clinicFacade: ClinicFacade,
        private route: ActivatedRoute
    ) {
        combineLatest([this.route.queryParams, this.clinicFacade.clinics$])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([params, clinics]) => {
            this.campaignId = params['campaign_id'];
            if(this.campaignId && clinics.length> 0) {
              this.clinicId = clinics[0].id;
              this.campaignService.getCampaignSmsMessages(this.clinicId, this.campaignId).subscribe(
                msg => {
                    console.log('smg', msg);
                    this.dataSource.data = msg.data;
                }
              )
            }
        });
    }
}