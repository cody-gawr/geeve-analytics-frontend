import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { RolesUsersService } from '../roles-users/roles-users.service';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  providers: [MenuItems,RolesUsersService]
})
export class SharedModule {}
