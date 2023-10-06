import { ClinicFacade } from '@/newapp/clinic/facades/clinic.facade';
import { DashboardFacade } from '@/newapp/dashboard/facades/dashboard.facade';
import { FinanceFacade } from '@/newapp/dashboard/facades/finance.facade';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import _ from 'lodash';
import { Subject, takeUntil, combineLatest, map } from 'rxjs';
export interface DialogData {
  selectedData: any[];
  unSelectedData: any[];
}
import Swal from 'sweetalert2';

@Component({
  selector: 'mk-select-expenses-modal',
  templateUrl: 'select-expenses-modal.component.html',
  styleUrls: ['select-expenses-modal.component.scss'],
})
export class MkSelectExpensesModalComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  destroy$ = this.destroy.asObservable();

  selectedData: { value: number; name: string }[] = [];
  unSelectedData: { value: number; name: string }[] = [];

  get isLoading$() {
    return combineLatest([
      this.financeFacade.isLoadingFnExpenses$,
      //this.marketingFacade.isLoadingMkXeroAccounts$
    ]).pipe(
      takeUntil(this.destroy$),
      map(([v1]) => v1)
    );
  }

  // get isWaiting$(){
  //     return combineLatest([
  //         this.marketingFacade.isLoadingMkSaveMyobAccounts$,
  //         this.marketingFacade.isLoadingMkSaveXeroAccounts$
  //     ]).pipe(
  //         takeUntil(this.destroy$),
  //         map( ([v1, v2]) => v1 || v2)
  //     )
  // }

  get connectedWith$() {
    return this.dashboardFacade.connectedWith$.pipe(
      takeUntil(this.destroy$),
      map(v => v)
    );
  }

  constructor(
    public dialogRef: MatDialogRef<MkSelectExpensesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dashboardFacade: DashboardFacade,
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade
  ) {
    this.selectedData = data.selectedData;
    this.unSelectedData = data.unSelectedData;
    // combineLatest([
    //     this.dashboardFacade.connectedWith$,
    //     this.marketingFacade.xeroAccounts$,
    //     this.marketingFacade.myobAccounts$
    // ]).pipe(
    //     takeUntil(this.destroy$),
    // ).subscribe(([isConnected, xeroAccounts, myobAccounts]) => {
    //     if(isConnected == 'xero'){
    //         this.selectedAccounts = xeroAccounts.data.selectedCategories;
    //         const result = [];
    //         for(let key in xeroAccounts.data.categories){
    //             const val = xeroAccounts.data.categories[key];
    //             if(!this.selectedAccounts.includes(val)){
    //                 result.push(val);
    //             }
    //         }
    //         this.unselectedAccounts = result;
    //     }else if(isConnected == 'myob'){
    //         this.selectedAccounts = myobAccounts.data.selectedCategories;
    //         const result = [];
    //         for(let key in myobAccounts.data.categories){
    //             const val = myobAccounts.data.categories[key];
    //             if(!this.selectedAccounts.includes(val)){
    //                 result.push(val);
    //             }
    //         }
    //         this.unselectedAccounts = result;
    //     }else {
    //         this.selectedAccounts = [];
    //     }
    // });

    // combineLatest([
    //   this.financeFacade.expensesData$,
    //   this.financeFacade.expensesProduction$,
    //   this.clinicFacade.currentClinicId$,
    // ])
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(([expenses, production, clinicId]) => {
    //     //   if (typeof clinicId === "string") {
    //     //     this.datasets = [];
    //     //     let i = 0;
    //     //     _.chain(expenses)
    //     //       .groupBy("accountName")
    //     //       .map((items, accountName) => {
    //     //         return {
    //     //           items,
    //     //           accountName,
    //     //         };
    //     //       })
    //     //       .value()
    //     //       .forEach((v) => {
    //     //         const bgColor = DoughnutChartColors[i];
    //     //         i++;
    //     //         this.datasets.push({
    //     //           data: _.chain(v.items)
    //     //             .orderBy("clinicId", "asc")
    //     //             .value()
    //     //             .map(
    //     //               (item) =>
    //     //                 _.round((item.expense / production) * 100 * 10) / 10
    //     //             ),
    //     //           label: v.accountName,
    //     //           backgroundColor: bgColor,
    //     //           hoverBackgroundColor: bgColor,
    //     //         });
    //     //       });
    //     //     this.labels = _.chain(expenses)
    //     //       .unionBy((item) => item.clinicName)
    //     //       .value()
    //     //       .map((item) => item.clinicName);
    //     //   } else {
    //     if (production > 0) {
    //       this.selectedData = [];
    //       this.unSelectedData = [];
    //       expenses.forEach((item, index) => {
    //         const chartItem = {
    //           name: `${item.accountName}--${item.expense}`,
    //           value: _.round((item.expense / production) * 100 * 10) / 10,
    //         };

    //         if (index < 15) {
    //           this.selectedData.push(chartItem);
    //         } else {
    //           this.unSelectedData.push(chartItem);
    //         }
    //       });
    //     }
    //     //   }
    //   });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy.next();
  }

  onNoClick(): void {
    this.dialogRef.close({
      selectedData: this.selectedData,
      unSelectedData: this.unSelectedData,
    });
  }

  addToSelected(index: number) {
    if (this.selectedData.length >= 20) {
      Swal.fire({
        icon: 'error',
        title: 'Oops....',
        text:
          'You can select a maximum of ' + 20 + ' expense accounts at a time',
      });
    } else {
      this.selectedData.push(this.unSelectedData[index]);
      this.unSelectedData.splice(index, 1);
    }
  }

  removeFromSelected(index: number) {
    if (this.selectedData.length > 2) {
      this.unSelectedData.push(this.selectedData[index]);
      this.selectedData.splice(index, 1);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops....',
        text: 'Minimum ' + 2 + ' expense account will remain selected',
      });
    }
  }

  refreshFinanceChart() {
    this.onNoClick();
  }
}
