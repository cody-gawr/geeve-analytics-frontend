import { Component,OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { DentistGoalsService } from './dentist-goals.service';
import { ActivatedRoute, Router } from "@angular/router";
import { DentistService } from '../dentist/dentist.service';
import { CookieService } from "angular2-cookie/core";
export interface Dentist {
  providerId: string;
  name: string;
}
@Component({
  selector: 'app-formlayout',
  templateUrl: './dentist-goals.component.html',
  styleUrls: ['./dentist-goals.component.scss']
})
export class DentistGoalsComponent implements OnInit {
   public clinic_id:any ={};
   public dentistCount:any ={};
    dentists: Dentist[] = [
       { providerId: 'all', name: 'All Dentists' },
    ];
   public form: FormGroup;
   public errorLogin = false;
          private warningMessage: string;
          public dentistprod:any =0;
          public treatmentplan =0;
          public planaverage =0;
          public recallrate =0;
          public rebookrate =0;
          public patientcomplaints =0;
          public hourlyrate =0;

          public newpatients = 0;
          public itempredictor = 0;
          public ratio1 =0;
          public ratio2 =0;
          public ratio3 =0;
          public totalrevenue =0;
          public referralclinician = 0;

          public utilisationrate = 0;
          public recallprebook = 0;
          public treatmentprebook =0;
          public fta =0;
          public uta =0;
          public noticks =0;
          public attendancerate = 0;

          public referralpatient = 0;
          public revenuereferral = 0;
          public visits =0;
          public newpatients2 =0;
          public patientcost =0;

          public netprofit:any =0;
          public netprofitxero =0;
          public netprofitpms =0;
          public expenses =0;
          public productionclinician =0;
          public totalproduction =0;
          public visitproduction =0;
          public collection =0;


          public discount:any =0;
          public overdueaccount =0;
          public dentist_id = '';
          // public chartData: any[] = [];
          public chartData:any = {};
          public user_id;
  options: FormGroup;

  constructor(private fb: FormBuilder,  private dentistGoalsService: DentistGoalsService, private route: ActivatedRoute, private dentistService: DentistService,private _cookieService: CookieService, private router: Router) {
    this.clinic_id = this.route.snapshot.paramMap.get("id");
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }

  ngOnInit() {
    $('.header_filters').removeClass('hide_header'); 
    $('.header_filters').removeClass('flex_direct_mar'); 
    
    this.user_id = this._cookieService.get("userid");
     this.route.params.subscribe(params => {
          if(this._cookieService.get("userid") != '1'){
            this.clinic_id = this.route.snapshot.paramMap.get("id");
          }
          else
          {
            this.clinic_id = '';
          }
          this.getDentistGoals();
          this.getDentists(); 
          if(this.user_id == '1') 
          {
             $('.header_filters').addClass('hide_header'); 
          }
          else {
            $('.external_clinic').show();
        $('.dentist_dropdown').show();
          }
        $('#title').html('Dentist Goals');
         if($('body').find('span#currentDentist').length > 0){
             var did= $('body').find('span#currentDentist').attr('did');
             $('.external_dentist').val(did);
          }
          else {
             $('.external_dentist').val('all');
          }
        // $('.external_clinic').show();
        // $('.external_dentist').hide();
     });
     this.form = this.fb.group({
      dentistprod: [null, Validators.compose([Validators.required])],
      treatmentplan: [null, Validators.compose([Validators.required])],
      planaverage: [null, Validators.compose([Validators.required])],
      recallrate: [null, Validators.compose([Validators.required])],
      rebookrate: [null, Validators.compose([Validators.required])],
      patientcomplaints: [null, Validators.compose([Validators.required])],
      newpatients: [null, Validators.compose([Validators.required])],
      hourlyrate: [null, Validators.compose([Validators.required])],
      itempredictor: [null, Validators.compose([Validators.required])],
      ratio1: [null, Validators.compose([Validators.required])],
      ratio2: [null, Validators.compose([Validators.required])],
      ratio3: [null, Validators.compose([Validators.required])],
      totalrevenue: [null, Validators.compose([Validators.required])],
      referralclinician: [null, Validators.compose([Validators.required])],
      utilisationrate: [null, Validators.compose([Validators.required])],
      recallprebook: [null, Validators.compose([Validators.required])],
      treatmentprebook: [null, Validators.compose([Validators.required])],
      fta: [null, Validators.compose([Validators.required])],
      uta: [null, Validators.compose([Validators.required])],
      noticks: [null, Validators.compose([Validators.required])],
      attendancerate: [null, Validators.compose([Validators.required])],
            referralpatient: [null, Validators.compose([Validators.required])],
      revenuereferral: [null, Validators.compose([Validators.required])],
      visits: [null, Validators.compose([Validators.required])],
      newpatients2: [null, Validators.compose([Validators.required])],
      patientcost: [null, Validators.compose([Validators.required])],

      netprofit: [null, Validators.compose([Validators.required])],
      netprofitxero: [null, Validators.compose([Validators.required])],
      netprofitpms: [null, Validators.compose([Validators.required])],
      expenses: [null, Validators.compose([Validators.required])],
      productionclinician: [null, Validators.compose([Validators.required])],
      totalproduction: [null, Validators.compose([Validators.required])],
      collection: [null, Validators.compose([Validators.required])],

      visitproduction: [null, Validators.compose([Validators.required])],
      discount: [null, Validators.compose([Validators.required])],
      overdueaccount: [null, Validators.compose([Validators.required])],


    });
  }
  initiate_dentist() {

    var val = $('.internal_dentist').val();
    this.loadDentist(val);
  }
  // For form validator
  email = new FormControl('', [Validators.required, Validators.email]);

  // Sufix and prefix
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  getDentistGoals(dentist_id ='' ) {
  this.dentistGoalsService.getDentistGoals(this.clinic_id,dentist_id).subscribe((res) => {
       if(res.message == 'success'){
          this.dentistprod =res.data[1].value;
          this.treatmentplan =res.data[2].value;
          this.planaverage =res.data[3].value;
          this.recallrate =res.data[4].value;
          this.rebookrate =res.data[5].value;
          this.patientcomplaints =res.data[6].value;
          this.hourlyrate =res.data[7].value;
          this.newpatients =res.data[8].value;

          this.itempredictor =res.data[9].value;
          this.ratio1 =res.data[10].value;
          this.ratio2 =res.data[11].value;
          this.ratio3 =res.data[12].value;
          this.totalrevenue =res.data[13].value;
          this.referralclinician =res.data[14].value;

          this.utilisationrate = res.data[15].value;
          this.recallprebook = res.data[16].value;
          this.treatmentprebook = res.data[17].value;
          this.fta = res.data[18].value;
          this.uta = res.data[19].value;
          this.noticks = res.data[20].value;
          this.attendancerate = res.data[21].value;

          this.referralpatient = res.data[22].value;
          this.revenuereferral = res.data[23].value;
          this.visits = res.data[24].value;
          this.newpatients2 = res.data[25].value;
          this.patientcost = res.data[26].value;

          this.netprofit = res.data[27].value;
          this.netprofitxero = res.data[28].value;
          this.netprofitpms = res.data[29].value;
          this.expenses = res.data[30].value;
          this.productionclinician = res.data[31].value;
          this.totalproduction = res.data[32].value;
          this.collection = res.data[33].value;
          this.visitproduction = res.data[34].value;
          this.discount = res.data[35].value;
          this.overdueaccount = res.data[36].value;


       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }

  onSubmit() {
  this.chartData[1] = this.form.value.dentistprod;
  this.chartData[2] = this.form.value.treatmentplan;
  this.chartData[3] = this.form.value.planaverage;
  this.chartData[4] = this.form.value.recallrate;
  this.chartData[5] = this.form.value.rebookrate;
  this.chartData[6] = this.form.value.patientcomplaints;
  this.chartData[7] = this.form.value.hourlyrate;
  this.chartData[8] = this.form.value.newpatients;

  this.chartData[9] = this.form.value.itempredictor;
  this.chartData[10] = this.form.value.ratio1;
  this.chartData[11] = this.form.value.ratio2;
  this.chartData[12] = this.form.value.ratio3;
  this.chartData[13] = this.form.value.totalrevenue;
  this.chartData[14] = this.form.value.referralclinician;

  this.chartData[15] = this.form.value.utilisationrate;
  this.chartData[16] = this.form.value.recallprebook;
  this.chartData[17] = this.form.value.treatmentprebook;
  this.chartData[18] = this.form.value.fta;
  this.chartData[19] = this.form.value.uta;
  this.chartData[20] = this.form.value.noticks;
  this.chartData[21] = this.form.value.attendancerate;

  this.chartData[22] = this.form.value.referralpatient;
  this.chartData[23] = this.form.value.revenuereferral;
  this.chartData[24] = this.form.value.visits;
  this.chartData[25] = this.form.value.newpatients2;
  this.chartData[26] = this.form.value.patientcost;

  this.chartData[27] = this.form.value.netprofit;
  this.chartData[28] = this.form.value.netprofitxero;
  this.chartData[29] = this.form.value.netprofitpms;
  this.chartData[30] = this.form.value.expenses;
  this.chartData[31] = this.form.value.productionclinician;
  this.chartData[32] = this.form.value.totalproduction;
  this.chartData[33] = this.form.value.collection;
  this.chartData[34] = this.form.value.visitproduction;
  this.chartData[35] = this.form.value.discount;
  this.chartData[36] = this.form.value.overdueaccount;
  var myJsonString = JSON.stringify(this.chartData);
  console.log(myJsonString);
   this.dentistGoalsService.updateDentistGoals(myJsonString, this.clinic_id, this.dentist_id).subscribe((res) => {
       if(res.message == 'success'){
        alert('Dentist Goals Updated');
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  } 

    // Get Dentist
    getDentists() {
      this.dentistService.getDentists(this.clinic_id).subscribe((res) => {
           if(res.message == 'success'){
              this.dentists= res.data;
              this.dentistCount= res.data.length;
           }
            else if(res.status == '401'){
              this._cookieService.put("username",'');
              this._cookieService.put("email", '');
              this._cookieService.put("token", '');
              this._cookieService.put("userid", '');
               this.router.navigateByUrl('/login');
           }
        }, error => {
          this.warningMessage = "Please Provide Valid Inputs!";
        }    
        );
  }
   private loadDentist(newValue) {
    this.dentist_id = newValue;
    this.getDentistGoals(newValue);
   }
}
