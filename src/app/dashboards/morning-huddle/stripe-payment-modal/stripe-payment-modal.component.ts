import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import {
  Appearance,
  loadStripe,
  Stripe,
  StripeElements,
  StripeElementType,
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { MorningHuddleService } from '../morning-huddle.service';

export interface DialogData {
  //totalCredits: number;
  notify_msg?: string;
  costPerSMS: number;
}

@Component({
  selector: 'stripe-payment-dialog',
  templateUrl: 'stripe-payment-modal.component.html',
  styleUrls: ['stripe-payment-modal.component.scss']
})
export class StripePaymentDialog {
  numberOfCreditsFormGroup: FormGroup;
  elements: StripeElements;
  stripe: Stripe;
  selectedCredit = 100;
  isReadyToPay = true;
  disabledSubmit = true;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StripePaymentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private morningHuddle: MorningHuddleService,
    private toastr: ToastrService
  ) {
    this.numberOfCreditsFormGroup = this.formBuilder.group({
      credits: [this.selectedCredit, Validators.required]
    });
  }

  async initStripeElements() {
    this.stripe = await loadStripe(environment.stripeKey);
    this.morningHuddle
      .createPaymentIntent(this.selectedCredit)
      .subscribe((resData) => {
        const { clientSecret } = resData.body.data;

        const appearance: Appearance = {
          theme: 'stripe'
        };

        this.elements = this.stripe.elements({ appearance, clientSecret });

        const paymentElementOptions: StripePaymentElementOptions | any = {
          layout: 'tabs'
        };

        const stripeType: StripeElementType = 'payment';

        const paymentElement = this.elements.create(
          stripeType,
          paymentElementOptions
        );
        paymentElement.mount('#payment-element');
        this.disabledSubmit = false;
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
        return_url: `${window.location.origin}/morning-huddle?tab=2`
      }
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

  onChangeCredits(event: KeyboardEvent) {
    console.log(event);
    this.selectedCredit = parseInt((<HTMLInputElement>event.target).value);
  }
}
