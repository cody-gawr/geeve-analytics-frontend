import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { ClinicFacade } from "../clinic/facades/clinic.facade";
import {
    distinctUntilChanged,
    Subject,
    takeUntil,
  } from 'rxjs';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import moment, { Moment } from "moment";
import { FormControl, FormGroup } from "@angular/forms";
import { ClinicService } from "../clinic/services/clinic.service";
import { CampaignData } from "../models/clinic/campaign";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";

  
@Component({
    selector: "app-campaigns",
    templateUrl: "./campaigns.component.html",
    styleUrls: ["./campaigns.component.scss"]
})
export class CampaignsComponent implements OnDestroy, AfterViewInit {

    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();
    displayedColumns: string[] = ['select', 'patient_name', 'mobile', 'initial_tx_id', 'initial_tx_date'];
    dataSource = new MatTableDataSource<CampaignData>([]);
    selection = new SelectionModel<CampaignData>(true, []);

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
    checkboxLabel(row?: CampaignData): string {
        if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private clinicFacade: ClinicFacade,
        private clinicService: ClinicService
    ) {
        clinicFacade.currentSingleClinicId$.pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged(),
        ).subscribe((clinicId) => {
            if(typeof clinicId === 'number') {
                this.range.controls['clinic_id'].setValue(clinicId);
                clinicFacade.loadCampaigns(clinicId);
            }
        });

        clinicFacade.campaigns$.pipe(takeUntil(this.destroy$)).subscribe((campaigns) => {
            this.Campaigns = campaigns?.map((campaign) => {
                return {
                    value: campaign.id,
                    label: campaign.description
                };
            }) || [];
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    Campaigns: any[] = [];
    range = new FormGroup({
        start: new FormControl<Moment | null>(moment().startOf('month')),
        end: new FormControl<Moment | null>(moment()),
        campaign_id: new FormControl<number | null>(null),
        clinic_id: new FormControl<number | null>(null),
    });
    onDateRangeChange(
        target: 'start' | 'end',
        event: MatDatepickerInputEvent<Moment>
      ) {
        if (target === 'end' && !!event.value) {
          this.range.controls['end'].setValue(event.value);
        }else if(target === 'start' && !!event.value){
          this.range.controls['start'].setValue(event.value);
        }
    }

    submitForm(){
        this.clinicService.getCampaingDetails(
            this.range.controls['clinic_id'].value,
            this.range.controls['campaign_id'].value,
            this.range.controls['start'].value,
            this.range.controls['end'].value
        ).subscribe((res) => {
            this.dataSource.data = res.data.map((data, index) => ({...data, position: index + 1}));
        });
    }
}