import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService, CookieOptions } from "ngx-cookie";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { SupportService } from './support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class SupportComponent implements OnInit {
  public form: FormGroup;
  public errorLogin = false;
  constructor(private fb: FormBuilder, private router: Router, private supportService: SupportService,private _cookieService: CookieService) {}

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
         $('ul.list-circles-point li').click(function(){
              var target = $(this).attr("data-target");
               $('.list-circles-point li').removeClass("active");
               $('.testimonial-text').removeClass("active");
               $('.testimonial-img').removeClass("active");
         
               $(this).addClass("active");
               $(target).addClass("active");
           });
         
         
               $('.testimonial-img').click(function(){
                var target = $(this).attr("data-target");
                var target2 = $(this).attr("data-targets");
                 $('.list-circles-point li').removeClass("active");
                 $('.testimonial-text').removeClass("active");
                 $('.testimonial-img').removeClass("active");
         
                 $(target2).addClass("active");
                 $(target).addClass("active");
             });
  }



  openNav() {
      $("#myNav").css('width','100%');
  }
  closeNav() {
      $("#myNav").css('width','0%');

  }
  onSubmit() {
          this.errorLogin  =false;

  this.supportService.login(this.form.value.uname, this.form.value.password).subscribe((res) => {
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

        let opts = { expires: new Date('2030-07-19') } as CookieOptions;
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

       if(datares['login_status'] == 0)
        window.location.href = '/assets/stepper/index.html';
        else
        this.router.navigate(['/dashboards/cliniciananalysis/1']);
      }
      else{
         this._cookieService.put("userid", datares['parentid'], opts);
         this._cookieService.put("childid", datares['userid'], opts);
         this._cookieService.put("dentistid", datares['dentistid'], opts);
         this.router.navigate(['/profile-settings/1']);
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
