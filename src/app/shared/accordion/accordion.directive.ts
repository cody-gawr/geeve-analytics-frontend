import { Directive, AfterContentChecked } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

import { AccordionLinkDirective } from './accordionlink.directive';

@Directive({
  selector: '[appAccordion]',
})
export class AccordionDirective implements AfterContentChecked {
  protected navlinks: Array<AccordionLinkDirective> = [];

  closeOtherLinks(selectedLink: AccordionLinkDirective): void {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link !== selectedLink) {
        link.selected = false;
      }
    });
  }

  addLink(link: AccordionLinkDirective): void {
    this.navlinks.push(link);
  }

  removeGroup(link: AccordionLinkDirective): void {
    const index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  checkOpenLinks() {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link.group) {
        const routeUrl = this.router.url;
        const currentUrl = routeUrl.split('/');
        if (currentUrl.indexOf(link.group) > 0) {
          link.selected = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }

  ngAfterContentChecked(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.checkOpenLinks();
      }
    });
  }

  constructor(private router: Router) {
    setTimeout(() => this.checkOpenLinks());
  }
}
