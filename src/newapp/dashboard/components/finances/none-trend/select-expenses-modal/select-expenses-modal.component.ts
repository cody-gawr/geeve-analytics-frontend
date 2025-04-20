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
    return this.financeFacade.isLoadingFnExpenses$;
  }

  get connectedWith$() {
    return this.clinicFacade.connectedWith$;
  }

  constructor(
    public dialogRef: MatDialogRef<MkSelectExpensesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dashboardFacade: DashboardFacade,
    private financeFacade: FinanceFacade,
    private clinicFacade: ClinicFacade,
  ) {
    this.selectedData = data.selectedData;
    this.unSelectedData = data.unSelectedData;
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
        text: 'You can select a maximum of ' + 20 + ' expense accounts at a time',
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
