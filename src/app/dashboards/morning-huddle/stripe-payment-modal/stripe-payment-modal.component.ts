import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatStepper } from "@angular/material/stepper";
import {Appearance, loadStripe, Stripe, StripeElements, 
    StripeElementType, StripePaymentElementOptions} from '@stripe/stripe-js';
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../../environments/environment";
import { MorningHuddleService } from "../morning-huddle.service";


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
    elements: StripeElements
    stripe: Stripe
    creditOptions = [{amount: 50, label: '50'}, {amount: 100, label: '100'}, {amount: 500, label: '500'}, {amount: 1000, label: '1000'},]
    selectedCredit = 50;
    isReadyToPay = true;
    disabledSubmit = true;
    constructor(
        public dialogRef: MatDialogRef<StripePaymentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private morningHuddle: MorningHuddleService,
        private toastr: ToastrService,
    ) {
        //this.creditOptions = this.creditOptions.filter(it => it.amount > data.totalCredits);
    }

    async initStripeElements() {
        this.stripe = await loadStripe(environment.stripeKey);
        this.morningHuddle.createPaymentIntent(this.selectedCredit).subscribe(resData => {

            const { clientSecret } = resData.body.data;
    
            const appearance: Appearance = {
                theme: 'stripe',
            };
        
            this.elements = this.stripe.elements({ appearance, clientSecret });
        
        
            const paymentElementOptions: StripePaymentElementOptions | any = {
                layout: "tabs",
            };
    
            const stripeType:StripeElementType = "payment";
            
            const paymentElement = this.elements.create(stripeType, paymentElementOptions);
            paymentElement.mount("#payment-element");    
            this.disabledSubmit = false;
        });
    }  

    async nextPaymentForm(stepper: MatStepper) {
        this.disabledSubmit = true;
        await this.initStripeElements();
        this.isReadyToPay = false;
        stepper.next();
    }
    
    onNoClick(): void {
        this.dialogRef.close();
    }

    async onSubmitClick(e:SubmitEvent) {
        e.preventDefault();
        this.disabledSubmit = true;
        const { error } = await this.stripe.confirmPayment({
            elements: this.elements,
            confirmParams: {
              // Make sure to change this to your payment completion page
              return_url: `${window.location.origin}/morning-huddle?tab=2`,
            },
        });
        
        if (error.type === "card_error" || error.type === "validation_error") {
            this.toastr.error(error.message);
            //showMessage(error.message);
        } else {
            this.toastr.error("An unexpected error occurred");
            //showMessage("An unexpected error occurred.");
        }
        
        this.disabledSubmit = false;
    }
}
