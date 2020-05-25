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
import { SubscriptionService } from './subscription.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatInputModule } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { EventEmitter , Output, Input} from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class SubscriptionComponent implements OnInit {

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
  date = new Date();
  sliderimages:any;
  private warningMessage: string;

  public headerTitle:string;
  public headerDescription:string;
  public headerImageURL:any;
  public header_info:any;
  public social_info:any;
  public slider_info:any;
  private homeUrl = environment.homeUrl;

  public clinicName:string;
  public clinicAddress:string;
  public clinicContactNo:any;

  public facebookUrl :string;
  public twitterUrl :string;
  public linkedinUrl :string;
  public instagramUrl :string;
  public clinicLogo :any;
  public imageSliderConfig :any;
  public planSliderConfig:any;

  public DoctorName: string;
  public DoctorPractice: string;
  public DoctorDescription : any;
  public ClinicAbout : any;
  public practiceOwnerEmail :string;

  public stripeConnected = false;
  public contactuser_name: any;
  public contactuser_email: any;
  public contactuser_phone: any;
  public contactuser_message: any;
  public clinicEmail :any;
  public clinicTagline:any;
  public DefaultLogo :any;
  public DefaultHeaderImage :any;
  public sampleplan =false;
  options: FormGroup;
  public name;
  @ViewChild(SubscriptionComponent) table: SubscriptionComponent;
  constructor(notifierService: NotifierService,private elementRef: ElementRef, private fb: FormBuilder, private router: Router, private subscriptionService: SubscriptionService,private ClinicSettingsService:ClinicSettingsService,private _cookieService: CookieService,private route: ActivatedRoute, public dialog: MatDialog) {
     this.notifier = notifierService;
     this.DefaultLogo=this.homeUrl+"/assets/img/logo.png";
     this.DefaultHeaderImage=this.homeUrl+"/assets/img/headimage.jpg";

    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("clinic_id");
    this.user_id = this.route.snapshot.paramMap.get("user_id");
    var data =this.user_id.split("&");
    this.user_id = data[0];
    if(data[1]) {
    this.email = data[1];
    }
     if(data[2]) {
    this.name = data[2];
    }
    this.getClinicSettings();
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
      }, 2000);
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
    this.getPlans();
    this.planSliderConfig  = {
      "slidesToShow": 4, "slidesToScroll": 1,autoplay: true, dots:true,
      'responsive': [
       {
        'breakpoint': 767,
        'settings': {
        'slidesToShow': 1
       }
       }
      ]
    };
    this.imageSliderConfig = {"slidesToShow": 1,"slidesToScroll": 1, autoplay: true,"dots":true};


    this.contactusForm=this.fb.group({
          contactuser_name:[null, Validators.compose([Validators.required])],
          contactuser_email:[null, Validators.compose([Validators.required])],
          contactuser_phone:[null, Validators.compose([Validators.required])],
          contactuser_message:[null, Validators.compose([Validators.required])],
          clinicEmail:[null, Validators.compose([Validators.required])],
         })
  }
  isDecimal(value) {
 if(typeof value != 'undefined')
  {
    if(String(value).includes("."))
    return true;
  }
}
openDialog(id,amount) {
  if(id=="sampleplan1"){
    alert("This is the sample plan only for viewing . We will be back with our live plans soon. ");
    return false;
    }
    if(this.email&&this.name) 
    this.router.navigate(['/purchase-plan/'+id+'&'+this.email+'&'+this.name]);     
      else 
    this.router.navigate(['/purchase-plan/'+id]);

    // this.dialog.open(RegisterComponent, {
    //   width: '250px',
    //    data: {
    //     clinic_id: this.clinic_id,
    //     user_id:this.user_id,
    //     terms:this.terms,
    //     plan_id:id,
    //     plan_amount:amount
    //   }
    // }).afterClosed().subscribe(resp => {
    //   if (resp) {
    //     // const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === resp.id);
    //     // this.customers[index] = new Customer(resp);
    //     // this.subject$.next(this.customers);
    //   }
    // });
  }

  openNav() {
      $("#myNav").css('width','100%');
  }
  closeNav() {
      $("#myNav").css('width','0%');
  }
  public load_id;
  public load_preventative_plan;
  public load_treatment_inclusions;
  public load_treatment_exclusions;
  public load_totalAmount;
  public load_planName;
  public load_planLength;
  
  loadDesc(id, preventative_plan, treatment_inclusions, treatment_exclusions, totalAmount,planName, planLength) {
    $(".treatment_content").show();
    $('html, body').animate({
        scrollTop: $(".treatment_content").offset().top
    }, 800);
    this.load_id= id;
    this.load_preventative_plan = preventative_plan;
    this.load_treatment_inclusions =treatment_inclusions;
    this.load_treatment_exclusions = treatment_exclusions;
    this.load_totalAmount = totalAmount;
    this.load_planName = planName;
    this.load_planLength = planLength;

  }

  getPlans() {
      //    this.errorLogin  =false;
     
  this.subscriptionService.getPlans(this.clinic_id,this.user_id).subscribe((res) => {

       if(res.message == 'success'){
        res.data.forEach((res,key) => {
          var temp= {planName:'',planLength:'',totalAmount:'',treatments:'',description:'',isFeatured:'',preventative_discount:'',treatment_inclusions:'',id:'',discount:'',preventative_frequency:'',preventative_plan:'',treatment_exclusions:''};
          temp.id =res.id;          
          temp.planName =res.planName;
          temp.planLength =res.planLength;  
          temp.totalAmount =res.totalAmount; 
          temp.description =res.description;
          temp.isFeatured = res.isFeatured; 
          temp.preventative_discount =res.preventative_discount; 
          temp.discount =res.discount; 
          temp.preventative_frequency = res.preventative_frequency; 
          temp.preventative_plan = JSON.parse(res.preventative_plan); 
          temp.treatment_inclusions = JSON.parse(res.treatment_inclusions); 
          temp.treatment_exclusions = JSON.parse(res.treatment_exclusions); 
          this.plans.push(temp);
        });

       }
       else if(res.message == 'error'){
          var temp= {planName:'',planLength:'',totalAmount:'',treatments:'',description:'',isFeatured:'',preventative_discount:'',treatment_inclusions:'',id:'',discount:'',preventative_frequency:'',preventative_plan:'',treatment_exclusions:'','sampleplan':false};
          temp.id ="sampleplan101";          
          temp.planName ="Sample Plan";
          temp.planLength ="MONTHLY";  
          temp.totalAmount ="100";            
          temp.preventative_frequency ='2';
          temp.preventative_discount ='15';  
          temp.discount ='10';  
          temp.treatments = "Cleaning, ECG"; 
          temp.description ="This is the sample description";
          temp.isFeatured = "true"; 
          temp.sampleplan = true;
          this.plans.push(temp);
          this.errorLogin  =true;
       }
    }, error => {
    }    
    );
  }


public terms;
  // Get Clinic Settings
  getClinicSettings() {
     this.subscriptionService.getClinicSettings(this.clinic_id,this.user_id).subscribe((res) => {
             if(res.message == 'success'){
          const finalData = res.data;
           if(finalData[0].stripe_account_id)
           {
            this.stripeConnected = true;
           }

          if(finalData[0].header_info!="" && finalData[0].header_info!=null)
          {
           this.header_info = JSON.parse(finalData[0].header_info);  
           this.headerTitle = this.header_info.headerTitle;
           this.headerDescription = this.header_info.headerDescription;
          
           if(this.header_info.image!="" && this.header_info.image!='NULL' && this.header_info.image!='undefined' && this.header_info.image!=undefined){
              this.headerImageURL = this.header_info.image;
            }else{
              this.headerImageURL = this.DefaultHeaderImage; //Default Header Image 
            }

          }else{
            /* To load default content for first time */
            this.headerTitle = "Wanna Checkup Your Smiling Teeth";
            this.headerDescription = "The phrasal sequence of the Lorem Ipsum text is now so widespread and commonplace that many DTP programmes can generate dummy text using the starting sequence. The phrasal sequence of the Lorem Ipsum text is now so widespread and commonplace that many DTP programmes can generate dummy text using the starting sequence";
            this.headerImageURL = "https://staging-analytics.jeeve.com.au/assets/uploads/headimage.jpg";

          }
          if(finalData[0].social_info!="" && finalData[0].social_info!=null)
          {
            this.social_info = JSON.parse(finalData[0].social_info);
            this.facebookUrl = this.social_info.facebook;
            this.twitterUrl = this.social_info.twitter;
            this.linkedinUrl = this.social_info.linkedin;
            this.instagramUrl = this.social_info.instagram;
          }
          if(finalData[0].slider_info!="" && finalData[0].social_info!=null)
          {
            this.sliderimages = JSON.parse(finalData[0].slider_info);
          }else{
            /*  Load Default Single Image*/
            const defaultSlideImage = "http://localhost/jeevemembers/client2/src/assets/img/slide1.jpg"
            this.sliderimages =[{"file":defaultSlideImage}];
          } 

          this.clinicName =(finalData[0].clinicName!="") ? finalData[0].clinicName : "Clinic Name";
          this.clinicAddress =(finalData[0].address!="") ? finalData[0].address : "Default Lane 2, High Street, New York .";
          this.clinicAddress = '<i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;'+this.clinicAddress
          this.clinicContactNo =(finalData[0].phoneNo!="") ? finalData[0].phoneNo : "+123456789";
          this.clinicEmail =(finalData[0].clinicEmail!="") ? finalData[0].clinicEmail : "test@gmail.com";
          
          if(finalData[0].logo!="undefined" && finalData[0].logo!="" && finalData[0].logo!=undefined && finalData[0].logo!="NULL")
          {
            this.clinicLogo =finalData[0].logo;  
          }else{
            this.clinicLogo =this.DefaultLogo;
          }
          
      
          this.DoctorName = (finalData[0].Users.display_name!="") ? finalData[0].Users.display_name : "Doctor Name";
          this.DoctorPractice = (finalData[0].UserDetails.practice_desc!="") ? finalData[0].UserDetails.practice_desc : "Doctor Practice";
          this.DoctorDescription = (finalData[0].UserDetails.description!="") ? finalData[0].UserDetails.description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
          this.ClinicAbout = (finalData[0].description!=null) ? finalData[0].description :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
          this.practiceOwnerEmail = (finalData[0].Users.email!="") ? finalData[0].Users.email : "admin@jeevemembers.com" ; // For display only
       //   this.clinicEmail = (finalData[0].Users.email !="") ? finalData[0].Users.email :"admin@jeevemembers.com"; // Used for sending email of contact us form 
    
          this.clinicTagline = (finalData[0].clinicTagLine!=null) ? finalData[0].clinicTagLine : "Our <i class='fas fa-smile'></i> Are Valley Wide"; 
          this.terms= finalData[0].terms;
          // Used for sending email of contact us form 


       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );
  }

 scroll(sectionId) {
    document.querySelector('#'+sectionId).scrollIntoView({ behavior: 'smooth', block: 'center' });
 }
 submitContactForm($event){
  const formData=this.contactusForm.value;

this.subscriptionService.sendContactUsMail(formData.contactuser_name, formData.contactuser_email,formData.contactuser_phone,formData.contactuser_message,formData.clinicEmail).subscribe((res) => {
       if(res.message == 'success'){
       this.notifier.notify( 'success', 'You request has been sent to clinic owner successfully .' ,'vertical');
       }
    }, error => {
      this.warningMessage = "Please Provide Valid Inputs!";
    }    
    );  



 }





  
}
