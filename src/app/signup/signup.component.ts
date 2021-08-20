import { Component, OnInit,ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {  
  constructor() {}
  ngOnInit() {

  }

  public openXero(){
    var win = window.open('https://test-api.jeeve.com.au/test/analytics/Xeros/authorize', "MsgWindow", "width=400,height=400");         
  }  
}