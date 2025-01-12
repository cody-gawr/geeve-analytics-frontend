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
      console.log('Selected Columns:', this.selectedColumns);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    onYesClinic(): void {
        this.dialogRef.close(this.selectedColumns)
    }
}