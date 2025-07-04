import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CampaignService,
  DefaultFilterElements,
  ICampaign,
  ICampaignFilter,
  IFilterElement,
  IGetPatientsFilterJson,
} from '../services/campaign.service';
import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { SelectionModel } from '@angular/cdk/collections';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { StartCampaignDialog } from '../start-campaign-dialog/start-campaign-dialog.component';
import { NotificationService } from '@/newapp/shared/services/notification.service';
import { CommonDataService } from '@/newapp/shared/services/common-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CsvUtil } from '@/newapp/shared/utils';
import { CAMPAIGN_FILTERS } from '@/newapp/constants';
import { CsvColumnSelectDialog } from './csv-column-select-dialog/csv-column-select-dialog.component';
import { OptionDataType } from '@/newapp/shared/components/search-multi-select/search-multi-select.component';
import { Clinic } from '@/newapp/models/clinic';
import { StripePaymentDialog } from '@/newapp/shared/components/stripe-payment-modal/stripe-payment-modal.component';

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
export class CreateCampaignComponent implements AfterViewInit, OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();
  closeEvent = new Subject<string>();
  closeEvent$ = this.closeEvent.asObservable();
  @ViewChild('doneList', { read: CdkDropList }) doneList!: CdkDropList<IFilterElement[]>;

  metadataEvent = new Subject<void>();
  metadataEvent$ = this.metadataEvent.asObservable();
  disableHealthFundSelection = false;

  healthInsurance: string[] = [];

  filterFormGroup = new FormGroup({
    patientAgeMin: new FormControl(25),
    patientAgeMax: new FormControl(75),

    incomplete_tx_planStart: new FormControl<Date | null>(moment().startOf('year').toDate()),
    incomplete_tx_planEnd: new FormControl<Date | null>(moment().toDate()),

    no_appointmentStart: new FormControl<Date | null>(moment().startOf('year').toDate()),
    no_appointmentEnd: new FormControl<Date | null>(moment().toDate()),

    appointmentStart: new FormControl<Date | null>(moment().startOf('year').toDate()),
    appointmentEnd: new FormControl<Date | null>(moment().toDate()),

    treatmentStart: new FormControl<Date | null>(moment().startOf('year').toDate()),
    treatmentEnd: new FormControl<Date | null>(moment().toDate()),

    no_treatmentStart: new FormControl<Date | null>(moment().startOf('year').toDate()),
    no_treatmentEnd: new FormControl<Date | null>(moment().toDate()),
  });
  overdueDays = new FormControl<number>(30);
  patientStatus = new FormControl<string>('all');
  selection = new SelectionModel<CampaignElement>(true, []);

  clinicId = 0;
  clinicName = '';
  loadingData = true;
  description = new FormControl('Test Campaign', [Validators.required]);
  itemCodes: OptionDataType[] = [];
  healthFunds: OptionDataType[] = [];
  selectedItemCodes = new FormControl<string[]>([]);
  selectedItemCodesForNoTreatment = new FormControl<string[]>([]);
  selectedHealthInsurances = new FormControl<string[]>([]);
  campaigns: ICampaign[] = [];
  currentClinic: Clinic = null;
  filterElements: IFilterElement[] = [];

  eventInput = new Subject<void>();
  eventInput$ = this.eventInput.asObservable();

  campaignId: number = 0;
  smsTemplate = '';
  pendingPatients = [];
  campaignFilters: ICampaignFilter[] = [];
  isSendingSms = false;
  itemCodesAllCheckBox = new FormControl<boolean>(false);
  itemCodesAllCheckBoxForNoTreatment = new FormControl<boolean>(false);
  healthFundIncludeNoneCheckBox = new FormControl<boolean>(false);
  healthFundIncludeCheckBox = new FormControl<boolean>(false);
  treatmentItemCodesMode = new FormControl<'anyof' | 'allof'>('anyof');
  noTreatmentItemCodesMode = new FormControl<'anyof' | 'allof'>('anyof');

  patientStatusList = ['all', 'active', 'inactive'];
  private supportedPMs = ['d4w', 'exact', 'praktika'];

  // Marketing Prefreence Filter Dropdown
  selectedMarketingPreference = new FormControl<string>('');
  allMarketingPreferences: string[] = [];

  constructor(
    private clinicFacade: ClinicFacade,
    private campaignService: CampaignService,
    public dialog: MatDialog,
    public nofifyService: NotificationService,
    private commonDataservice: CommonDataService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // BUG - Initialization of data source does not occur here.
    this.clinicFacade.currentClinics$
      .pipe(
        takeUntil(this.destroy$),
        filter(clinics => clinics.length > 0),
        distinctUntilChanged((prev, curr) => prev[0]?.id === curr[0]?.id),
      )
      .subscribe(clinics => {
        if (clinics.length > 0) {
          // COMPONENT-TODO - Reset and initialize filters upon clinic change.
          this.initializeFilters();
          this.currentClinic = clinics[0];
          this.clinicId = clinics[0].id;
          const pms = clinics[0].pms;
          forkJoin([
            this.campaignService.getFilterElements(),
            this.supportedPMs.includes(pms)
              ? this.commonDataservice.getCampaignHealthFunds(this.clinicId)
              : of({ success: true, data: [] }),
            this.commonDataservice.getCampaignItemCodes(this.clinicId),
            this.commonDataservice.getQueryMethods_D4wPatients(this.clinicId), // Load all available marketing preferences
          ]).subscribe(
            ([filterElems, healthFundsPayload, itemCodesPayload, queryMethodPayload]) => {
              if (!filterElems.success) {
                this.nofifyService.showError('Failed to load filter elements');
                return;
              }
              this.filterElements = filterElems.data
                .filter(fe => fe && fe[pms])
                .map(fe => {
                  const icon = DefaultFilterElements.find(d => d.filterName === fe.name);
                  return {
                    id: fe.id,
                    iconName: icon?.iconName,
                    iconUrl: icon?.iconUrl,
                    title: icon?.title,
                    filterName: fe.name,
                    description: fe.description,
                    disabled:
                      pms === 'd4w' &&
                      [
                        CAMPAIGN_FILTERS.health_insurance,
                        CAMPAIGN_FILTERS.overdues,
                        CAMPAIGN_FILTERS.patient_status,
                        CAMPAIGN_FILTERS.marketing_preferences, // disable if clinic's utility version is under 1.42
                      ].indexOf(fe.name) >= 0 &&
                      !!clinics[0].utilityVer &&
                      clinics[0].utilityVer < '1.42.0.0',
                  };
                });
              this.healthFunds = healthFundsPayload.data.map(v => ({ value: v }));
              this.itemCodes = itemCodesPayload.data.map(d => ({
                label: d.item_display_name,
                value: d.item_code,
              }));
              this.allMarketingPreferences = queryMethodPayload.data.map(d => d.query_comm_methods); // Marketing Preference Filter Options
              this.metadataEvent.next();
            },
          );
        }
      });

    this.healthFundIncludeNoneCheckBox.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(v => {
      if (v) {
        this.selectedHealthInsurances.setValue([]);
        this.healthFundIncludeCheckBox.setValue(false);
      } else if (!this.selectedHealthInsurances.value?.length) {
        this.healthFundIncludeCheckBox.setValue(true);
      }
      if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.health_insurance) > -1) {
        this.eventInput.next();
      }
    });

    combineLatest([this.route.queryParams, this.clinicFacade.currentClinics$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, clinics]) => {
        this.campaignId = parseInt(params['campaign_id']) || undefined;
        if (clinics.length > 0) {
          this.clinicId = this.currentClinic.id;
          this.clinicName = this.currentClinic.clinicName;
          this.campaignService
            .getCampaigns(this.clinicId)
            .subscribe(body => (this.campaigns = body.data));
          if (this.campaignId) {
            this.campaignService
              .getIndividualCampaign(this.clinicId, this.campaignId)
              .subscribe(campaignData => {
                this.smsTemplate = campaignData.data.sms_template;
                this.pendingPatients = campaignData.data.pending_campaigns;
                this.description.setValue(campaignData.data.description);
                this.campaignFilters = campaignData.data.campaign_filters;
                this.metadataEvent.next();
              });
          } else {
            this.healthFundIncludeCheckBox.setValue(true);
            this.itemCodesAllCheckBox.setValue(true);
            this.itemCodesAllCheckBoxForNoTreatment.setValue(true);
            this.treatmentItemCodesMode.setValue('anyof');
            this.loadingData = false;
            this.metadataEvent.next();
          }
        }
      });

    this.metadataEvent$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // NOTE - Figure out why campaignId and campaignFilters are null.

      if (!!this.campaignId && this.campaignFilters.length > 0) {
        this.loadFilterSettings(this.campaignFilters);
        if (this.done?.length > 0) this.eventInput.next();
        else {
          this.loadingData = false;
        }
      } else if (!this.loadingData) {
        this.todo = [
          ...this.filterElements.filter(
            f => this.done.findIndex(d => d.filterName == f.filterName) === -1,
          ),
        ];
        if (this.done?.length > 0) {
          this.eventInput.next();
        }
      }
    });

    this.eventInput$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300), // Wait for 300ms of silence
        filter(() => this.done.length > 0),
        switchMap(() => {
          this.loadingData = true;
          return this.campaignService.getCampaignPatients(this.clinicId, this.getFilterSettings());
        }),
      )
      .subscribe({
        next: result => {
          if (this.done.findIndex(d => d.filterName === 'overdues') > -1) {
            this.displayedColumns = [
              'select',
              'patientName',
              'previousCampaigns',
              'lastAppointment',
              'nextAppointment',
              'mobile',
              'email',
              'health_fund',
              'days_overdue',
              'amount',
            ];
          } else {
            this.displayedColumns = [
              'select',
              'patientName',
              'previousCampaigns',
              'lastAppointment',
              'nextAppointment',
              'mobile',
              'email',
              'health_fund',
            ];
          }

          this.dataSource.data = result.data.map(r => {
            const prev_desc = r.prev_campaigns
              ? this.findCampaignDescription(r.prev_campaigns)
              : null;
            return {
              ...r,
              prev_campaigns_desc: prev_desc,
              prev_campaigns_desc_str: prev_desc?.join(' | '),
            };
          });
          this.selection.clear();
          if (this.campaignId) {
            this.selection.select(
              ...this.dataSource.data.filter(
                p =>
                  this.pendingPatients.findIndex(pendingP => pendingP.patient_id == p.patient_id) >
                  -1,
              ),
            );
          } else {
            this.selection.select(...this.dataSource.data);
          }
          this.loadingData = false;
        },
        error: err => {
          this.loadingData = false;
        },
      });

    this.closeEvent$.pipe(takeUntil(this.destroy$)).subscribe(filterName => {
      const index = this.done.findIndex(d => d.filterName === filterName);
      this.todo.push(...this.done.splice(index, 1));
      if (this.done?.length > 0) this.eventInput.next();
      else {
        this.selection.clear();
        this.dataSource.data = [];
      }
    });

    this.selectedItemCodes.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (value?.length > 0 && value?.length !== this.itemCodes?.length) {
        this.itemCodesAllCheckBox.setValue(false);
      } else {
        this.itemCodesAllCheckBox.setValue(true);
      }
      if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.treatment) > -1) {
        this.eventInput.next();
      }
    });

    this.selectedItemCodesForNoTreatment.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value?.length > 0 && value?.length !== this.itemCodes?.length) {
          this.itemCodesAllCheckBoxForNoTreatment.setValue(false);
        } else {
          this.itemCodesAllCheckBoxForNoTreatment.setValue(true);
        }
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.no_treatment) > -1) {
          this.eventInput.next();
        }
      });

    this.treatmentItemCodesMode.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.treatment) > -1) {
        this.eventInput.next();
      }
    });

    this.noTreatmentItemCodesMode.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.no_treatment) > -1) {
        this.eventInput.next();
      }
    });

    this.selectedHealthInsurances.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (value?.length > 0 && value?.length !== this.healthFunds?.length) {
        this.healthFundIncludeCheckBox.setValue(false);
        this.healthFundIncludeNoneCheckBox.setValue(false);
      } else {
        this.healthFundIncludeCheckBox.setValue(true);
      }

      if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.health_insurance) > -1) {
        this.eventInput.next();
      }
    });

    this.filterFormGroup.controls.patientAgeMax.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(maxV => {
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.patient_age) > -1) {
          this.eventInput.next();
        }
      });

    this.filterFormGroup.controls.patientAgeMin.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(minV => {
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.patient_age) > -1) {
          this.eventInput.next();
        }
      });

    this.patientStatus.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(minV => {
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.patient_status) > -1) {
          this.eventInput.next();
        }
      });

    this.selectedMarketingPreference.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(q_method => {
        if (
          this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.marketing_preferences) >
          -1
        ) {
          this.eventInput.next();
        }
      }); // when changing the marketing preference, the filter should be reloaded

    this.filterFormGroup.controls.treatmentEnd.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(value => {
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.treatment) > -1) {
          this.eventInput.next();
        }
      });

    this.filterFormGroup.controls.no_treatmentEnd.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(value => {
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.no_treatment) > -1) {
          this.eventInput.next();
        }
      });

    this.filterFormGroup.controls.incomplete_tx_planEnd.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(value => {
        if (
          this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.incomplete_tx_plan) > -1
        ) {
          this.eventInput.next();
        }
      });

    this.filterFormGroup.controls.no_appointmentEnd.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(value => {
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.no_appointment) > -1) {
          this.eventInput.next();
        }
      });

    this.overdueDays.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(value => {
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.overdues) > -1) {
          this.eventInput.next();
        }
      });

    this.filterFormGroup.controls.appointmentEnd.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(value => {
        if (this.done.findIndex(item => item.filterName === CAMPAIGN_FILTERS.appointment) > -1) {
          this.eventInput.next();
        }
      });

    this.campaignService.selectedIcon$.pipe(takeUntil(this.destroy$)).subscribe(v => {
      this.selectedFilterName = v;
    });
  }

  private initializeFilters() {
    this.todo = [];
    this.done = [];
    this.dataSource.data = [];
    this.selection.clear();
    this.selectedItemCodes.setValue([]);
    this.selectedItemCodesForNoTreatment.setValue([]);
    this.selectedHealthInsurances.setValue([]);
    const today = moment();
    const initialValueMap: Record<string, number | Date> = {
      patientAgeMin: 25,
      patientAgeMax: 75,

      incomplete_tx_planStart: moment().startOf('year').toDate(),
      incomplete_tx_planEnd: moment().toDate(),

      no_appointmentStart: moment().startOf('year').toDate(),
      no_appointmentEnd: moment().toDate(),

      appointmentStart: moment().startOf('year').toDate(),
      appointmentEnd: moment().toDate(),

      treatmentStart: today.clone().startOf('year').toDate(),
      treatmentEnd: today.clone().toDate(),

      no_treatmentStart: moment().startOf('year').toDate(),
      no_treatmentEnd: moment().toDate(),
    };

    Object.entries(initialValueMap).forEach(([formControlName, value]) => {
      (<FormControl<number | Date>>this.filterFormGroup.controls[formControlName]).setValue(value);
    });
  }

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
    this.destroy.complete();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'select',
    'patientName',
    'previousCampaigns',
    'lastAppointment',
    'nextAppointment',
    'mobile',
    'email',
    'health_fund',
  ];

  dataSource: MatTableDataSource<CampaignElement> = new MatTableDataSource([]);

  todo = [];

  done = [];

  // COMPONENT-TODO : Take a look at why drag-and-drop isn’t quite respecting what the user actually picked—something feels off there.
  drop(event: CdkDragDrop<IFilterElement[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // get the mouse X coordinate when the drop happened
      const pointerX = (event as any).pointerPosition?.x ?? (event as any).dropPoint?.x ?? 0;

      // grab all the rendered .drag-item elements
      const elems = Array.from(
        this.doneList.element.nativeElement.querySelectorAll<HTMLElement>('.drag-item'),
      );

      // find the index whose midpoint is just after where you dropped
      let targetIndex = elems.findIndex(el => {
        const { left, width } = el.getBoundingClientRect();
        return pointerX < left + width / 2;
      });

      if (targetIndex === -1) {
        // you dropped past all items → append
        targetIndex = elems.length;
      }

      // splice your cloned model into the array at the computed index
      const moved = event.previousContainer.data[event.previousIndex];
      event.previousContainer.data.splice(event.previousIndex, 1);

      // if you want a deep‐clone:
      const clone = { ...moved };
      event.container.data.splice(targetIndex, 0, clone);
      this.todo.sort(
        (a: IFilterElement, b: IFilterElement) => Number(a.disabled) - Number(b.disabled),
      );
      this.eventInput.next();

      // insert into target
      // console.log(event);
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
      // setTimeout(() => {
      //   if (this.done.length > 0) {
      //     this.eventInput.next();
      //   } else {
      //     this.selection.clear();
      //     this.dataSource.data = [];
      //   }
      // }, 0);
    }

    this.eventInput.next();

    console.log('DROP EVENT:', {
      from: event.previousIndex,
      to: event.currentIndex,
      prevList: event.previousContainer.id,
      nextList: event.container.id,
      dataBefore: {
        todo: this.todo.map(i => i.filterName),
        done: this.done.map(i => i.filterName),
      },
    });

    // TODO - Need fine tunning
    // const fromId = event.previousContainer.id;
    // const toId = event.container.id;

    // const previous = [...event.previousContainer.data];
    // const current = [...event.container.data];

    // if (fromId === toId) {
    //   moveItemInArray(current, event.previousIndex, event.currentIndex);

    //   if (toId === 'todoList') {
    //     this.todo = current;
    //   } else if (toId === 'doneList') {
    //     this.done = current;
    //   }
    // } else {
    //   const [movedItem] = previous.splice(event.previousIndex, 1);

    //   // Deep clone the moved item to break reference
    //   const clonedItem = { ...movedItem };

    //   current.splice(event.currentIndex, 0, clonedItem);

    //   if (event.previousContainer.id === 'todoList' && event.container.id === 'doneList') {
    //     this.todo = previous;
    //     this.done = current;
    //   } else if (event.previousContainer.id === 'doneList' && event.container.id === 'todoList') {
    //     this.done = previous;
    //     this.todo = current;
    //   }

    //   // Let the DOM stabilize before triggering data load
    //   setTimeout(() => {
    //     if (this.done.length > 0) {
    //       this.eventInput.next(); // triggers filter refresh
    //     } else {
    //       this.selection.clear(); // clear selected patients
    //       this.dataSource.data = []; // empty table
    //     }
    //   }, 0);
    // }
  }

  getFilterSettings(): IGetPatientsFilterJson[] {
    return this.done.map(d => {
      const isDateRange =
        [
          CAMPAIGN_FILTERS.treatment,
          CAMPAIGN_FILTERS.no_treatment,
          CAMPAIGN_FILTERS.incomplete_tx_plan,
          CAMPAIGN_FILTERS.no_appointment,
          CAMPAIGN_FILTERS.appointment,
        ].indexOf(d.filterName) > -1;

      let filterSettings: any[] | undefined = [];
      if (isDateRange) {
        const start = this.filterFormGroup.controls[d.filterName + 'Start'].value;
        const end = this.filterFormGroup.controls[d.filterName + 'End'].value;
        filterSettings.push(start ? moment(start).format('YYYY-MM-DD') : '');
        filterSettings.push(end ? moment(end).format('YYYY-MM-DD') : '');
      }
      if (d.filterName === CAMPAIGN_FILTERS.patient_age) {
        filterSettings.push(
          this.filterFormGroup.controls.patientAgeMin.value,
          this.filterFormGroup.controls.patientAgeMax.value,
        );
      } else if (d.filterName === CAMPAIGN_FILTERS.patient_status) {
        filterSettings.push(this.patientStatus.value);
      } else if (d.filterName === CAMPAIGN_FILTERS.marketing_preferences) {
        filterSettings.push(this.selectedMarketingPreference.value);
      } else if (d.filterName === CAMPAIGN_FILTERS.treatment) {
        filterSettings.push(this.treatmentItemCodesMode.value);
        if (
          this.selectedItemCodes.value?.length > 0 &&
          this.selectedItemCodes.value?.length < this.itemCodes?.length
        ) {
          filterSettings.push(...this.selectedItemCodes.value);
        }
      } else if (d.filterName === CAMPAIGN_FILTERS.no_treatment) {
        filterSettings.push(this.noTreatmentItemCodesMode.value);
        if (
          this.selectedItemCodesForNoTreatment.value?.length > 0 &&
          this.selectedItemCodesForNoTreatment.value?.length < this.itemCodes?.length
        ) {
          filterSettings.push(...this.selectedItemCodesForNoTreatment.value);
        }
      } else if (d.filterName === CAMPAIGN_FILTERS.health_insurance) {
        filterSettings.push(this.healthFundIncludeNoneCheckBox.value ? 1 : 0);
        if (
          this.selectedHealthInsurances.value?.length > 0 &&
          this.selectedHealthInsurances.value?.length < this.healthFunds?.length
        ) {
          filterSettings.push(...this.selectedHealthInsurances.value);
        }
      } else if (d.filterName === CAMPAIGN_FILTERS.overdues) {
        // no filter settings
        filterSettings.push(this.overdueDays.value);
      }

      return {
        filter: d.filterName,
        ...(filterSettings && { filter_settings: filterSettings }),
      };
    });
  }

  loadFilterSettings(settings: ICampaignFilter[]) {
    const doneFilters = [];
    for (const setting of settings) {
      if (setting.filter_name === CAMPAIGN_FILTERS.treatment) {
        if (setting.filter_settings) {
          const filterValues = setting.filter_settings?.split(',');
          // FIXME
          this.filterFormGroup.controls['treatmentStart'].setValue(new Date(filterValues[0]));
          this.filterFormGroup.controls['treatmentEnd'].setValue(new Date(filterValues[1]));
          const value = <any>filterValues[2]?.toLowerCase();
          if (['anyof', 'allof'].indexOf(value) > -1) {
            this.treatmentItemCodesMode.setValue(value);
            this.selectedItemCodes.setValue(filterValues.slice(3) || []);
          } else {
            this.selectedItemCodes.setValue(filterValues.slice(2) || []);
          }
          doneFilters.push(setting.filter_name);
        }
      } else if (setting.filter_name === CAMPAIGN_FILTERS.no_treatment) {
        if (setting.filter_settings) {
          const filterValues = setting.filter_settings?.split(',');
          this.filterFormGroup.controls['no_treatmentStart'].setValue(new Date(filterValues[0]));
          this.filterFormGroup.controls['no_treatmentEnd'].setValue(new Date(filterValues[1]));
          const value = <any>filterValues[2]?.toLowerCase();
          if (['anyof', 'allof'].indexOf(value) > -1) {
            this.noTreatmentItemCodesMode.setValue(value);
            this.selectedItemCodesForNoTreatment.setValue(filterValues.slice(3) || []);
          } else {
            this.selectedItemCodesForNoTreatment.setValue(filterValues.slice(2) || []);
          }
          doneFilters.push(setting.filter_name);
        }
      } else if (setting.filter_name === CAMPAIGN_FILTERS.health_insurance) {
        if (setting.filter_settings) {
          const filterValues = setting.filter_settings?.split(',');
          if (filterValues?.length > 0) {
            this.healthFundIncludeNoneCheckBox.setValue(!!parseInt(filterValues[0]));
            const rr = filterValues.slice(1);
            if (rr?.length > 0) {
              this.selectedHealthInsurances.setValue(rr);
            } else {
              this.healthFundIncludeCheckBox.setValue(true);
            }
          } else {
            this.healthFundIncludeNoneCheckBox.setValue(false);
            this.selectedHealthInsurances.setValue([]);
          }
          doneFilters.push(setting.filter_name);
        }
      } else if (setting.filter_name === CAMPAIGN_FILTERS.patient_age) {
        const ages = setting.filter_settings?.split('-');
        if (ages && ages.length === 2) {
          this.filterFormGroup.controls.patientAgeMin.setValue(parseInt(ages[0]));
          this.filterFormGroup.controls.patientAgeMax.setValue(parseInt(ages[1]));
          doneFilters.push(setting.filter_name);
        }
      } else if (setting.filter_name === CAMPAIGN_FILTERS.patient_status) {
        const status = setting.filter_settings;
        if (status) {
          this.patientStatus.setValue(status);
        } else this.patientStatus.setValue('all');
        doneFilters.push(setting.filter_name);
      } else if (setting.filter_name === CAMPAIGN_FILTERS.marketing_preferences) {
        const q_method = setting.filter_settings;
        if (q_method) {
          this.selectedMarketingPreference.setValue(q_method);
        } else this.selectedMarketingPreference.setValue('');
        doneFilters.push(setting.filter_name);
      } else if (setting.filter_name === 'incomplete_tx_plan') {
        const dates = setting.filter_settings?.split(',');
        if (dates && dates.length === 2) {
          this.filterFormGroup.controls.incomplete_tx_planStart.setValue(new Date(dates[0]));
          this.filterFormGroup.controls.incomplete_tx_planEnd.setValue(new Date(dates[1]));
          doneFilters.push(setting.filter_name);
        }
      } else if (setting.filter_name === 'overdues') {
        const filterValues = setting.filter_settings?.split(',');
        if (filterValues) this.overdueDays.setValue(parseInt(filterValues[0] || '30'));
        doneFilters.push(setting.filter_name);
      } else if (
        [CAMPAIGN_FILTERS.no_appointment, CAMPAIGN_FILTERS.appointment].indexOf(
          setting.filter_name,
        ) > -1
      ) {
        if (setting.filter_settings) {
          const filterValues = setting.filter_settings?.split(',');
          this.filterFormGroup.controls[setting.filter_name + 'Start'].setValue(
            new Date(filterValues[0]),
          );
          this.filterFormGroup.controls[setting.filter_name + 'End'].setValue(
            new Date(filterValues[1]),
          );
          doneFilters.push(setting.filter_name);
        }
      }
    }
    (this.done = []), (this.todo = []);
    for (const filter of this.filterElements) {
      if (doneFilters.indexOf(filter.filterName) > -1) {
        this.done.push({ ...filter });
      } else {
        this.todo.push({ ...filter });
      }
    }
  }

  findCampaignDescription(prev_campaigns: string) {
    return prev_campaigns?.split(',').map(p => {
      const cId = parseInt(p);
      return this.campaigns.find(c => c.id === cId)?.description || 'Unknown';
    });
  }

  getAllSelectedHealthFund() {
    return (
      (!this.selectedHealthInsurances.value.length ||
        this.selectedHealthInsurances.value.length === this.healthFunds.length) &&
      !this.healthFundIncludeNoneCheckBox.value
    );
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
    if (this.selection.selected?.length > 0) {
      let columns: Record<string, string> = {
        patient_name: 'Patient Name',
        email: 'Email',
        prev_campaigns_desc_str: 'Previous Campaigns',
        last_appointment: 'Last Appointment',
        last_provider: 'Last Provider',
        next_appointment: 'Next Appointment',
        next_provider: 'Next Provider',
        mobile: 'Ph Number',
        health_fund: 'Health Fund',
      };

      if (this.done.findIndex(d => d.filterName === 'overdues') > -1) {
        columns.days_overdue = 'Overdues';
        columns.amount = 'Amount';
      }

      const dialogRef = this.dialog.open(CsvColumnSelectDialog, {
        data: {
          columnsData: columns,
          selectedColumns: ['patient_name', 'email'],
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.length > 0) {
          const selectedColumns: Record<string, string> = {};
          result.forEach(element => {
            selectedColumns[element] = columns[element];
          });
          const csvContent = CsvUtil.convertToCsv(this.selection.selected, selectedColumns);
          CsvUtil.downloadCsv(csvContent, `campaign${moment().format('YYYY-MM-SSTHH:mm:ss')}.csv`);
        }
      });
    }
  }

  startCampaign(isDraft = false) {
    if (this.selection.selected.length > 0 && this.description.valid) {
      if (isDraft) {
        this.isSendingSms = true;
        const patientIds = this.selection.selected.map(s => s.patient_id);
        this.campaignService
          .createCampaign(
            this.clinicId,
            this.getFilterSettings(),
            patientIds,
            '',
            isDraft,
            this.description.value,
            this.campaignId,
          )
          .subscribe({
            next: result => {
              if (result.data[0] == result.data[1]) {
                this.nofifyService.showSuccess(
                  `Sent successfully to ${result.data[0]} patients for "${this.description.value}" campaign.`,
                );
              } else if (!isDraft) {
                this.nofifyService.showError(
                  `Failed ${result.data[1] - result.data[0]} patients, Succeed to ${result.data[0]} patients for "${this.description.value}" campaign.`,
                );
              }
              this.isSendingSms = false;
              this.router.navigateByUrl('/newapp/crm/campaigns');
            },
            error: err => {
              console.log('Error - [createCampaign]:', err);
              this.isSendingSms = false;
            },
          });
        return;
      }
      const dialogRef = this.dialog.open(StartCampaignDialog, {
        data: {
          patients: this.selection.selected,
          clinicId: this.clinicId,
          clinicName: this.clinicName,
          isDraft: isDraft,
          campaignId: this.campaignId,
          // sms_text: this.smsTemplate
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.status) {
          this.isSendingSms = true;
          const patientIds = this.selection.selected.map(s => s.patient_id);
          this.campaignService
            .createCampaign(
              this.clinicId,
              this.getFilterSettings(),
              patientIds,
              result.sms_text,
              isDraft,
              this.description.value,
              this.campaignId,
            )
            .subscribe({
              next: result => {
                if (result.data[0] == result.data[1]) {
                  this.nofifyService.showSuccess(
                    `Sent successfully to ${result.data[0]} patients for "${this.description.value}" campaign.`,
                  );
                } else if (!isDraft) {
                  this.nofifyService.showError(
                    `Failed ${result.data[1] - result.data[0]} patients, Succeed to ${result.data[0]} patients for "${this.description.value}" campaign.`,
                  );
                }
                this.isSendingSms = false;
                this.router.navigateByUrl('/newapp/crm/campaigns');
              },
              error: err => {
                console.log('Error - [createCampaign]:', err);
                this.isSendingSms = false;
              },
            });
        } else if (result.cost > 0) {
          this.dialog.open(StripePaymentDialog, {
            data: { costPerSMS: result.cost, clinic_id: this.clinicId },
          });
        }
      });
    }
  }

  get sortedTodoList() {
    return [...this.todo].sort((a, b) => a.disabled - b.disabled);
  }

  isValidForm(item: string | IFilterElement) {
    let filterName = '';
    if (typeof item === 'string') {
      filterName = item;
    } else {
      filterName = item.filterName;
      if (item.disabled) return false;
    }

    if (filterName === CAMPAIGN_FILTERS.patient_age) {
      if (this.filterFormGroup.controls.patientAgeMin.value > 0) {
        return true;
      }
    } else if (filterName === CAMPAIGN_FILTERS.patient_status) {
      if (this.patientStatus.value) {
        return true;
      }
    } else if (filterName === CAMPAIGN_FILTERS.marketing_preferences) {
      if (this.selectedMarketingPreference.value) {
        return true;
      }
    } else if (filterName === CAMPAIGN_FILTERS.treatment) {
      if (
        (this.filterFormGroup.controls.treatmentStart.value &&
          this.filterFormGroup.controls.treatmentEnd.value) ||
        this.selectedItemCodes.value?.length > 0
      ) {
        return true;
      }
    } else if (filterName === CAMPAIGN_FILTERS.no_treatment) {
      if (
        this.filterFormGroup.controls.no_treatmentStart.value &&
        this.filterFormGroup.controls.no_treatmentEnd.value
      ) {
        return true;
      }
    }
    if (filterName === CAMPAIGN_FILTERS.health_insurance) {
      return true;
    } else if (filterName === CAMPAIGN_FILTERS.incomplete_tx_plan) {
      if (
        this.filterFormGroup.controls.incomplete_tx_planStart.value &&
        this.filterFormGroup.controls.incomplete_tx_planEnd.value
      ) {
        return true;
      }
    } else if (filterName === CAMPAIGN_FILTERS.overdues) {
      if (this.overdueDays.value) {
        return true;
      }
    } else if (
      [CAMPAIGN_FILTERS.no_appointment, CAMPAIGN_FILTERS.appointment].indexOf(filterName) > -1
    ) {
      if (
        this.filterFormGroup.controls[filterName + 'Start'].value &&
        this.filterFormGroup.controls[filterName + 'End'].value
      ) {
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

  isSelected(filterName: string) {
    return this.selectedFilterName === filterName;
  }

  isDoneFilter() {
    return this.done.findIndex(d => d.filterName === this.selectedFilterName) > -1;
  }

  getHelperTip() {
    return (
      this.filterElements?.find(f => f.filterName === this.selectedFilterName)?.description || ''
    );
  }

  toggleAllSelectedItemCodes(event: any) {
    if (event.checked) {
      this.selectedItemCodes.setValue([]);
    } else if (!this.selectedItemCodes.value?.length) {
    }
  }

  toggleAllSelectedItemCodesForNoTreatment(event: any) {
    if (event.checked) {
      this.selectedItemCodesForNoTreatment.setValue([]);
    } else if (!this.selectedItemCodesForNoTreatment.value?.length) {
    }
  }

  toggleHealthFundInclude(event: any) {
    if (event.checked) {
      this.selectedHealthInsurances.setValue([]);
      this.healthFundIncludeNoneCheckBox.setValue(false);
    } else if (!this.selectedHealthInsurances.value?.length) {
      this.healthFundIncludeNoneCheckBox.setValue(true);
    }
  }

  getDesc(filterName: string) {
    switch (filterName) {
      case CAMPAIGN_FILTERS.patient_age:
        return `<p class="campaign-filter-desc">Patient is between the age of <span >${this.filterFormGroup.controls.patientAgeMin.value}</span> and <span >${this.filterFormGroup.controls.patientAgeMax.value}</span></p>`;
      case CAMPAIGN_FILTERS.incomplete_tx_plan:
        return `<p class="campaign-filter-desc">Patient has incomplete treatment plans created between <span>${moment(this.filterFormGroup.controls.incomplete_tx_planStart.value).format('DD/MM/YYYY')}</span> and <span>${moment(this.filterFormGroup.controls.incomplete_tx_planEnd.value).format('DD/MM/YYYY')}</span></p>`;
      case CAMPAIGN_FILTERS.treatment:
        let txt1 = 'any';
        if (this.selectedItemCodes.value.length > 0) {
          txt1 = this.treatmentItemCodesMode.value === 'anyof' ? 'any of' : 'all of';
        }

        return `<p class="campaign-filter-desc">Patient had ${txt1} treatment <span >${this.selectedItemCodes.value.join(', ')}</span> performed between <span>${moment(this.filterFormGroup.controls.treatmentStart.value).format('DD/MM/YYYY')}</span> and <span>${moment(this.filterFormGroup.controls.treatmentEnd.value).format('DD/MM/YYYY')}</span></p>`;
      case CAMPAIGN_FILTERS.no_treatment:
        let txt2 = 'any';
        if (this.selectedItemCodesForNoTreatment.value.length > 0) {
          txt2 = this.noTreatmentItemCodesMode.value === 'anyof' ? 'any of ' : 'all of';
        }

        return `<p class="campaign-filter-desc">Patient did not have ${txt2} treatment <span >${this.selectedItemCodesForNoTreatment.value.join(', ')}</span> performed between <span>${moment(this.filterFormGroup.controls.no_treatmentStart.value).format('DD/MM/YYYY')}</span> and <span>${moment(this.filterFormGroup.controls.no_treatmentEnd.value).format('DD/MM/YYYY')}</span></p>`;
      case CAMPAIGN_FILTERS.appointment:
        return `<p class="campaign-filter-desc">Patient has an appointment between <span>${moment(this.filterFormGroup.controls.appointmentStart.value).format('DD/MM/YYYY')}</span> and <span>${moment(this.filterFormGroup.controls.appointmentEnd.value).format('DD/MM/YYYY')}</span></p>`;
      case CAMPAIGN_FILTERS.no_appointment:
        return `<p class="campaign-filter-desc">Patient does not have an appointment between <span>${moment(this.filterFormGroup.controls.no_appointmentStart.value).format('DD/MM/YYYY')}</span> and <span>${moment(this.filterFormGroup.controls.no_appointmentEnd.value).format('DD/MM/YYYY')}</span></p>`;
      case CAMPAIGN_FILTERS.patient_status:
        return `<p class="campaign-filter-desc">Patient is of status <span>${this.patientStatus.value}</span></p>`;
      case CAMPAIGN_FILTERS.marketing_preferences:
        return `<p class="campaign-filter-desc">Marketing Preference is <span>${this.selectedMarketingPreference.value}</span></p>`;
      case CAMPAIGN_FILTERS.overdues:
        return `<p class="campaign-filter-desc">Patient has overdue amount at least <span>${this.overdueDays.value}></span> days overdue</p>`;
      case CAMPAIGN_FILTERS.health_insurance:
        if (
          this.selectedHealthInsurances.value?.length > 0 &&
          this.selectedHealthInsurances.value?.length < this.healthFunds?.length
        ) {
          return `<p class="campaign-filter-desc">Patient has health insurance with <span>${this.selectedHealthInsurances.value.join(', ')}</span></p>`;
        } else
          return this.healthFundIncludeNoneCheckBox.value
            ? `<p class="campaign-filter-desc">Patient don' have health insurance`
            : `Patient has health insurance</p>`;
      default:
        return '';
    }
  }

  trackByItem(index: number, item: IFilterElement) {
    return item.id || item.filterName || index;
  }
}
