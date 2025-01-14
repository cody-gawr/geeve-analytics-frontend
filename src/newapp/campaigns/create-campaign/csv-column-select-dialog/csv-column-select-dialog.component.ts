import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

interface DialogData {
    columnsData: Record<string, string>;
    selectedColumns: string[];
}

@Component({
    selector: 'csv-column-select-dialog',
    templateUrl: 'csv-column-select-dialog.component.html',
    styleUrls: ['csv-column-select-dialog.component.scss']
  })
  export class CsvColumnSelectDialog {

    nameOfColumns: string[];
    columnsLabels: Record<string, string>;
    selected_all = false
    allComplete: boolean = false;

    updateAllComplete() {
      this.allComplete = this.selectedColumns.length === this.nameOfColumns.length;
    }
  
    someComplete(): boolean {
      return this.selectedColumns.length > 0 && !this.allComplete;
    }
  
    setAll(completed: boolean) {
      this.allComplete = completed;
      if(completed)
        this.selectedColumns = [...this.nameOfColumns];
      else{
        this.selectedColumns = []
      }
    }
  
    constructor(
      public dialogRef: MatDialogRef<CsvColumnSelectDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
        this.nameOfColumns = Object.keys(data.columnsData);
        this.columnsLabels = data.columnsData;
        this.selectedColumns = data.selectedColumns;
    }

    selectedColumns: string[] = [];

    onSelectionChange(event: any) {
      this.selectedColumns = event.map((item: any) => item.value);
      this.updateAllComplete();
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    onYesClinic(): void {
        this.dialogRef.close(this.selectedColumns)
    }
}