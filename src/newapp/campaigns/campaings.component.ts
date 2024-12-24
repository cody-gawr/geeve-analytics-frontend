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
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CampaignService, ICampaign } from "./services/campaign.service";
import { MatSort } from "@angular/material/sort";
import { NotificationService } from "../shared/services/notification.service";
import { FormControl, FormGroup } from "@angular/forms";

  
@Component({
    selector: "app-campaigns",
    templateUrl: "./campaigns.component.html",
    styleUrls: ["./campaigns.component.scss"]
})
export class CampaignsComponent implements OnDestroy, AfterViewInit {

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();
    displayedColumns: string[] = [
        'select', 'description', 'created', 
        'totalPatientsCount', 'sentMsgCount', 'pendingCampaignCount', 'failedMsgCount', 'status', 'actions'
    ];
    dataSource = new MatTableDataSource<ICampaign>([]);
    selection = new SelectionModel<ICampaign>(true, []);
    clinicId: number = 0;

    range = new FormGroup({
        start: new FormControl<Moment | null>(moment().startOf('month')),
        end: new FormControl<Moment | null>(moment()),
    });

    @ViewChild(MatSort) sort: MatSort;
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
    checkboxLabel(row?: ICampaign): string {
        if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private clinicFacade: ClinicFacade,
        private clinicService: ClinicService,
        public dialog: MatDialog,
        private route: Router,
        private campaignService: CampaignService,
        public nofifyService: NotificationService,
    ) {
        
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

    choseColor(status: 'draft' | 'started' | 'completed' | 'pending') {
        switch(status){
            case 'draft':
                return 'black';
            case 'started':
                return 'blue';
            case 'completed':
                return 'green';
            case 'pending':
                return 'yellow';
        }
        return 'black';
    }

    choseStatusLabel(element: ICampaign){
        if(element.status === 'draft') return 'Draft';
        if(element.inProgressMsgCount == 0) return "Complete";
        else return 'In Progress';
    }

    loadCampaigns() {
        if(this.clinicId){
            this.campaignService.getCampaigns(
                this.clinicId, 
                this.range.controls.start.value.format('YYYY-MM-DD'), 
                this.range.controls.end.value.format('YYYY-MM-DD')
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
        this.route.navigateByUrl('/newapp/campaigns/view?campaign_id=' + row.id)
    }

    Campaigns: any[] = [];


    onDateRangeChange(
        target: 'start' | 'end',
        event: MatDatepickerInputEvent<Moment>
      ) {
        if (target === 'end' && !!event.value) {
          //this.range.controls['end'].setValue(event.value);
        }else if(target === 'start' && !!event.value){
          //this.range.controls['start'].setValue(event.value);
        }
    }

    openCreateCampaignDialog() {
        this.route.navigate(['newapp/campaigns/create']);
    }
}