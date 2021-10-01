import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SignupService } from "./signup.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  public xeroUrl: string = "";
  public token: string = "";
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

  constructor(private signupService: SignupService) {
    this.loadAPI = new Promise((resolve) => {
      console.log("resolving promise...");
      this.loadStyle("../../assets/styles/mailerlite/import.css");
      this.loadStyle("../../assets/styles/mailerlite/universal.css");

      this.loadScript("../../assets/js/mailerlite/jquery.min.js");
      this.loadScript("../../assets/js/universal.js");
      this.loadScript("../../assets/js/mailerlite/embed.js");
      this.loadScript("../../assets/js/mailerlite/webforms.min.js");
      this.loadScript(
        "../../assets/js/mailerlite/ml_jQuery.inputmask.bundle.min.js"
      );
      this.loadScript("../../assets/js/signupxero.js");
    });
  }

  ngOnInit() {
    this.signupService.getUrl().subscribe((res) => {
      if (res.message == "success") {
        this.xeroUrl = res.data;
        this.token = res.id;
      }
    });
  }

  public openXero() {
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

  checkInfo() {
    this.signupService.getInfo(this.token).subscribe((res) => {
      if (res.message == "success") {
        $('form.ml-block-form input[aria-label="email"]').val(res.data.email);
        $('form.ml-block-form input[aria-label="name"]').val(res.data.name);
        $(
          'form.ml-block-form select[aria-label="country"] option:contains(Xero)'
        ).attr("selected", "selected");
      }
    });
  }
}
