import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { ClinicFacade } from "../clinic/facades/clinic.facade";
import {
    distinctUntilChanged,
    Subject,
    takeUntil,
  } from 'rxjs';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import moment, { Moment } from "moment";
import { ClinicService } from "../clinic/services/clinic.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CampaignService, ICampaign } from "./services/campaign.service";
import { MatSort } from "@angular/material/sort";
import { NotificationService } from "../shared/services/notification.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ConfirmDialogComponent } from "../shared/components/confirm-dialog/confirm-dialog.component";

  
@Component({
    selector: "app-campaigns",
    templateUrl: "./campaigns.component.html",
    styleUrls: ["./campaigns.component.scss"]
})
export class CampaignsComponent implements OnDestroy, AfterViewInit {

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();
    displayedColumns: string[] = [
        'description', 'created', 
        'totalPatientsCount', 'sentMsgCount', 'pendingCampaignCount', 'failedMsgCount', 'status', 'actions'
    ];
    dataSource = new MatTableDataSource<ICampaign>([]);
    clinicId: number = 0;

    range = new FormGroup({
        start: new FormControl<Moment | null>(moment().startOf('month')),
        end: new FormControl<Moment | null>(moment()),
    });

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private clinicFacade: ClinicFacade,
        private clinicService: ClinicService,
        public dialog: MatDialog,
        private route: Router,
        private campaignService: CampaignService,
        public nofifyService: NotificationService,
    ) {

        this.range = this.campaignService.range;
        
        clinicFacade.currentSingleClinicId$.pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged(),
        ).subscribe((clinicId) => {
            if(typeof clinicId === 'number') {
                this.clinicId = clinicId;
                this.loadCampaigns();
            }
        });

        this.range.controls.end.valueChanges.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe(
            (value)=> {
                this.loadCampaigns();
            }
        );

    
    }

    choseColor(element: ICampaign) {
        if(element.status === 'draft') return 'black';
        if( parseInt(<any>element.inProgressMsgCount) === 0) return "green";
        else return 'blue';
        // switch(status){
        //     case 'draft':
        //         return 'black';
        //     case 'started':
        //         return 'blue';
        //     case 'completed':
        //         return 'green';
        //     case 'pending':
        //         return 'yellow';
        // }
        // return 'black';
    }

    choseStatusIcon(element: ICampaign) {
        if(element.status === 'draft') return 'edit_note';
        if( parseInt(<any>element.inProgressMsgCount) === 0) return "check_circle";
        else return 'hourglass_top';
    }

    choseStatusLabel(element: ICampaign){
        if(element.status === 'draft') return 'Draft';
        if( parseInt(<any>element.inProgressMsgCount) === 0) return "Complete";
        else return 'In Progress';
    }

    loadCampaigns() {
        if(this.clinicId){
            this.campaignService.getCampaigns(
                this.clinicId, 
                this.range.controls.start.value?.format('YYYY-MM-DD'), 
                this.range.controls.end.value?.format('YYYY-MM-DD')
            ).subscribe(
                result => {
                    this.dataSource.data = result.data;
                }
            )
        }
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    goViewPage(row: ICampaign) {
        this.route.navigateByUrl('/newapp/campaigns/view?campaign_id=' + row.id);
    }

    goEditPage(row: ICampaign) {
        this.route.navigateByUrl('/newapp/campaigns/create?campaign_id=' + row.id);
    }

    Campaigns: any[] = [];


    onDateRangeChange(
        target: 'start' | 'end',
        event: MatDatepickerInputEvent<Moment>
      ) {
        if (target === 'end' && !!event.value) {
          this.campaignService.range.controls['end'].setValue(event.value);
        }else if(target === 'start' && !!event.value){
            this.campaignService.range.controls['start'].setValue(event.value);
        }
    }

    onDelete(row: ICampaign) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: { title: 'Delete a campaign', message: `Are you sure you want to delete ${row.description} campaign?`, buttonColor: 'warn' },
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.campaignService.deleteCampaign(this.clinicId, row.id).subscribe(res => {
                    this.loadCampaigns();
                });
            }
        })
    }

    openCreateCampaignDialog() {
        this.route.navigate(['newapp/campaigns/create']);
    }

    getPendingSmsCount(element: ICampaign) {
        return parseInt(<any>element.pendingCampaignCount) + parseInt(<any>element.inProgressMsgCount);
    }

    getTotalSmsCount(element: ICampaign) {
        return parseInt(<any>element.totalMsgCount) + parseInt(<any>element.pendingCampaignCount);
    }
}