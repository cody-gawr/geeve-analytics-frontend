import { Component, OnDestroy, OnInit,ViewEncapsulation } from '@angular/core';
import { TasksService } from './tasks.service';
import { CookieService } from "ngx-cookie";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { HeaderService } from './../layouts/full/header/header.service';
import { ITooltipData } from '../shared/tooltip/tooltip.directive';
import { AppConstants } from '../app.constants';
import { ChartstipsService } from '../shared/chartstips.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit, OnDestroy {		
	constructor() { }
	ngOnInit() {
		  $('#title').html('Tasks');
	}
	ngOnDestroy() {
	}  
}
