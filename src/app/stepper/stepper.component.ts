import { Component, ViewChild, AfterViewInit, SecurityContext, ViewEncapsulation, OnInit  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from "../../environments/environment";
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';
import { CookieService } from "angular2-cookie/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  templateUrl: 'stepper.component.html'
})
export class StepperComponent implements AfterViewInit {
   ngAfterViewInit() {
   

   }
}