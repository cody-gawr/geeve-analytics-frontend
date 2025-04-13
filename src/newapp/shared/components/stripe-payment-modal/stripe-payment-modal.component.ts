import { environment } from '@/environments/environment';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import {
  Appearance,
  loadStripe,
  Stripe,
  StripeElements,
  StripeElementType,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { CommonDataService } from '../../services/common-data.service';

export interface DialogData {
  //totalCredits: number;
  notify_msg?: string;
  costPerSMS: number;
  clinic_id: number;
}

@Component({
  selector: 'credit-payment-dialog',
  templateUrl: 'stripe-payment-modal.component.html',
  styleUrls: ['stripe-payment-modal.component.scss'],
})
export class StripePaymentDialog {
  numberOfCreditsFormGroup: UntypedFormGroup;
  elements: StripeElements;
  stripe: Stripe;
  selectedCredit = 100;
  isReadyToPay = true;
  disabledSubmit = true;
  totalAmount = 0;
  taxAmount = 0;
  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<StripePaymentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private commonDataSrv: CommonDataService,
    private toastr: ToastrService
  ) {
    this.numberOfCreditsFormGroup = this.formBuilder.group({
      credits: [this.selectedCredit, Validators.required],
    });
  }

  public get subTotalAmount(): number {
    return (
      this.data.costPerSMS *
      <number>this.numberOfCreditsFormGroup.get('credits').value
    );
  }

  async initStripeElements() {
    this.stripe = await loadStripe(environment.stripeKey);
    this.commonDataSrv
      .createPaymentIntent(
        this.numberOfCreditsFormGroup.controls['credits'].value,
        this.data.clinic_id
      )
      .subscribe(resData => {
        const { clientSecret, totalAmount, taxAmount } = resData.data;
        this.totalAmount = totalAmount;
        this.taxAmount = taxAmount;
        const appearance: Appearance = {
          theme: 'stripe',
        };

        this.elements = this.stripe.elements({ appearance, clientSecret });

        const paymentElement = this.elements.create('payment', <
          StripePaymentElementOptions
        >{
          layout: 'tabs',
          paymentMethodOrder: ['card'],
        });
        paymentElement.mount('#payment-element');
        paymentElement.on('change', event => {
          if (event.complete) {
            this.disabledSubmit = false;
          }
        });
      });
  }

  async nextPaymentForm(stepper: MatStepper) {
    stepper.next();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmitClick(e: SubmitEvent) {
    e.preventDefault();
    this.disabledSubmit = true;
    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.href}`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      this.toastr.error(error.message);
      //showMessage(error.message);
    } else {
      this.toastr.error('An unexpected error occurred');
      //showMessage("An unexpected error occurred.");
    }

    this.disabledSubmit = false;
  }

  async selectionChange(event: StepperSelectionEvent) {
    this.isReadyToPay = event.selectedIndex == 0;
    this.disabledSubmit = !this.isReadyToPay;
    await this.initStripeElements();
  }
}
