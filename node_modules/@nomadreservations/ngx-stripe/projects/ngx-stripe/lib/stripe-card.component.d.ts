import { EventEmitter, OnInit } from '@angular/core';
import { Element as StripeElement } from './interfaces/element';
import { ElementsOptions } from './interfaces/elements';
import { StripeService } from './services/stripe.service';
export declare class StripeCardComponent implements OnInit {
    private stripeService;
    change: EventEmitter<{
        card: any;
        element: StripeElement;
    }>;
    complete: EventEmitter<{
        card: any;
        element: StripeElement;
    }>;
    error: EventEmitter<any>;
    private card?;
    private element?;
    private options;
    private options$;
    elementsOptions: ElementsOptions;
    private elementsOptions$;
    constructor(stripeService: StripeService);
    ngOnInit(): void;
    getCard(): StripeElement | undefined;
}
