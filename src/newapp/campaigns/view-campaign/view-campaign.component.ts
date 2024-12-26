import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CampaignService, DefaultFilterElements, ICampaignMessage, IGetPatientsFilterJson } from "../services/campaign.service";
import { ClinicFacade } from "@/newapp/clinic/facades/clinic.facade";
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "@/newapp/shared/components/confirm-dialog/confirm-dialog.component";
import { NotificationService } from "@/newapp/shared/services/notification.service";

@Component({
    selector: 'view-campaign',
    templateUrl: 'view-campaign.component.html',
    styleUrls: ['view-campaign.component.scss']
})
export class ViewCampaignComponent {
    dataSource = new MatTableDataSource<ICampaignMessage>([]);
    displayedColumns = ['select', 'created', 'patient_name', 'phone_number', 'sms_text', 'status', 'actions'];
    clinicId: number = 0;
    campaignId: number = 0;
    campaignName: string = '';
    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();
    selection = new SelectionModel<ICampaignMessage>(true, []);

    constructor(
        private campaignService: CampaignService,
        private clinicFacade: ClinicFacade,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        public nofifyService: NotificationService,
    ) {
        combineLatest([this.route.queryParams, this.clinicFacade.clinics$])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([params, clinics]) => {
            this.campaignId = parseInt(params['campaign_id']) || 0;
            if(this.campaignId && clinics.length> 0) {
              this.clinicId = clinics[0].id;
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }
    
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ICampaignMessage): string {
        if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.patient_id + 1}`;
    }


    isResending = false;
    resendMessage(element: ICampaignMessage) {
        this.isResending = true;
        const _sendMsgs = (_msg) => {
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
        if(this.selection.selected?.length > 0){
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '300px',
                data: { title: 'Confirm Action', message: `Are you sure you want to resend messages to ${this.selection.selected.length} patients` },
            });
          
            dialogRef.afterClosed().subscribe((result) => {
                if (result) {
                    console.log('User confirmed');
                    _sendMsgs(this.selection.selected.map(item => (
                        {id: item.id, status: item.status}
                    )));
                    
                } else {
                    console.log('User canceled');
                }
            });
        }else{
            _sendMsgs([{id: element.id, status: element.status}]);
        }
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
}