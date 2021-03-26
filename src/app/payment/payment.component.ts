import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService, CookieOptionsArgs } from "angular2-cookie/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { PaymentService } from './payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  ngOnInit() {

  }

}
