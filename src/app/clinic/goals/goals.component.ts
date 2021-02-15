import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClinicGoalsService } from '../../clinic-goals/clinic-goals.service';
import { DentistGoalsService } from '../../dentist-goals/dentist-goals.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-goals-settings',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent extends BaseComponent implements OnInit, AfterViewInit {
  clinic_id$ = new BehaviorSubject<any>(null);
  clinicAnalysisForm: FormGroup;
  clinicProcedureForm: FormGroup;
  frontDeskForm: FormGroup;
  marketingForm: FormGroup;
  financesForm: FormGroup;
  clinicAnalysisGoals: any = [];
  tabs: any = [];
  tabsConstants = {
    clinic_analysis: 'Clinic Analysis',
    clinic_procedure_and_referrals: 'Clinic Procedure & Referrals',
    front_desk : 'Front Desk',
    marketing: 'Marketing',
    finances: 'Finances'
  }
  goalsCategories: any = [
    { 
      id: 1,
      name: 'Entire Clinic'
    },
    {
      id: 2,
      name: 'Dentist Goals'
    },
  ];
  selectedGoalCategory$ = new BehaviorSubject<number>(1);
  selectedTab: string = this.tabsConstants.clinic_analysis;
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  };

  constructor(
    private clinicGoalsService: ClinicGoalsService,
    private dentistGoalsService: DentistGoalsService,
    private _cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { 
    super();
  }

  ngOnInit() {
    this.clinicAnalysisForm = this.fb.group({
      dentistprod: [null, Validators.compose([Validators.required])],
      treatmentplan: [null, Validators.compose([Validators.required])],
      planaverage: [null, Validators.compose([Validators.required])],
      recallrate: [null, Validators.compose([Validators.required])],
      rebookrate: [null, Validators.compose([Validators.required])],
      patientcomplaints: [null, Validators.compose([Validators.required])],
      newpatients: [null, Validators.compose([Validators.required])],
      hourlyrate: [null, Validators.compose([Validators.required])]
    });

    this.clinicProcedureForm = this.fb.group({     
      itempredictor: [null, Validators.compose([Validators.required])],
      ratio1: [null, Validators.compose([Validators.required])],
      ratio2: [null, Validators.compose([Validators.required])],
      ratio3: [null, Validators.compose([Validators.required])],
      totalrevenue: [null, Validators.compose([Validators.required])],
      referralclinician: [null, Validators.compose([Validators.required])]     
    });

    this.frontDeskForm = this.fb.group({
      utilisationrate: [null, Validators.compose([Validators.required])],
      recallprebook: [null, Validators.compose([Validators.required])],
      treatmentprebook: [null, Validators.compose([Validators.required])],
      fta: [null, Validators.compose([Validators.required])],
      uta: [null, Validators.compose([Validators.required])],
      noticks: [null, Validators.compose([Validators.required])],
      attendancerate: [null, Validators.compose([Validators.required])]
    });

    this.marketingForm = this.fb.group({
      ƒreferralpatient: [null, Validators.compose([Validators.required])],
      revenuereferral: [null, Validators.compose([Validators.required])],
      visits: [null, Validators.compose([Validators.required])],
      newpatients2: [null, Validators.compose([Validators.required])],
      patientcost: [null, Validators.compose([Validators.required])]
    });

    this.financesForm = this.fb.group({
      netprofit: [null, Validators.compose([Validators.required])],
      netprofitxero: [null, Validators.compose([Validators.required])],
      netprofitpms: [null, Validators.compose([Validators.required])],
      expenses: [null, Validators.compose([Validators.required])],
      productionclinician: [null, Validators.compose([Validators.required])],
      totalproduction: [null, Validators.compose([Validators.required])],
      collection: [null, Validators.compose([Validators.required])],
      visitproduction: [null, Validators.compose([Validators.required])],
      discount: [null, Validators.compose([Validators.required])],
      overdueaccount: [null, Validators.compose([Validators.required])]
    });


    this.tabs = {
      clinic_analysis: {
        patchValues: {},
        label: this.tabsConstants.clinic_analysis,
        form: this.clinicAnalysisForm,
        startIndex: 1,
        endIndex: 8,
        controls: [
          {
            label: 'dentist production',
            name: 'dentistprod',
            prefix: '$'
          },
          {
            label: 'treatment plan completion rate',
            name: 'treatmentplan',
            postfix: '%'
          },
          {
            label: 'treatment plan average cost',
            name: 'planaverage'
          },
          {
            label: 'recall prebook rate',
            name: 'recallrate',
            postfix: '%'
          },
          {
            label: 'treatment prebook rate',
            name: 'rebookrate',
            postfix: '%'
          },
          {
            label: 'no. patients complaints',
            name: 'patientcomplaints'
          },
          {
            label: 'hourly rate',
            name: 'hourlyrate',
            prefix: '$'
          },
          {
            label: 'no. new patients',
            name: 'newpatients'
          }
        ]
      },
      clinic_procedure_and_referrals: {
        patchValues: [],
        label: this.tabsConstants.clinic_procedure_and_referrals,
        form: this.clinicProcedureForm,
        startIndex: 9,
        endIndex: 14,
        controls: [
          {
            label: 'item predictor analysis value',
            name: 'itempredictor'
          },
          {
            label: 'predictor Ratio 1: (Crown to Large Filling Ratio)',
            name: 'ratio1'
          },
          {
            label: 'Predictor Ratio 2: (Extraction to RCT Ratio)',
            name: 'ratio2'
          },
          {
            label: 'Predictor Ratio 3: (RCT Conversion Ratio)',
            name: 'ratio3'
          },
          {
            label: 'Total Revenue of Clinician Per Procedure value',
            name: 'totalrevenue',
            prefix: '$'
          },
          {
            label: 'Referral to Other Clinicians Internal / External value',
            name: 'referralclinician',
            prefix: '$'
          },
        ]
      },
      front_desk: {
        patchValues: [],
        label: this.tabsConstants.front_desk,
        form: this.frontDeskForm,
        startIndex: 15,
        endIndex: 21,
        controls: [
          {
            label: 'Items Predictor Analysis value',
            name: 'utilisationrate',
            prefix: '$'
          },
          {
            label: 'Recall prebook rate (%) value',
            name: 'recallprebook',
            postfix: '%'
          },
          {
            label: 'Treatment prebook rate (%) value',
            name: 'treatmentprebook',
            postfix: '%'
          },
          {
            label: 'FTA ratio (%) value',
            name: 'fta',
            postfix: '%'
          },
          {
            label: 'UTA ratio (%) value',
            name: 'uta',
            postfix: '%'
          },
          {
            label: 'Number of Ticks value',
            name: 'noticks'
          },
          {
            label: 'Recall Attendance Rate value',
            name: 'attendancerate',
            postfix: '%'
          }
        ]
      },
      marketing: {
        patchValues: [],
        label: this.tabsConstants.marketing,
        form: this.marketingForm,
        startIndex: 22,
        endIndex: 26,
        controls: [
          {
            label: 'No. New Patients By Referral value',
            name: 'ƒreferralpatient'
          },
          {
            label: 'Revenue by Referral value',
            name: 'revenuereferral',
            prefix: '$'
          },
          {
            label: 'Total Visits',
            name: 'visits'
          },
          {
            label: 'No. New Patients',
            name: 'newpatients2'
          },
          {
            label: 'Cost of New Patient Acquisition value',
            name: 'patientcost',
            prefix: '$'
          }
        ]
      },
      finances: {
        patchValues: [],
        label: this.tabsConstants.finances,
        form: this.financesForm,
        startIndex: 27,
        endIndex: 36,
        controls: [
          {
            label: 'Net Profit value',
            name: 'netprofit',
            prefix: '$'
          },
          {
            label: 'Net Profit % (Xero)',
            name: 'netprofitxero',
            postfix: '%'
          },
          {
            label: 'Net Profit % (PMS)',
            name: 'netprofitpms',
            postfix: '%'
          },
          {
            label: 'Expenses value',
            name: 'expenses',
            prefix: '$'
          },
          {
            label: '% of Production By Clinician',
            name: 'productionclinician',
            postfix: '%'
          },
          {
            label: 'Total Production',
            name: 'totalproduction',
            prefix: '$'
          },
          {
            label: 'Collection',
            name: 'collection',
            prefix: '$'
          },
          {
            label: 'Production Per Visit value',
            name: 'visitproduction'
          },
          {
            label: 'Total Discounts value',
            name: 'discount',
            postfix: '%'
          },
          {
            label: 'Overdue Accounts value',
            name: 'overdueaccount',
            prefix: '$'
          }
        ]
      },
    }

  }

  ngAfterViewInit() {
    combineLatest([
      this.clinic_id$,
      this.selectedGoalCategory$
    ])
    .pipe(
      takeUntil(this.destroyed$)   
    ).subscribe(inputs => {
      const [id, selectedGoalCategory] = inputs;
      if (id) {
        switch (selectedGoalCategory) {
          case 1:
            this.clinicGoalsService.getClinicGoals(id).subscribe((res) => {
              if (res.message == 'success') {
                console.log('goal res', res);
                this.getGoalsForTabs(res.data);
              } else if (res.status == '401') {
                this.handleUnAuthorization();
              }
            }, error => {
              console.log('error', error)
            });
            break;

          case 2:
            this.dentistGoalsService.getDentistGoals(id).subscribe((res) => {
              if (res.message == 'success') {
                console.log('dentist res', res);
                this.getGoalsForTabs(res.data);
              } else if (res.status == '401') {
                this.handleUnAuthorization();
              }
            }, error => {
              console.log('error', error)
            });
            break;
        
          default:
            break;
        }
      }
    });
  }

  onTabChanged(event) {
    this.selectedTab = event;
  }

  handleGoalCategorySelection(event) {
    this.selectedGoalCategory$.next(event);
  }

  getGoalsForTabs(allGoals) {
    let start = 0;
    let end = 0;
    Object.keys(this.tabs).map(key => {     
      start = this.tabs[key].startIndex;
      end = this.tabs[key].endIndex;
      let index = 0;
      for (let i=start; i <= end; i++) {
        this.tabs[key].patchValues = {
          ...this.tabs[key].patchValues,
          [this.tabs[key].controls[index].name]: allGoals[i].value
        };
        index++;
      }
      this.tabs[key].form.patchValue(this.tabs[key].patchValues);
    });
  }

  getFormsData() {
    let formattedData: any = {};
    let start = 0;
    let end = 0;
    Object.keys(this.tabs).map(key => {
      start = this.tabs[key].startIndex;
      end = this.tabs[key].endIndex;
      let index = 0;
      for (let i = start; i <= end; i++) {
        formattedData[i] = this.tabs[key].form.get(this.tabs[key].controls[index].name).value;        
        index++;
      }
    });
    return formattedData;
  }

  onSubmit() {
    const allFormsData = this.getFormsData();
    let myJsonString = JSON.stringify(allFormsData);
    $('.ajax-loader').show();
    switch (this.selectedGoalCategory$.value) {
      case 1:
        this.updateClinicGoals(myJsonString);
        break;
      case 2:
        this.updateDentistGoals(myJsonString);
        break;
      default:
        break;
    }
  
  }

  updateClinicGoals(formData) {
    this.clinicGoalsService.updateClinicGoals(formData, this.clinic_id$.value).subscribe((res) => {
      $('.ajax-loader').hide();
      if (res.message == 'success') {
        this.toastr.success('Clinic Goals Updated');
      }
      else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error);
      $('.ajax-loader').hide();
    });
  }

  updateDentistGoals(formData) {
    this.dentistGoalsService.updateDentistGoals(formData, this.clinic_id$.value, '').subscribe((res) => {
      $('.ajax-loader').hide();
      if (res.message == 'success') {
        this.toastr.success('Dentist Goals Updated');
      } else if (res.status == '401') {
        this.handleUnAuthorization();
      }
    }, error => {
      console.log('error', error);
      $('.ajax-loader').hide();
    });
  }

  handleUnAuthorization() {
    this._cookieService.put("username", '');
    this._cookieService.put("email", '');
    this._cookieService.put("token", '');
    this._cookieService.put("userid", '');
    this.router.navigateByUrl('/login');
  }

}
