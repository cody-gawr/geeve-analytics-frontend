import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { MarketingFacade } from '@/newapp/dashboard/facades/marketing.facade';
import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject, takeUntil, take, combineLatest, map } from 'rxjs';
export interface DialogData {
  title: string;
}

@Component({
  selector: 'mk-select-accounts-modal',
  templateUrl: 'select-accounts-modal.component.html',
  styleUrls: ['select-accounts-modal.component.scss'],
})
export class MkSelectAccountsModalComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  selectedAccounts = [];
  unselectedAccounts = [];

  get isLoading$() {
    return combineLatest([
      this.marketingFacade.isLoadingMkMyobAccounts$,
      this.marketingFacade.isLoadingMkXeroAccounts$,
    ]).pipe(map(([v1, v2]) => v1 || v2));
  }

  get isWaiting$() {
    return combineLatest([
      this.marketingFacade.isLoadingMkSaveMyobAccounts$,
      this.marketingFacade.isLoadingMkSaveXeroAccounts$,
    ]).pipe(map(([v1, v2]) => v1 || v2));
  }

  get connectedWith$() {
    return this.dashboardFacade.connectedWith$;
  }

  constructor(
    public dialogRef: MatDialogRef<MkSelectAccountsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dashboardFacade: DashboardFacade,
    private marketingFacade: MarketingFacade,
    private clinicFacade: ClinicFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.dashboardFacade.connectedWith$,
      this.marketingFacade.xeroAccounts$,
      this.marketingFacade.myobAccounts$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([isConnected, xeroAccounts, myobAccounts]) => {
        if (isConnected == 'xero') {
          this.selectedAccounts = xeroAccounts.data.selectedCategories;
          const result = [];
          for (let key in xeroAccounts.data.categories) {
            const val = xeroAccounts.data.categories[key];
            if (!this.selectedAccounts.includes(val)) {
              result.push(val);
            }
          }
          this.unselectedAccounts = result;
        } else if (isConnected == 'myob') {
          this.selectedAccounts = myobAccounts.data.selectedCategories;
          const result = [];
          for (let key in myobAccounts.data.categories) {
            const val = myobAccounts.data.categories[key];
            if (!this.selectedAccounts.includes(val)) {
              result.push(val);
            }
          }
          this.unselectedAccounts = result;
        } else {
          this.selectedAccounts = [];
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addAccount(val: string) {
    this.selectedAccounts = [...this.selectedAccounts, val];
    this.unselectedAccounts = [
      ...this.unselectedAccounts.filter(v => v != val),
    ];
  }

  removeAccount(val: string) {
    this.unselectedAccounts = [...this.unselectedAccounts, val];
    this.selectedAccounts = [...this.selectedAccounts.filter(v => v != val)];
  }

  onSubmitClick() {
    combineLatest([this.connectedWith$, this.clinicFacade.currentClinicId$])
      .pipe(take(1))
      .subscribe(([isCon, clinicId]) => {
        if (isCon == 'xero') {
          this.marketingFacade.saveXeroAccounts({
            clinicId,
            categories: this.selectedAccounts,
          });
        } else if (isCon == 'myob') {
          this.marketingFacade.saveMyobAccounts({
            clinicId,
            categories: this.selectedAccounts,
          });
        }
      });
  }
}
