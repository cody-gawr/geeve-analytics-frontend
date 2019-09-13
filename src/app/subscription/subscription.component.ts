import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./subscription.component.scss']
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
    this.getPlans();
  }
  getPlans() {
          this.errorLogin  =false;
  this.subscriptionService.getPlans().subscribe((res) => {
       if(res.message == 'success'){
        res.data.forEach((res,key) => {
          var temp= {plan:'',allowedClinics:'',description:'',amount:'',discount:''};
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
