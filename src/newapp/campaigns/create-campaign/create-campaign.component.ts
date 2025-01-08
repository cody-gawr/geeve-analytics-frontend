import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CampaignService, DefaultFilterElements, ICampaign, ICampaignFilter, IGetPatientsFilterJson } from '../services/campaign.service';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { SelectionModel } from '@angular/cdk/collections';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { StartCampaignDialog } from '../start-campaign-dialog/start-campaign-dialog.component';
import { NotificationService } from '@/newapp/shared/services/notification.service';
import { CommonDataService, ItemCode } from '@/newapp/shared/services/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CsvUtil } from '@/newapp/shared/utils';
import { CAMPAIGN_FILTERS } from '@/newapp/shared/constants';

export interface CampaignElement {
  clinic_id: number;
  last_appointment: string; // YYY-MM-DD
  last_provider: number;
  mobile: string;
  next_appointment: string | null;
  next_provider: number | null;
  patient_id: number;
  patient_name: string;
}

@Component({
  selector: 'create-campaign',
  templateUrl: 'create-campaign.component.html',
  styleUrls: ['create-campaign.component.scss'],
})
export class CreateCampaignComponent implements AfterViewInit {
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    addOnBlur = true;
    destroy = new Subject<void>();
    destroy$ = this.destroy.asObservable();
    closeEvent = new Subject<string>();
    closeEvent$ = this.closeEvent.asObservable();

    healthInsurance: string[] = [];
    filterFormGroup = new FormGroup({
        patientAgeMin: new FormControl(25),
        patientAgeMax: new FormControl(75),
        incomplete_tx_planStart: new FormControl<Date | null>(null),
        incomplete_tx_planEnd: new FormControl<Date | null>(null),
        no_appointmentStart: new FormControl<Date | null>(null),
        no_appointmentEnd: new FormControl<Date | null>(null),
        treatmentStart: new FormControl<Date | null>(null),
        treatmentEnd: new FormControl<Date | null>(null),
    });
    clinicId = 0;
    clinicName = '';
    loadingData = true;
    description = new FormControl('Test Campaign', [Validators.required]);
    itemCodes: ItemCode[] = [];
    healthFunds: string[] = [];
    selectedItemCodes = new FormControl<string[]>([]);
    selectedHealthInsurances = new FormControl<string[]>([]);
    campaigns: ICampaign[] = []

    eventInput = new Subject<void>();
    eventInput$ = this.eventInput.asObservable();

    campaignId: number = 0;
    smsTemplate = '';
    pendingPatients = [];
    campaignFilters: ICampaignFilter[]= [];
    isSendingSms = false;
    constructor(
      private clinicFacade: ClinicFacade,
      private campaignService: CampaignService,
      public dialog: MatDialog,
      public nofifyService: NotificationService,
      private commonDataservice: CommonDataService,
      private route: ActivatedRoute,
      private router: Router,
    ){
      this.dataSource = new MatTableDataSource([]);

      combineLatest([this.route.queryParams, this.clinicFacade.currentClinics$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, clinics]) => {
          this.campaignId = parseInt(params['campaign_id']) || undefined;
          if(clinics.length> 0) {
            this.clinicId = clinics[0].id;
            this.commonDataservice.getCampaignHealthFunds(this.clinicId).subscribe(result => {
              this.healthFunds = result.data;
            });
            this.clinicName = clinics[0].clinicName;
            this.getCreditData();
            this.campaignService.getCampaigns(this.clinicId).subscribe(
              body => this.campaigns = body.data
            );
            if(this.campaignId){
              this.campaignService.getIndividualCampaign(
                this.clinicId,
                this.campaignId
              ).subscribe(campaignData => {
                this.smsTemplate = campaignData.data.sms_template;
                this.pendingPatients = campaignData.data.pending_campaign;
                this.description.setValue(campaignData.data.description);
                this.campaignFilters = campaignData.data.campaign_filters;
                this.loadFilterSettings(campaignData.data.campaign_filters);
                if(this.done?.length > 0) this.eventInput.next();
              });
            }else{
              this.todo = [...DefaultFilterElements];
              this.loadingData = false;
            }
          }
      });

      this.eventInput$.pipe(
        takeUntil(this.destroy$),
        debounceTime(300), // Wait for 300ms of silence
        switchMap(() => {
          this.loadingData = true;
          return this.campaignService.getCampaignPatients(this.clinicId, this.getFilterSettings());
        })
      ).subscribe(
        {
          next: (result) => {
            if(this.done.findIndex(d => d.filterName === 'overdues') > -1){
              this.displayedColumns = [
                'select', 'patientName', 'previousCampaigns', 
                'lastAppointment', 
                'nextAppointment', 'mobile', 'email',
                'days_overdue', 'amount'
              ];
            }else{
              this.displayedColumns = [
                'select', 'patientName', 'previousCampaigns', 
                'lastAppointment', 
                'nextAppointment', 'mobile', 'email'
              ];
            }
            
            this.dataSource.data = result.data.map(r => {
              const prev_desc = r.prev_campaigns? this.findCampaignDescription(r.prev_campaigns): null;
              return {...r, 
                prev_campaigns_desc: prev_desc,
                prev_campaigns_desc_str: prev_desc?.join(" | ")
              }
            });
            this.selection.clear();
            if(this.campaignId){
              this.selection.select(...this.dataSource.data.filter(p => this.pendingPatients.findIndex(pendingP => pendingP.patient_id == p.patient_id) > -1));
            }else{
              this.selection.select(...this.dataSource.data);
            }
            this.loadingData = false;
          },
          error: (err) => {
            this.loadingData = false;
          }
        }
        
      );

      this.closeEvent$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(filterName => {
        const index = this.done.findIndex(d => d.filterName === filterName);
        this.todo.push(...this.done.splice(index, 1));
        if(this.done?.length > 0)
          this.eventInput.next();
        else {
          this.selection.clear();
          this.dataSource.data = [];
        }
      });

      this.commonDataservice.getCampaignPatients().subscribe(result => {
        this.itemCodes = result.data;
      });

      this.selectedItemCodes.valueChanges.pipe(
        takeUntil(this.destroy$),
      ).subscribe(
        value => {
          if(this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.treatment) > -1){
            this.eventInput.next();
          }
        }
      );

      this.selectedHealthInsurances.valueChanges.pipe(
        takeUntil(this.destroy$),
      ).subscribe(
        value => {
          if(this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.health_insurance) > -1){
            this.eventInput.next();
          }
        }
      );

      this.filterFormGroup.controls.patientAgeMax.valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
      ).subscribe((maxV) => {
        if(this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.patient_age) > -1){
          this.eventInput.next();
        }
      });

      this.filterFormGroup.controls.patientAgeMin.valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
      ).subscribe((minV) => {
        if(this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.patient_age) > -1){
          this.eventInput.next();
        }
      });


      this.filterFormGroup.controls.treatmentEnd.valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
      ).subscribe((value) => {
        if(this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.treatment) > -1){
          this.eventInput.next();
        }
      });
      
      this.filterFormGroup.controls.incomplete_tx_planEnd.valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
      ).subscribe((value) => {
        if(this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.incomplete_tx_plan) > -1){
          this.eventInput.next();
        }
      });
      
      this.filterFormGroup.controls.no_appointmentEnd.valueChanges.pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
      ).subscribe((value) => {
        if(this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.no_appointment) > -1){
          this.eventInput.next();
        }
      });

      this.campaignService.selectedIcon$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(v => {
        this.selectedFilterName = v;
      })  
    }

    selection = new SelectionModel<CampaignElement>(true, []);
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    ngOnDestroy(): void {
      this.destroy.next();
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = [
      'select', 'patientName', 'previousCampaigns', 
      'lastAppointment', 
      'nextAppointment', 'mobile', 'email',
    ];

    dataSource: MatTableDataSource<CampaignElement>;

    todo = [];

    done = [];

    drop(event: CdkDragDrop<string[]>, type = '') {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
          this.eventInput.next();
        }
    }

    getFilterSettings(): IGetPatientsFilterJson[] {
      
      return this.done.map(
        d => {
          const isDateRange = [CAMPAIGN_FILTERS.treatment, CAMPAIGN_FILTERS.incomplete_tx_plan, CAMPAIGN_FILTERS.no_appointment].indexOf(d.filterName) > -1;
          let filterSettings: any[] | undefined = [];
          if(isDateRange){
            const start = this.filterFormGroup.controls[d.filterName + 'Start'].value;
            const end = this.filterFormGroup.controls[d.filterName + 'End'].value;
            filterSettings.push(start? moment(start).format('YYYY-MM-DD'): '');
            filterSettings.push(end? moment(end).format('YYYY-MM-DD'): '');
          }
          if(d.filterName === CAMPAIGN_FILTERS.patient_age){
            filterSettings.push(this.filterFormGroup.controls.patientAgeMin.value, this.filterFormGroup.controls.patientAgeMax.value);
          } else if(d.filterName === CAMPAIGN_FILTERS.treatment){
            filterSettings.push(...this.selectedItemCodes.value.map(v => parseInt(v)));
          } else if(d.filterName === CAMPAIGN_FILTERS.health_insurance){
            filterSettings.push(...this.selectedHealthInsurances.value.map(v => v));
          } else if(d.filterName === CAMPAIGN_FILTERS.health_insurance){
            filterSettings.push(...this.selectedHealthInsurances.value.map(v => parseInt(v)));
          }else if(d.filterName === CAMPAIGN_FILTERS.overdues){
            // no filter settings
            filterSettings = undefined;
          }

          return  {
            filter: d.filterName,
            ...(filterSettings && { filter_settings: filterSettings}),
          }
        }
      )
    }

    loadFilterSettings(settings: ICampaignFilter[]) {
      const doneFilters = [];
      for(const setting of settings){
        
        if(setting.filter_name === 'treatment'){
          
          if(setting.filter_settings){
            const filterValues = setting.filter_settings?.split(',');
            this.filterFormGroup.controls['treatmentStart'].setValue(new Date(filterValues[0]));
            this.filterFormGroup.controls['treatmentEnd'].setValue(new Date(filterValues[1]));
            this.selectedItemCodes.setValue(filterValues.slice(2));
            doneFilters.push(setting.filter_name);
          }

        }else if(setting.filter_name === CAMPAIGN_FILTERS.health_insurance){
          
          if(setting.filter_settings){
            const filterValues = setting.filter_settings?.split(',');
            this.selectedHealthInsurances.setValue(filterValues);
            doneFilters.push(setting.filter_name);
          }

        }else if(setting.filter_name === 'patient_age'){
          const ages = setting.filter_settings?.split('-');
          if(ages && ages.length === 2){
            this.filterFormGroup.controls.patientAgeMin.setValue(parseInt(ages[0]));
            this.filterFormGroup.controls.patientAgeMax.setValue(parseInt(ages[1]));
            doneFilters.push(setting.filter_name);
          }
        } else if(setting.filter_name === 'incomplete_tx_plan'){
            const dates = setting.filter_settings?.split(',');
            if(dates && dates.length === 2){
              this.filterFormGroup.controls.incomplete_tx_planStart.setValue(new Date(dates[0]));
              this.filterFormGroup.controls.incomplete_tx_planEnd.setValue(new Date(dates[1]));
              doneFilters.push(setting.filter_name);
            }
        } else if(setting.filter_name === 'overdues'){
            doneFilters.push(setting.filter_name);
        }else if(setting.filter_name === 'no_appointment'){
          
          if(setting.filter_settings){
            const filterValues = setting.filter_settings?.split(',');
            this.filterFormGroup.controls['no_appointmentStart'].setValue(new Date(filterValues[0]));
            this.filterFormGroup.controls['no_appointmentEnd'].setValue(new Date(filterValues[1]));
            doneFilters.push(setting.filter_name);
          }
        }
      }
      this.done = [], this.todo = [];
      for(const filter of DefaultFilterElements){
        if(doneFilters.indexOf(filter.filterName) > -1){
          this.done.push({...filter});
        }else {
          this.todo.push({...filter});
        }
      }
    }

    findCampaignDescription(prev_campaigns: string) {
      return prev_campaigns?.split(',').map(p => {
        const cId = parseInt(p);
        return this.campaigns.find(c => c.id === cId)?.description || 'Unknown';
      });
    }

    remainCredits = 0;
    usedCredits = 0;
    costPerSMS = 0;
    getCreditData() {
      if(this.clinicId){
        this.campaignService.getCreditData(this.clinicId).subscribe(result => {
          this.remainCredits = result.data.remain_credits;
          this.usedCredits = result.data.used_credits;
          this.costPerSMS = result.data.cost_per_sms;
        });
      }
    }

    topPanelHeight: number = 50; // Initial width of the left panel (in percentage)
    isDragging: boolean = false;

    selectedFilterName = '';
  
    onMouseDown(event: MouseEvent) {
      this.isDragging = true;
    }
  
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
      if (!this.isDragging) return;
      const containerHeight = window.innerHeight; // Get the total width of the container
      const newTopPanelHeight = (event.clientY / containerHeight) * 100;
  
      if (newTopPanelHeight > 10 && newTopPanelHeight < 90) {
        // Restrict widths to avoid extreme resizing
        this.topPanelHeight = newTopPanelHeight;
      }
    }
  
    @HostListener('document:mouseup', ['$event'])
    onMouseUp() {
      this.isDragging = false; // Stop dragging
    }

    downloadCampaignList() {
      let columns: any = {
        patient_name: 'Patient Name',
        prev_campaigns_desc_str: 'Previous Campaigns',
        last_appointment: 'Last Appointment',
        last_provider: 'Last Provider',
        next_appointment: 'Next Appointment',
        next_provider: 'Next Provider',
        mobile: 'Ph Number',
        email: 'Email',
      };
      if(this.selection.selected?.length > 0){
        if(this.done.findIndex(d => d.filterName === 'overdues') > -1){
          columns.days_overdue = 'Overdues';
          columns.amount = 'Amount';
        }
        const csvContent = CsvUtil.convertToCsv(this.selection.selected, columns);
        CsvUtil.downloadCsv(csvContent, `campaign${moment().format('YYYY-MM-SSTHH:mm:ss')}.csv`);
      }
    }

    startCampaign(isDraft = false) {
      if(this.selection.selected.length > 0 && this.description.valid){
        const dialogRef = this.dialog.open(StartCampaignDialog, {
          data: {
            patient_id: this.selection.selected[0].patient_id,
            patient_name: this.selection.selected[0].patient_name,
            patients: this.selection.selected,
            clinicId: this.clinicId,
            clinicName: this.clinicName,
            remain_credits: this.remainCredits,
            isDraft: isDraft,
            campaignId: this.campaignId,
            sms_text: this.smsTemplate
          },
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result?.status){
            this.isSendingSms = true;
            const patientIds = this.selection.selected.map(s => s.patient_id);
            this.campaignService.createCampaign(
              this.clinicId,
              this.getFilterSettings(),
              patientIds,
              result.sms_text,
              isDraft,
              this.description.value,
              this.campaignId
            ).subscribe({
              next: (result) => {
                if(result.data[0] == result.data[1]){
                  this.nofifyService.showSuccess(`Sent successfully to ${result.data[0]} patients for "${this.description.value}" campaign.`);
                }else if(!isDraft){
                  this.nofifyService.showError(`Failed ${result.data[1] - result.data[0]} patients, Succeed to ${result.data[0]} patients for "${this.description.value}" campaign.`);
                }
                this.isSendingSms = false;
                this.router.navigateByUrl('/newapp/campaigns');
              },
              error: err => {
                console.log('Error - [createCampaign]:', err);
                this.isSendingSms = false;
              }
            });
          }
        });
      }
    }

    isValidForm(filterName: string){
      if(filterName === 'patient_age'){
        if(this.filterFormGroup.controls.patientAgeMin.value > 0) {
          return true;
        }
      }else if(filterName === 'treatment'){
        if( (this.filterFormGroup.controls.treatmentStart.value && this.filterFormGroup.controls.treatmentEnd.value) || this.selectedItemCodes.value?.length > 0){
          return true;
        }
      } if(filterName === CAMPAIGN_FILTERS.health_insurance) {
        if(this.selectedHealthInsurances.value?.length > 0){
          return true;
        }
      }else if(filterName === 'incomplete_tx_plan'){
        if(this.filterFormGroup.controls.incomplete_tx_planStart.value && this.filterFormGroup.controls.incomplete_tx_planEnd.value){
          return true;
        }
      }else if(filterName === 'overdues') {
        return true;
      } else if(filterName === 'no_appointment'){
        if(this.filterFormGroup.controls.no_appointmentStart.value && this.filterFormGroup.controls.no_appointmentEnd.value){
          return true;
        }
      }

      return false;
    }

    applyFilter(filterName: string) {
      const index = this.todo.findIndex(d => d.filterName === filterName);
      this.done.push(...this.todo.splice(index, 1));
      this.eventInput.next();
    }

    isSelected(filterName: string){
      return this.selectedFilterName === filterName;
    }

    isDoneFilter() {
      return  (this.done.findIndex(d => d.filterName === this.selectedFilterName) > -1) ;
    }

    getHelperTip(){
        switch(this.selectedFilterName){
            case CAMPAIGN_FILTERS.treatment:
              return 'Selects patients who have had the specified item codes performed within the specified date range.'
              break;
            case CAMPAIGN_FILTERS.incomplete_tx_plan:
              return 'Selects patients who have incomplete treatment plans created within the specified date range';
              break;
            case CAMPAIGN_FILTERS.overdues:
              return 'Selects patients with overdue amounts';
              break;
            case CAMPAIGN_FILTERS.health_insurance:
              return 'Selects patients with the specified health insurance provider/s'
              break;
            case CAMPAIGN_FILTERS.patient_age:
              return 'Selects patients within the selected age range';
              break;
            case CAMPAIGN_FILTERS.no_appointment:
              return 'Selects patients with no appointments scheduled within the specified date range';
              break;
            default:
              return '';
        }
    }
}