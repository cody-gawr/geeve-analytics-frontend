import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SignupService } from "./signup.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  public xeroUrl: string = "";
  public token: string = "";
  public isLogin: boolean = false;
  loadAPI: Promise<any>;

  public loadStyle(stylePath: string) {
    const head = document.getElementsByTagName("head")[0];
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = `${stylePath}`;
    head.appendChild(style);
  }

  public loadScript(scriptPath: string) {
    let node = document.createElement("script");
    node.src = `${scriptPath}`;
    node.type = "text/javascript";
    node.async = true;
    node.charset = "utf-8";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  constructor(private signupService: SignupService,private route: ActivatedRoute) {
    
    this.route.queryParams
      .subscribe(params => {
        if(typeof(params.login) != 'undefined'){
          this.isLogin = true;
          this.openXero();
        }
        
      }
    )


    this.loadAPI = new Promise((resolve) => {      
      this.loadStyle("../../assets/styles/mailerlite/import.css");
      this.loadStyle("../../assets/styles/mailerlite/universal.css");
      // this.loadScript("../../assets/js/mailerlite/jquery.min.js");
      this.loadScript("../../assets/js/universal.js");
    });

    this.loadAPI = new Promise((resolve) => {
      setTimeout(() => {

        this.loadScript("../../assets/js/mailerlite/embed.js");
        this.loadScript("../../assets/js/mailerlite/webforms.min.js");
        this.loadScript(
          "../../assets/js/mailerlite/ml_jQuery.inputmask.bundle.min.js"
        );
        this.loadScript("../../assets/js/signupxero.js");
      }, 500);
    });

    // console.log("isloaded", this.loaded);

    // var ml_account = ml('accounts', '2348549', 'w4o2f2u2e9', 'load');
  }

  ngOnInit() {
    this.loadAPI.then((val) => {
      console.log(val);
      console.log("ml_account");
    });
   
  }

  public openXero() {

     this.signupService.getUrl().subscribe((res) => {
      if (res.status == 200) {
        this.xeroUrl = res.body.data;
        this.token = res.id;
        var win = window.open(this.xeroUrl, "MsgWindow", "width=400,height=400");
        var self = this;
        var timer = setInterval(function () {
          // Set Interval
          if (win.closed) {
            // Checking for wind close
            self.checkInfo(); // Calling API
            clearTimeout(timer); // Stop interval
          }
        }, 1000);
      }
    });
    
    
  }

  checkInfo() {
    this.signupService.getInfo(this.token).subscribe((res) => {
      if (res.status == 200) {
        $('form.ml-block-form input[aria-label="email"]').val(res.body.data.email);
        $('form.ml-block-form input[aria-label="name"]').val(res.body.data.name);
        $(
          'form.ml-block-form select[aria-label="country"] option:contains(Xero)'
        ).attr("selected", "selected");
      }
    });
  }
}
