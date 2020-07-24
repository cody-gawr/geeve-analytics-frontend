import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { TestService } from './test.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { Http} from '@angular/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
elements: Elements;
card: StripeElement;

// optional parameters
elementsOptions: ElementsOptions = {
locale: 'es'
};

stripeTest: FormGroup;
  public form: FormGroup;
  public errortest = false;
  public errorLogin;
complete;
  constructor(private http : Http, private fb: FormBuilder,
    private stripeService: StripeService, private router: Router, private testService: TestService,private _cookieService: CookieService) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
name: ['', [Validators.required]]
});
this.stripeService.elements(this.elementsOptions)
.subscribe(elements => {
this.elements = elements;
console.log(this.elements);
// Only mount the element the first time
if (!this.card) {
this.card = this.elements.create('card', {
style: {
base: {
iconColor: '#666EE8',
color: '#31325F',
lineHeight: '40px',
fontWeight: 300,
fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
fontSize: '18px',
'::placeholder': {
color: '#CFD7E0'
}
}
}
});
this.card.mount('#card-element');
}
});
  }

buy() {
const name = this.stripeTest.get('name').value;

this.stripeService
.createToken(this.card, { name })
.subscribe(obj => {
if (obj) {
console.log("Token is --> ",obj.token.id);

this.http.post("http://localhost:3000/payme",{
token : obj.token.id
}).subscribe(
(res)=>{
console.log("The response from server is ",res);
console.log('Payment Done')
},
(err)=>{
console.log('The error is ',err)
})



} else {
// Error creating the token
console.log("Error comes ");
}
});
}
  onSubmit() {
          this.errorLogin  =false;
  this.testService.login(this.form.value.uname, this.form.value.password).subscribe((res) => {
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

        let opts: CookieOptionsArgs = {
            expires: new Date('2030-07-19')
        };
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

       // if(datares['login_status'] == 0)
       //  window.location.href = '/assets/stepper/index.html';
       //  else
        // this.router.navigate(['/dashboards/cliniciananalysis/1']);
        this.router.navigate(['/dashboards']);
      }
      else{
         this._cookieService.put("userid", datares['parentid'], opts);
         this._cookieService.put("childid", datares['userid'], opts);

        this.router.navigate(['/dashboards']);
      }

       }
       else if(res.message == 'error'){
          this.errorLogin  =true;
       }
    }, error => {
    }    
    );

  }
}
