import { NgModule } from '@angular/core';

// import { MenuItems } from './menu-items/menu-items';
import { RolesUsersService } from '../roles-users/roles-users.service';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { TooltipComponent, TooltipContainerDirective } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { CommonModule } from '@angular/common';
import { TooltipLayoutComponent } from './tooltip/tooltip-layout.component';
import { SpinnerComponent } from './spinner.component';
import { StripePaymentDialog } from './stripe-payment-modal/stripe-payment-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../demo-material-module';
import { YoutubePreviewComponent } from './youtube-preview/youtube-preview.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    TooltipComponent,
    TooltipDirective,
    TooltipContainerDirective,
    TooltipLayoutComponent,
    SpinnerComponent,
    StripePaymentDialog,
    YoutubePreviewComponent,
    SafeUrlPipe,
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    TooltipDirective,
    TooltipContainerDirective,
    SpinnerComponent,
    StripePaymentDialog,
    YoutubePreviewComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, DemoMaterialModule],
  providers: [
    //MenuItems,
    RolesUsersService,
  ],
})
export class SharedModule {}
