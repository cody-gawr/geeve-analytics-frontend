import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HeaderService } from './header/header.service';
import { CookieService } from "angular2-cookie/core";

import { environment } from "../../../environments/environment";
import {Location} from '@angular/common';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green: boolean;
  blue: boolean;
  dark: boolean;
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  showHide: boolean;
  sidebarOpened;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;
  public clinicsData:any[] = [];
  private apiUrl = environment.apiUrl;
  public finalUrl:string;
  public id:string;
  selectedClinic : any = "1";
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems, private headerService: HeaderService, private router: Router,private _cookieService: CookieService, private location: Location,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
   
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {

    // This is for the topbar search
    (<any>$('.srh-btn, .cl-srh-btn')).on('click', function() {
      (<any>$('.app-search')).toggle(200);
    });
     this.getClinics();
   

    // This is for the megamenu
  }
 private loadClinic(value) {
  this.finalUrl =this.router.url.substring(0, this.router.url.lastIndexOf('/') + 1);
  
  this.router.navigate([this.finalUrl+value]);
  //this.location.go(this.finalUrl+value);
 }
 private getClinics() { 
  this.headerService.getClinics().subscribe((res) => {
       if(res.message == 'success'){
        this.clinicsData = res.data;
       }
    }, error => {
     // this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );

  }
  // Mini sidebar
}
