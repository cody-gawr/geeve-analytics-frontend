import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CampaignService, ICampaign, ICampaignFilter, IGetPatientsFilterJson } from '../services/campaign.service';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { SelectionModel } from '@angular/cdk/collections';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { StartCampaignDialog } from '../start-campaign-dialog/start-campaign-dialog.component';
import { NotificationService } from '@/newapp/shared/services/notification.service';
import { CommonDataService, ItemCode } from '@/newapp/shared/services/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';

const DefaultFilterElements = [
  {
      iconName: 'medical_services',
      title: 'Treatment',
      filterName: 'treatment'
  },
  {
      iconName: 'list_alt',
      title: 'Incomplete TX Plans',
      filterName: 'incomplete_tx_plan'
  },
  {
      iconName: 'health_and_safety',
      title: 'Health Insurance',
      filterName: 'health_insurance'
  },
  {
      iconName: 'schedule',
      title: 'Overdues',
      filterName: 'overdues'
  },
  {
      iconName: 'personal_injury',
      title: 'Patient Age',
      filterName: 'patient_age'
  }
];

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
        // overduesStart: new FormControl<Date | null>(null),
        // overduesEnd: new FormControl<Date | null>(null),
        incomplete_tx_planStart: new FormControl<Date | null>(null),
        incomplete_tx_planEnd: new FormControl<Date | null>(null),
        treatmentStart: new FormControl<Date | null>(null),
        treatmentEnd: new FormControl<Date | null>(null),
    });
    clinicId = 0;
    clinicName = '';
    loadingData = true;
    description = new FormControl('Test Campaign', [Validators.required]);
    itemCodes: ItemCode[] = [];
    selectedItemCodes = new FormControl<string[]>([]);
    campaigns: ICampaign[] = []

    eventInput = new Subject<void>();
    eventInput$ = this.eventInput.asObservable();

    campaignId: number = 0;
    smsTemplate = '';
    pendingPatients = [];
    campaignFilters: ICampaignFilter[]= [];
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

        combineLatest([this.route.queryParams, this.clinicFacade.clinics$])
        .pipe(takeUntil(this.destroy$))
        .subscribe(([params, clinics]) => {
            this.campaignId = parseInt(params['campaign_id']) || undefined;
            if(clinics.length> 0) {
              this.clinicId = clinics[0].id;
              this.clinicName = clinics[0].clinicName;
              this.getCreditData();

              if(this.campaignId){
                this.campaignService.getCampaigns(this.clinicId).subscribe(
                  body => this.campaigns = body.data
                );
                this.campaignService.getIndividualCampaign(
                  this.clinicId,
                  this.campaignId
                ).subscribe(campaignData => {
                  console.log('campaign data', campaignData)
                  this.smsTemplate = campaignData.data.sms_template;
                  this.pendingPatients = campaignData.data.pending_campaign;
                  this.description.setValue(campaignData.data.description);
                  this.campaignFilters = campaignData.data.campaign_filters;
                  this.loadFilterSettings(campaignData.data.campaign_filters);
                  this.eventInput.next();
                  // this.campaignService.getCampaignPatients(this.clinicId, this.getFilterSettings()).subscribe((patients) => {
                  //   this.dataSource.data = patients.data;
                  //   this.selection.clear();
                  //   this.selection.select(...campaignData.data.pending_campaign?.map(d => {
                  //     const p = this.dataSource.data.find(p => p.patient_id === d.patient_id);
                  //     return p;
                  //     // else return {
                  //     //   clinic_id: d.clinic_id,
                  //     //   patient_id: d.patient_id,
                  //     //   patient_name: 'unknown',
                  //     //   mobile: d.phone_number,
                  //     //   last_appointment: 'unknown',
                  //     //   last_provider: 'unknown',
                  //     //   next_appointment: 'unknown',
                  //     //   next_provider: 'unknown',
                  //     //   prev_campaigns: 'unknown',
                  //     // }
                  //   }));
                  //   this.loadingData = false;
                  // });
                });
              }else{
                this.todo = DefaultFilterElements;
                combineLatest(
                  [
                    this.campaignService.getCampaigns(this.clinicId),
                    this.campaignService.getCampaignPatients(this.clinicId)
                  ]
                ).subscribe(([campaigns, patients]) => {
                  this.campaigns = campaigns.data;
                  this.dataSource.data = patients.data;
                  this.selection.clear();
                  this.selection.select(...this.dataSource.data);
                  this.loadingData = false;
                });
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
              this.dataSource.data = result.data;
              this.selection.clear();
              if(this.campaignId){
                this.selection.select(...this.pendingPatients?.map(d => {
                  const p = this.dataSource.data.find(p => p.patient_id === d.patient_id);
                  return p;
                  // else return {
                  //   clinic_id: d.clinic_id,
                  //   patient_id: d.patient_id,
                  //   patient_name: 'unknown',
                  //   mobile: d.phone_number,
                  //   last_appointment: 'unknown',
                  //   last_provider: 'unknown',
                  //   next_appointment: 'unknown',
                  //   next_provider: 'unknown',
                  //   prev_campaigns: 'unknown',
                  // }
                }));
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
          const index = this.done.findIndex(d => d.filter_name === filterName);
          this.todo.push(...this.done.splice(index, 1));
          this.eventInput.next();
        });

        this.commonDataservice.getCampaignPatients().subscribe(result => {
          this.itemCodes = result.data;
        })

        this.selectedItemCodes.valueChanges.subscribe(
          value => {
            if(this.done.findIndex(item => item.filterName === 'treatment') > -1){
              this.eventInput.next();
            }
          }
        );

        this.filterFormGroup.controls.patientAgeMax.valueChanges.pipe(
          debounceTime(300),
        ).subscribe((maxV) => {
          if(this.done.findIndex(item => item.filterName === 'patient_age') > -1){
            this.eventInput.next();
          }
        });

        this.filterFormGroup.controls.patientAgeMin.valueChanges.pipe(
          debounceTime(300),
        ).subscribe((minV) => {
          if(this.done.findIndex(item => item.filterName === 'patient_age') > -1){
            this.eventInput.next();
          }
        });


        this.filterFormGroup.controls.treatmentEnd.valueChanges.pipe(
          debounceTime(300),
        ).subscribe((value) => {
          if(this.done.findIndex(item => item.filterName === 'treatment') > -1){
            this.eventInput.next();
          }
        });
        
        this.filterFormGroup.controls.incomplete_tx_planEnd.valueChanges.pipe(
          debounceTime(300),
        ).subscribe((value) => {
          if(this.done.findIndex(item => item.filterName === 'incomplete_tx_plan') > -1){
            this.eventInput.next();
          }
        });
        
        
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
      'lastAppointment', 'lastProvider', 
      'nextAppointment', 'nextProvider'
    ];
    dataSource: MatTableDataSource<CampaignElement>;

    todo = [];

    done = [];

    drop(event: CdkDragDrop<string[]>) {
        console.log(event)
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        }
        // this.getCampaignPatients();
        this.eventInput.next();
    }

    getFilterSettings(): IGetPatientsFilterJson[] {
      
      return this.done.map(
        d => {
          const isDateRange = ['treatment', 'incomplete_tx_plan'].indexOf(d.filterName) > -1;
          const filterSettings = [];
          if(isDateRange){
            const start = this.filterFormGroup.controls[d.filterName + 'Start'].value;
            const end = this.filterFormGroup.controls[d.filterName + 'End'].value;
            filterSettings.push(start? moment(start).format('YYYY-MM-DD'): '');
            filterSettings.push(end? moment(end).format('YYYY-MM-DD'): '');
          }
          if(d.filterName === 'patient_age'){
            filterSettings.push(this.filterFormGroup.controls.patientAgeMin.value, this.filterFormGroup.controls.patientAgeMax.value);
          } else if(d.filterName === 'health_insurance') {

          } else if(d.filterName === 'treatment'){
            filterSettings.push(...this.selectedItemCodes.value.map(v => parseInt(v)));
          }

          return  {
            filter: d.filterName,
            filter_settings: filterSettings,
          }
        }
      )
    }

    loadFilterSettings(settings: ICampaignFilter[]) {
      const doneFilters = [];
      for(const setting of settings){
        const filterValues = setting.filter_settings.split(',');
        if(setting.filter_name === 'treatment'){
          if(setting.filter_settings){
            this.filterFormGroup.controls['treatmentStart'].setValue(new Date(filterValues[0]));
            this.filterFormGroup.controls['treatmentEnd'].setValue(new Date(filterValues[1]));
            this.selectedItemCodes.setValue(filterValues.slice(2));
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
        }
      }

      this.todo = DefaultFilterElements.filter(d => doneFilters.indexOf(d.filterName) === -1);
      this.done = DefaultFilterElements.filter(d => doneFilters.indexOf(d.filterName) > -1);
    }

    getCampaignDescription(prev_campaigns: string, isLast = false) {
      if(isLast){
        return prev_campaigns?.split(',').slice(2).map(p => {
          const cId = parseInt(p);
          return this.campaigns.find(c => c.id === cId);
        })
      }
      return prev_campaigns?.split(',').slice(0, 2).map(p => {
        const cId = parseInt(p);
        return this.campaigns.find(c => c.id === cId);
      })
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
    selectedIconObserver = new Subject<string>();
    selectedFilterName = '';
    public get selectedIcon$(): Observable<string> {
        return this.selectedIconObserver.asObservable().pipe(tap(v => console.log('v', v)), map(v => v));
    }
    public setSelectedIcon (value: string) {
        this.selectedFilterName = value;
        this.selectedIconObserver.next(value);
    }

  
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

    startCampaign(isDraft = false) {
      if(this.selection.selected.length > 0 && this.description.valid){
        const dialogRef = this.dialog.open(StartCampaignDialog, {
          width: '600px',
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
          console.log('The dialog was closed', result);
          if(result?.status){
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
                this.router.navigateByUrl('/newapp/campaigns');
                console.log('[createCampaign]:', result);
              },
              error: err => {
                console.log('Error - [createCampaign]:', err);
              }
            });
          }
        });
      }
    }

    add(event: MatChipInputEvent, type = 'treatment'): void {
      const value = (event.value || '').trim();
  
      // Add our fruit
      if (value) {
        if(type === 'health_insurance')
          this.healthInsurance.push(value);
      }
  
      // Clear the input value
      event.chipInput!.clear();
    }
  
    remove(value: string, type = 'treatment'): void {
      let index = 0;
      if(type === 'health_insurance')
        index = this.healthInsurance.indexOf(value);
  
      if (index >= 0) {
        if(type === 'health_insurance')
          this.healthInsurance.splice(index, 1);
      }
    }
  
    edit(targetValue: string, event: MatChipEditedEvent, type = 'treatment') {
      const value = event.value.trim();
  
      // Remove fruit if it no longer has a name
      if (!value) {
        this.remove(targetValue, type);
        return;
      }
  
      // Edit existing fruit

      let index = 0;
      if(type === 'health_insurance'){
        index = this.healthInsurance.indexOf(targetValue);
      }
      
      if (index >= 0) {
        if(type === 'health_insurance')
          this.healthInsurance[index] = value;
      }
    }
}