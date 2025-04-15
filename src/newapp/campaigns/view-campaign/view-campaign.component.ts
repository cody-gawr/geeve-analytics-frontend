import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CampaignService, DefaultFilterElements, ICampaignMessage, IGetPatientsFilterJson } from "../services/campaign.service";
import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "@/newapp/shared/services/notification.service";
import { StartCampaignDialog } from "../start-campaign-dialog/start-campaign-dialog.component";
import { MatPaginator } from "@angular/material/paginator";
import { composeCampaignFilterDescription } from "@/newapp/shared/utils";

@Component({
    selector: 'view-campaign',
    templateUrl: 'view-campaign.component.html',
    styleUrls: ['view-campaign.component.scss']
})
export class ViewCampaignComponent {
    dataSource = new MatTableDataSource<ICampaignMessage>([]);
    displayedColumns = ['created', 'patient_name', 'phone_number', 'sms_text', 'status', 'actions'];
    clinicId: number = 0;
    clinicName: string = '';
    campaignId: number = 0;
    campaignName: string = '';
    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    constructor(
        private campaignService: CampaignService,
        private clinicFacade: ClinicFacade,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        public nofifyService: NotificationService,
    ) {
        combineLatest([this.route.queryParams, this.clinicFacade.currentClinics$])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([params, clinics]) => {
            this.campaignId = parseInt(params['campaign_id']) || 0;
            if(this.campaignId && clinics.length> 0) {
              this.clinicId = clinics[0].id;
              this.clinicName = clinics[0].clinicName;
              this.loadCampaignMessages();
            }
        });
    }

    loadCampaignMessages() {
        this.campaignService.getCampaignSmsMessages(this.clinicId, this.campaignId).subscribe(
            msg => {
                this.dataSource.data = msg.data.messages;
                this.loadFilterSettings(msg.data.filters);
            }
          );
    }

    isResending = false;
    resendMessage(element: ICampaignMessage) {
        const _sendMsgs = (_msg) => {
            this.isResending = true;
            this.campaignService.resendCampaignMessages(this.clinicId, this.campaignId, _msg).subscribe(
                {
                    next: (result) => {
                        if(result.data[0] == result.data[1]){
                            this.nofifyService.showSuccess(`Sent successfully to ${result.data[0]} patients.`);
                          }else{
                            this.nofifyService.showError(`Failed ${result.data[1] - result.data[0]} patients, Succeed to ${result.data[0]} patients`);
                          }
                        this.loadCampaignMessages();
                        this.isResending = false;
                    },
                    error: (err) => {
                        this.isResending = false;
                    }
                }
    
            )
        }

        const dialogRef = this.dialog.open(StartCampaignDialog, {
            data: {
                sms_text: element.sms_text,
                patients: [{
                    patient_name: element.patient_name,
                    mobile: element.phone_number
                }],
                clinicId: this.clinicId,
                clinicName: this.clinicName,
                campaignId: this.campaignId,
                resend: true
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if(result.status){
                _sendMsgs([{id: element.id, status: element.status, sms_text: result.sms_text, sid: element.sid, phone_number: result.phone_number}]);
            }
        });
    }

    done = [];
    loadFilterSettings(settings: IGetPatientsFilterJson[]) {
        this.done = [];
        for(const filter of DefaultFilterElements){
            const setting = settings.find(s => s.filter === filter.filterName);
            if(setting){
                this.done.push({...filter, settings: setting.filter_settings});
            }
        }
    }

    getDesc(filterName: string, settings: string[]){
        return composeCampaignFilterDescription(filterName, settings);
    }
}