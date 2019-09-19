import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { SubscriptionService } from './subscription.service';

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
  constructor(private fb: FormBuilder, private router: Router, private subscriptionService: SubscriptionService,private _cookieService: CookieService) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
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
  

  openNav() {
      $("#myNav").css('width','100%');
  }
  closeNav() {
      $("#myNav").css('width','0%');

  }
  getPlans() {
          this.errorLogin  =false;
  this.subscriptionService.getPlans().subscribe((res) => {
       if(res.message == 'success'){
        res.data.forEach((res,key) => {
          var temp= {plan:'',allowedClinics:'',description:'',amount:'',discount:'',id:''};
          temp.id =res.id;          
          temp.plan =res.plan;
          temp.allowedClinics =res.allowedClinics;  
          temp.description =res.description;  
          temp.amount =res.amount;  
          temp.discount =res.discount; 
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
