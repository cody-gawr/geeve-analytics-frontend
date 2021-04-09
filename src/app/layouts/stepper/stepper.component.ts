import * as $ from 'jquery';
import { DOCUMENT, Location} from '@angular/common';
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
  AfterViewInit, Inject
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { StepperHeaderComponent } from './header/header.component';
import { StepperSidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { StepperHeaderService } from './header/header.service';
import { CookieService } from "ngx-cookie";

import { StepperHeaderrightComponent } from '../../layouts/stepper/headerright/headerright.component';

import { environment } from "../../../environments/environment";

/** @title Responsive sidenav */
@Component({
  selector: 'app-stepper-layout',
  templateUrl: 'stepper.component.html',
  styleUrls: []
})
export class StepperComponent implements OnDestroy, AfterViewInit {

  elem;
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
  public title;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems, private headerService: StepperHeaderService, private router: Router,private _cookieService: CookieService, private location: Location,
    private route: ActivatedRoute,@Inject(DOCUMENT) private document: any
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
   
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    document.addEventListener("fullscreenchange", this.onFullScreenChange, false);
document.addEventListener("webkitfullscreenchange", this.onFullScreenChange, false);
document.addEventListener("mozfullscreenchange", this.onFullScreenChange, false);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {
     this.title =  $('#page_title').val();
 this.elem = document.documentElement;
    // This is for the topbar search
    (<any>$('.srh-btn, .cl-srh-btn')).on('click', function() {
      (<any>$('.app-search')).toggle(200);
    });
     this.getClinics();
   
  $(".hamburger_menu").click(function(e){
    if($(this).hasClass('active'))
      $(this).removeClass('active');
    else
      $(this).addClass('active');
}); 
   $("#snav .mat-nav-list .sub-item").css('display','block');
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
fullScreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
}
onFullScreenChange() {
  //alert(window.screenTop);
if(window.screenTop>0) {
  $('.fullscreen').removeClass('active');
}
else if(window.screenTop==0)
  $('.fullscreen').addClass('active');

  // if in fullscreen mode fullscreenElement won't be null
}
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
        logout() {
      this.headerService.logout(this._cookieService.get("userid")).subscribe((res) => {
       console.log(res);
       if(res.message == 'success'){
        this._cookieService.put("username",'');
        this._cookieService.put("email", '');
        this._cookieService.put("token", '');
        this._cookieService.put("userid", '');
        this._cookieService.put("childid", '');
        this.router.navigate(['/login']);
       }
    }, error => {
    }    
    );
  }
  // Mini sidebar
}
