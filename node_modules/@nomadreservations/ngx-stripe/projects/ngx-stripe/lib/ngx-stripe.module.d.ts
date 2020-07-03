import { ModuleWithProviders } from '@angular/core';
import { Options } from './interfaces/stripe';
export interface NgxStripeModuleOptions {
    publishableKey?: string;
    options?: Options;
}
export declare class NgxStripeModule {
    static forRoot(publishableKey: string, options?: Options): ModuleWithProviders;
}
