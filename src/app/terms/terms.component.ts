import { Component, OnInit , ViewEncapsulation, Inject , ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import { NotifierService } from 'angular-notifier';
import { ClinicSettingsService } from '../clinic-settings/clinic-settings.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { TermsService } from './terms.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatInputModule } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { EventEmitter , Output, Input} from '@angular/core';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class TermsComponent implements OnInit {

  private readonly notifier: NotifierService;
  public form: FormGroup;
  public contactusForm: FormGroup;
  public errorLogin = false;
  public plans:any =[];
  clinic_id: any;
  user_id: any;
  display_name: string;
  email: string;
  user_type: string;
  fileInput: any ;
  password:string;
  
  sliderimages:any;
  private warningMessage: string;
  public terms;
  public DefaultLogo;
  public homeUrl;
  public DefaultHeaderImage;
  options: FormGroup;
  constructor(notifierService: NotifierService,private elementRef: ElementRef, private fb: FormBuilder, private router: Router, private termsService: TermsService,private ClinicSettingsService:ClinicSettingsService,private _cookieService: CookieService,private route: ActivatedRoute, public dialog: MatDialog) {
     this.notifier = notifierService;
     this.DefaultLogo=this.homeUrl+"src/assets/img/logo.png";
     this.DefaultHeaderImage=this.homeUrl+"src/assets/img/headimage.jpg";
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.user_id = this.route.snapshot.paramMap.get("id");
    this.getTerms();
    });

  $(window).scroll(function(){
    if ($(window).scrollTop() >= 20) {
        
       $('.sa-main-header').addClass('minheader');
      
       $('.min_header_hide').addClass('hide');
      
    }
    else {
      
        $('.sa-main-header').removeClass('minheader');
      
       $('.min_header_hide').removeClass('hide');
      
    }
  });
    $('.inr-link').click(function(){
      $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
      }, 1000);
      return false;
    }); 
    
    
    $('.sa_navclk').click(function() {
      $('.nav-sec').addClass('open');
      $('html').addClass('shownav');
      //$('html').addClass('noscroll');
    });
    
    $('.sa_navclose').click(function() {
      $('.nav-sec').removeClass('open');
      $('html').removeClass('shownav');
      //$('html').removeClass('noscroll');
    });
    
    
    $('.mobile_category_btn').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $("#sa_category_mobile").removeClass('sa_category_open');
        $('.mobile_category_over').addClass('sa_hide');
        $('html').removeClass('noscroll');
      } else {
        $(this).addClass('active');
        $("#sa_category_mobile").addClass('sa_category_open');
        $('.mobile_category_over').removeClass('sa_hide');
        $('html').addClass('noscroll');
      }
    });
    
    
    $('.mobile_category_over').click(function() {
      $('.mobile_category_btn').removeClass('active');
      $("html").removeClass('noscroll');
      $("#sa_category_mobile").removeClass('sa_category_open');
      $('.mobile_category_over').addClass('sa_hide');
    });
    
    $(window).scroll(function () {
      if($(this).scrollTop() > 1) {
        $('.sa-gotop').css({
          opacity: 1
        });
      } else {
        $('.sa-gotop').css({
          opacity: 0
        });
      }
    });
    $(document).on('click','.sa-gotop',function(){
    
      $('html, body').animate({
        scrollTop: '0px'
      }, 800);
      return false;
    });
    // this.planSliderConfig  = {
    //   "slidesToShow": 4, "slidesToScroll": 1,autoplay: true, dots:true,
    //   'responsive': [
    //    {
    //     'breakpoint': 767,
    //     'settings': {
    //     'slidesToShow': 1
    //    }
    //    }
    //   ]
    // };

    // this.imageSliderConfig = {"slidesToShow": 1,"slidesToScroll": 1, autoplay: true,"dots":true};
    this.contactusForm=this.fb.group({
          contactuser_name:[null, Validators.compose([Validators.required])],
          contactuser_email:[null, Validators.compose([Validators.required])],
          contactuser_phone:[null, Validators.compose([Validators.required])],
          contactuser_message:[null, Validators.compose([Validators.required])],
          clinicEmail:[null, Validators.compose([Validators.required])],
    })
  }

  openNav() {
      $("#myNav").css('width','100%');
  }
  closeNav() {
      $("#myNav").css('width','0%');
  }

  getTerms() {
     this.termsService.getTerms(this.user_id).subscribe((res) => {
       if(res.message == 'success'){
        this.terms = res.data[0].terms;
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }
  
}
