import { AfterContentInit, Component, ComponentFactoryResolver, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';

import { MatSelectionList } from '@angular/material';

import { NgVerticalTabsService } from '../ng-vertical-tabs.service';
import { NgVerticalTabComponent } from '../ng-vertical-tab/ng-vertical-tab.component';
import { DynamicTabAnchorDirective } from '../dynamic-tab-anchor.directive';

@Component({
  selector: 'lib-ng-vertical-tabs',
  templateUrl: './ng-vertical-tabs.component.html',
  styleUrls: ['./ng-vertical-tabs.component.scss']
})
export class NgVerticalTabsComponent implements AfterContentInit {
  @ContentChildren(NgVerticalTabComponent) tabs: QueryList<NgVerticalTabComponent>;
  @ViewChild(DynamicTabAnchorDirective, { static: false }) dynamicTabPlaceholder: DynamicTabAnchorDirective;

  @ViewChild(MatSelectionList, { static: false }) list: MatSelectionList;

  @Input() multi = true;
  @Input() selectFirstTab = true;
  @Input() showSelectAll = false;
  allSelected = true;

  dynamicTabs: NgVerticalTabComponent[] = [];

  lastSelectedOptions: string[];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              public tabService: NgVerticalTabsService) {
    this.tabService.multi = this.multi;
  }

  // contentChildren are set
  ngAfterContentInit() {
    // if there is no active tab set, activate the first
    if (this.selectFirstTab && !this.tabs.filter(tab => tab.active).length) {
      this.selectTab(this.tabs.first);
    } else {
      this.checkSelectAll();
    }
  }

  onNgModelChange(/*selected: string[]*/) {
    this.setOptions();
    this.toggleTabActivations();
    this.checkSelectAll();
  }

  selectTab(tab: NgVerticalTabComponent) {
    this.multi ?
      this.tabService.selectedOptions.push(tab.tabTitle)
      : this.tabService.selectedOptions = [tab.tabTitle];
    tab.active = true;

    if (!this.list || !this.list.options) {
      return;
    }

    const options = this.list.options.map(t => t.value);
    const s = new Set(this.tabService.selectedOptions);
    this.list.options.forEach(t => {
      t.selected = s.has(t.value);
      // console.info(`'${t.value}' selected:`, t.selected);
    });

    const optionsSet = new Set(options);
    this.tabService.selectedOptions.forEach(option => {
      if (!optionsSet.has(option)) {
        throw TypeError(`'${option}' not found in mat-selection-list`);
      }
    });

    this.checkSelectAll();
  }

  openTab(title: string, template, data, isCloseable = false) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      NgVerticalTabComponent
    );

    // create a component instance
    const componentRef = this.dynamicTabPlaceholder.viewContainer.createComponent(componentFactory);

    // set the according properties on our component instance
    const instance: NgVerticalTabComponent = componentRef.instance as NgVerticalTabComponent;
    instance.tabTitle = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;
    instance.active = true;

    this.dynamicTabs.push(instance);
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  closeTab(tab: NgVerticalTabComponent) {
    for (let i = 0; i < this.dynamicTabs.length; i++) {
      if (this.dynamicTabs[i] === tab) {
        this.dynamicTabs.splice(i, 1);

        this.dynamicTabPlaceholder.viewContainer.remove(i);
        this.tabService.selectedOptions = [tab.tabTitle];  // TODO: duplicate handling
        this.selectTab(this.tabs.first);
        break;
      }
    }
    this.checkSelectAll();
  }

  closeActiveTab() {
    if (this.multi) {
      console.warn('Closing the first active tab');
    }
    const activeTab = this.dynamicTabs.filter(tab => tab.active);
    if (activeTab.length > 0) {
      this.closeTab(activeTab[0]);
    }
    this.checkSelectAll();
  }

  toggleSelect() {
    this.allSelected ? this.list.deselectAll() : this.list.selectAll();
    this.allSelected = !this.allSelected;
    this.checkSelectAll();
  }

  private toggleTabActivations() {
    const arr: NgVerticalTabComponent[] = this.tabs.toArray().concat(this.dynamicTabs);
    if (arr == null || arr.length < 1) {
      return;
    }
    const s = new Set(this.tabService.selectedOptions);
    arr.forEach(tab => tab.active = s.has(tab.tabTitle));
  }

  private setOptions() {
    if (this.multi || !this.tabService.selectedOptions.length ||
      !this.lastSelectedOptions || !this.lastSelectedOptions.length) {
      return;
    }

    this.tabService.selectedOptions = this.tabService.selectedOptions.filter(
      tabTitle => tabTitle !== this.lastSelectedOptions[this.lastSelectedOptions.length - 1]
    );

    this.lastSelectedOptions = this.tabService.selectedOptions;
  }

  private checkSelectAll() {
    if (!this.list || !this.list.options) {
      return;
    }

    this.allSelected = this.list.options.length < 1 ? false
      : this.list.options.reduce((p, c) => p ? c.selected : p, true as boolean);
  }
}
