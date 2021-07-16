import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClinicGoalsService } from '../../clinic-goals/clinic-goals.service';
import { DentistGoalsService } from '../../dentist-goals/dentist-goals.service';
import { DentistService } from '../../dentist/dentist.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-alerts-settings',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent extends BaseComponent implements OnInit, AfterViewInit {
  clinic_id$ = new BehaviorSubject<any>(null);
  @Input() set clinicId(value: any) {
    this.clinic_id$.next(value);
  };

  constructor( private _cookieService: CookieService, private toastr: ToastrService) 
  {
    super();
  }

  ngOnInit()
  {
  }

  ngAfterViewInit() {
    combineLatest([
      this.clinic_id$,
    ])
      .pipe(
        takeUntil(this.destroyed$) 
      ).subscribe(inputs => {
        const [id] = inputs;     
      });
  } 
}
