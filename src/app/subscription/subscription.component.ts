import { Component, OnInit , ViewEncapsulation, Inject , ViewChild, AfterViewInit} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
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

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class SubscriptionComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  public plans:any =[];
  clinic_id: any;
  user_id: any;
    display_name: string;
  email: string;
  user_type: string;
  fileInput: any ;
password:string;
  @ViewChild(SubscriptionComponent) table: SubscriptionComponent;
  constructor(private fb: FormBuilder, private router: Router, private subscriptionService: SubscriptionService,private _cookieService: CookieService,private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.clinic_id = this.route.snapshot.paramMap.get("clinic_id");
    this.user_id = this.route.snapshot.paramMap.get("user_id");
    });

     $(window).scroll(function(){
    if ($(window).scrollTop() >= 20) {
       $('#header').addClass('minheader');
       $('.rg-logo').addClass('minlogo');
       $('.min_header_hide').addClass('hide');
    }
    else {
      $('#header').removeClass('minheader');
      $('.rg-logo').removeClass('minlogo');
      $('.min_header_hide').removeClass('hide');      
    }
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
  }
  
openDialog(id,amount) {
    this.dialog.open(RegisterComponent, {
      width: '250px',
       data: {
        clinic_id: this.clinic_id,
        user_id:this.user_id,
        plan_id:id,
        plan_amount:amount
      }
    }).afterClosed().subscribe(resp => {
      if (resp) {
        // const index = this.customers.findIndex((existingCustomer) => existingCustomer.id === resp.id);
        // this.customers[index] = new Customer(resp);
        // this.subject$.next(this.customers);
      }
    });
  }

  openNav() {
      $("#myNav").css('width','100%');
  }
  closeNav() {
      $("#myNav").css('width','0%');

  }
  getPlans() {
      //    this.errorLogin  =false;
     
  this.subscriptionService.getPlans(this.clinic_id,this.user_id).subscribe((res) => {
  //  console.log(res);

       if(res.message == 'success'){
        res.data.forEach((res,key) => {
          var temp= {planName:'',planLength:'',totalAmount:'',treatments:'',description:'',id:''};
          temp.id =res.id;          
          temp.planName =res.planName;
          temp.planLength =res.planLength;  
          temp.totalAmount =res.totalAmount;  
          temp.treatments =res.treatments; 
          temp.description =res.description; 
          this.plans.push(temp);
        });
       }
       else if(res.message == 'error'){
          this.errorLogin  =true;
       }
       console.log(this.plans);
    }, error => {
    }    
    );
  }


  
}
