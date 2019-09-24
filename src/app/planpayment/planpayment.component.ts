import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { LoginService } from '../login/login.service';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "@nomadreservations/ngx-stripe";

@Component({
  selector: 'app-planpayment',
  templateUrl: './planpayment.component.html',
  styleUrls: ['./planpayment.component.scss']
})
export class PlanpaymentComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  public plans =[];
  public plan_id;
  public encode_string
  public amount;
  public token;
  public user_id;
  public stripe_plan_id;
  public planName;
  public successMessage;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService,private _cookieService: CookieService, private route: ActivatedRoute) {}

  ngOnInit() {
     this.route.params.subscribe(params => {
      this.encode_string = this.route.snapshot.paramMap.get("id");
      this.checkString();
    });
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
    this.getPlans();
  }

checkString() {
  var string = atob(this.encode_string);
  var res = string.split("/");
  this.plan_id = res[0];
  this.user_id= res[1];
  this.loginService.checkuser(this.plan_id, this.user_id).subscribe((res) => {
       if(res.message == 'success'){
       }
       else if(res.message == 'error'){
          this.router.navigate(['/']);
       }
    }, error => {
    }    
    );
}
  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_fgXaq2pYYYwd4H3WbbIl4l8D00A63MKWFc',
      locale: 'auto',
      token: token => {
           this.loginService.createSubscription(token,this.stripe_plan_id,this.user_id).subscribe((res) => {
           if(res.message == 'success'){
            this.successMessage = 'Payment Completed Successfully! You will be logged in to the account!';

setTimeout(() => 
{
              this.loginService.autoLogin(this.user_id).subscribe((res) => {
               if(res.message == 'success'){
      var datares = [];
        datares['username'] = res.data.data.username;
        datares['email'] = res.data.data.email;
        datares['token'] = res.data.data.token;        
        datares['userid'] = res.data.data.id;      
        datares['parentid'] = res.data.data.parent_id;   
        datares['user_type'] = res.data.data.user_type;       
        datares['user_image'] = res.data.data.user_image;        

        datares['login_status'] = res.data.data.login_status;        
        datares['display_name'] = res.data.data.display_name;  
        datares['dentistid'] = res.data.data.dentist_id;        

        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
        this._cookieService.put("userid", '', opts);
        this._cookieService.put("childid", '', opts);
        this._cookieService.put("dentistid", '', opts);

        this._cookieService.put("username", datares['username'], opts);
        this._cookieService.put("email", datares['email'], opts);
        this._cookieService.put("token", datares['token'], opts);
        this._cookieService.put("user_type", datares['user_type'], opts);
       
        this._cookieService.put("login_status", datares['login_status'], opts);
        this._cookieService.put("display_name", datares['display_name'], opts);
        this._cookieService.put("user_image", datares['user_image'], opts);

        if(datares['user_type'] == '1') {
        this.router.navigate(['/users']);
         this._cookieService.put("userid", datares['userid'], opts);
      }
        else if(datares['user_type'] == '2') {
         this._cookieService.put("userid", datares['userid'], opts);

        this.router.navigate(['/dashboards/cliniciananalysis/1']);
               }
               else if(res.message == 'error'){
                  this.errorLogin  =true;
               }
             }
              }, error => {
              });
},
5000);    
           }
           else if(res.message == 'error'){
              this.errorLogin  =true;
           }
          }, error => {
          });
      }
     });

    handler.open({      
      name:  this.planName,
      amount: this.amount
    });
 
  }

 getPlans() {
  this.errorLogin  =false;
  this.loginService.getPlans().subscribe((res) => {
       if(res.message == 'success'){
        res.data.forEach((res,key) => {
          var temp= {plan:'',allowedClinics:'',description:'',amount:'',discount:'',id:''};
          if(res.id== this.plan_id) {
            this.amount = res.amount;
            this.stripe_plan_id = res.stripe_plan_id;
            this.planName = res.plan;
          }
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
    }, error => {
    }    
    );
  }
  get_amount() {
    let id:any =  $('#plans').val();
    this.amount= this.plans[id].amount;
    this.stripe_plan_id = this.plans[id].stripe_plan_id;
  }

}
