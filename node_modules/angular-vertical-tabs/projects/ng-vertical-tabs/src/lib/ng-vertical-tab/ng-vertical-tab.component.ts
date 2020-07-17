import { Component, Input } from '@angular/core';

import { NgVerticalTabsService } from '../ng-vertical-tabs.service';

@Component({
  selector: 'lib-ng-vertical-tab',
  templateUrl: './ng-vertical-tab.component.html',
  styleUrls: ['./ng-vertical-tab.component.scss']
})
export class NgVerticalTabComponent {
  @Input() tabTitle: string;
  @Input() active = false;
  @Input() template;
  @Input() dataContext;
  @Input() isCloseable = false;

  constructor(public tabsService: NgVerticalTabsService) {
  }
}
