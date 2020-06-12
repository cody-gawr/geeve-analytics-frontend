(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["datatables-datatables-module"],{

/***/ "./src/app/datatables/data-table/data-table.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/datatables/data-table/data-table.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Basic Data table</mat-card-title>\n        <div class=\"table-responsive\">\n\t        <ngx-datatable #table class='material' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n\t            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n\t        </ngx-datatable>\n        </div>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/datatables/data-table/data-table.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/datatables/data-table/data-table.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".datatable,\n.datatable > div,\n.datatable.fixed-header .datatable-header .datatable-header-inner {\n  height: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGF0YXRhYmxlcy9kYXRhLXRhYmxlL0M6XFx4YW1wcFxcaHRkb2NzXFxqZWV2ZWFuYWx5dGljc1xcY2xpZW50Mi9zcmNcXGFwcFxcZGF0YXRhYmxlc1xcZGF0YS10YWJsZVxcZGF0YS10YWJsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0VBR0UsYUFBWSxFQUNiIiwiZmlsZSI6InNyYy9hcHAvZGF0YXRhYmxlcy9kYXRhLXRhYmxlL2RhdGEtdGFibGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGF0YXRhYmxlLFxuLmRhdGF0YWJsZSA+IGRpdixcbi5kYXRhdGFibGUuZml4ZWQtaGVhZGVyIC5kYXRhdGFibGUtaGVhZGVyIC5kYXRhdGFibGUtaGVhZGVyLWlubmVyIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/datatables/data-table/data-table.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/datatables/data-table/data-table.component.ts ***!
  \***************************************************************/
/*! exports provided: DataTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTableComponent", function() { return DataTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var data = __webpack_require__(/*! assets/company.json */ "./src/assets/company.json");
var DataTableComponent = /** @class */ (function () {
    function DataTableComponent() {
        var _this = this;
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    DataTableComponent_1 = DataTableComponent;
    DataTableComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
    };
    var DataTableComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(DataTableComponent_1),
        __metadata("design:type", DataTableComponent)
    ], DataTableComponent.prototype, "table", void 0);
    DataTableComponent = DataTableComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-data-table',
            template: __webpack_require__(/*! ./data-table.component.html */ "./src/app/datatables/data-table/data-table.component.html"),
            styles: [__webpack_require__(/*! ./data-table.component.scss */ "./src/app/datatables/data-table/data-table.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], DataTableComponent);
    return DataTableComponent;
}());



/***/ }),

/***/ "./src/app/datatables/datatables.module.ts":
/*!*************************************************!*\
  !*** ./src/app/datatables/datatables.module.ts ***!
  \*************************************************/
/*! exports provided: DataTablesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTablesModule", function() { return DataTablesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _datatables_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./datatables.routing */ "./src/app/datatables/datatables.routing.ts");
/* harmony import */ var _data_table_data_table_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./data-table/data-table.component */ "./src/app/datatables/data-table/data-table.component.ts");
/* harmony import */ var _materialtable_materialtable_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./materialtable/materialtable.component */ "./src/app/datatables/materialtable/materialtable.component.ts");
/* harmony import */ var _table_editing_table_editing_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./table-editing/table-editing.component */ "./src/app/datatables/table-editing/table-editing.component.ts");
/* harmony import */ var _table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./table-filter/table-filter.component */ "./src/app/datatables/table-filter/table-filter.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var DataTablesModule = /** @class */ (function () {
    function DataTablesModule() {
    }
    DataTablesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_datatables_routing__WEBPACK_IMPORTED_MODULE_6__["DataTablesRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"]
            ],
            declarations: [
                _data_table_data_table_component__WEBPACK_IMPORTED_MODULE_7__["DataTableComponent"],
                _table_editing_table_editing_component__WEBPACK_IMPORTED_MODULE_9__["TableEditingComponent"],
                _table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_10__["TableFilterComponent"],
                _materialtable_materialtable_component__WEBPACK_IMPORTED_MODULE_8__["MaterialTableComponent"]
            ]
        })
    ], DataTablesModule);
    return DataTablesModule;
}());



/***/ }),

/***/ "./src/app/datatables/datatables.routing.ts":
/*!**************************************************!*\
  !*** ./src/app/datatables/datatables.routing.ts ***!
  \**************************************************/
/*! exports provided: DataTablesRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTablesRoutes", function() { return DataTablesRoutes; });
/* harmony import */ var _data_table_data_table_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-table/data-table.component */ "./src/app/datatables/data-table/data-table.component.ts");
/* harmony import */ var _table_editing_table_editing_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table-editing/table-editing.component */ "./src/app/datatables/table-editing/table-editing.component.ts");
/* harmony import */ var _table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table-filter/table-filter.component */ "./src/app/datatables/table-filter/table-filter.component.ts");
/* harmony import */ var _materialtable_materialtable_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./materialtable/materialtable.component */ "./src/app/datatables/materialtable/materialtable.component.ts");




var DataTablesRoutes = [
    {
        path: '',
        children: [
            {
                path: 'basicdatatable',
                component: _data_table_data_table_component__WEBPACK_IMPORTED_MODULE_0__["DataTableComponent"]
            },
            {
                path: 'editing',
                component: _table_editing_table_editing_component__WEBPACK_IMPORTED_MODULE_1__["TableEditingComponent"]
            },
            {
                path: 'filter',
                component: _table_filter_table_filter_component__WEBPACK_IMPORTED_MODULE_2__["TableFilterComponent"]
            },
            {
                path: 'materialtable',
                component: _materialtable_materialtable_component__WEBPACK_IMPORTED_MODULE_3__["MaterialTableComponent"]
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/datatables/materialtable/materialtable.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/datatables/materialtable/materialtable.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Table dynamically changing the columns displayed</mat-card-title>\n        <div class=\"m-b-20 m-t-20\">\n            <button mat-raised-button (click)=\"addColumn()\"> Add column </button>\n            <button mat-raised-button (click)=\"removeColumn()\"> Remove column </button>\n            <button mat-raised-button (click)=\"shuffle()\"> Shuffle </button>\n        </div>\n\n        <div class=\"responsive-table\">\n            <mat-table #table [dataSource]=\"data\">\n                <ng-container [matColumnDef]=\"column\" *ngFor=\"let column of displayedColumns\">\n                    <mat-header-cell *matHeaderCellDef> {{column}} </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">{{column}}:</span>\n                        {{element[column]}} \n                    </mat-cell>\n                </ng-container>\n\n                <mat-header-row *matHeaderRowDef=\"columnsToDisplay\"></mat-header-row>\n                <mat-row *matRowDef=\"let row; columns: columnsToDisplay;\"></mat-row>\n            </mat-table>\n        </div>\n\n    </mat-card-content>\n</mat-card>\n\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Table with expandable rows </mat-card-title>\n        <div class=\"responsive-table\">\n            <mat-table #table [dataSource]=\"dataSource\" multiTemplateDataRows>\n                <ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of columnsToDisplay1\">\n                    <mat-header-cell *matHeaderCellDef> {{column}} </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">{{column}}:</span>\n                        {{element[column]}} \n                    </mat-cell>\n                </ng-container>\n\n                <!-- Expanded Content Column - The detail row is made up of this one column that spans across all columns -->\n                <ng-container matColumnDef=\"expandedDetail\">\n                    <mat-cell *matCellDef=\"let element\" [attr.colspan]=\"columnsToDisplay1.length\">\n                        <div class=\"example-element-detail\" [@detailExpand]=\"element == expandedElement ? 'expanded' : 'collapsed'\">\n                            <div class=\"example-element-diagram\">\n                                <div class=\"example-element-position\"> {{element.position}} </div>\n                                <div class=\"example-element-theme\"> {{element.theme}} </div>\n                                <div class=\"example-element-name\"> {{element.name}} </div>\n                                <div class=\"example-element-weight\"> {{element.weight}} </div>\n                            </div>\n                            <div class=\"example-element-description\">\n                                {{element.description}}\n                                <span class=\"example-element-description-attribution\"> -- Wikipedia </span>\n                            </div>\n                        </div>\n                    </mat-cell>\n                </ng-container>\n\n                <mat-header-row *matHeaderRowDef=\"columnsToDisplay1\"></mat-header-row>\n                <mat-row *matRowDef=\"let element; columns: columnsToDisplay1;\" class=\"example-element-row\"\n                    [class.example-expanded-row]=\"expandedElement === element\" (click)=\"expandedElement = element\">\n                </mat-row>\n                <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"example-detail-row\"></tr>\n            </mat-table>\n        </div>\n\n    </mat-card-content>\n</mat-card>\n\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Table with selection </mat-card-title>\n        <div class=\"responsive-table\">\n            <mat-table #table [dataSource]=\"dataSource2\">\n\n                <!-- Checkbox Column -->\n                <ng-container matColumnDef=\"select\">\n                    <mat-header-cell *matHeaderCellDef>\n                        <span class=\"header-label\">Choose : </span>\n                        <mat-checkbox (change)=\"$event ? masterToggle() : null\" [checked]=\"selection.hasValue() && isAllSelected()\"\n                            [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n                        </mat-checkbox>\n                    </mat-header-cell>\n                    <mat-cell *matCellDef=\"let row\">\n                        <span class=\"header-label\">Choose : </span>\n                        <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\"\n                            [checked]=\"selection.isSelected(row)\">\n                        </mat-checkbox>\n                    </mat-cell>\n                </ng-container>\n\n                <!-- Position Column -->\n                <ng-container matColumnDef=\"position\">\n                    <mat-header-cell *matHeaderCellDef> No. </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">No:</span>{{element.position}} \n                    </mat-cell>\n                </ng-container>\n\n                <!-- Name Column -->\n                <ng-container matColumnDef=\"name\">\n                    <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">Name:</span>{{element.name}} \n                    </mat-cell>\n                </ng-container>\n\n                <!-- Weight Column -->\n                <ng-container matColumnDef=\"weight\">\n                    <mat-header-cell *matHeaderCellDef> Weight </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">Weight :</span>{{element.weight}} \n                    </mat-cell>\n                </ng-container>\n\n                <!-- Symbol Column -->\n                <ng-container matColumnDef=\"symbol\">\n                    <mat-header-cell *matHeaderCellDef> Symbol </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">Symbol :</span> {{element.symbol}} \n                    </mat-cell>\n                </ng-container>\n\n                <mat-header-row *matHeaderRowDef=\"displayedColumns2\"></mat-header-row>\n                <mat-row *matRowDef=\"let row; columns: displayedColumns2;\" (click)=\"selection.toggle(row)\">\n                </mat-row>\n            </mat-table>\n        </div>\n    </mat-card-content>\n</mat-card>\n\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Table with sorting</mat-card-title>\n        <div class=\"responsive-table\">\n            <mat-table #table [dataSource]=\"dataSource3\" matSort>\n\n                <!-- Position Column -->\n                <ng-container matColumnDef=\"position\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header> No. </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\">\n                        <span class=\"header-label\">No :</span> {{element.position}} \n                    </mat-cell>\n                </ng-container>\n\n                <!-- Name Column -->\n                <ng-container matColumnDef=\"name\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header> Name </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">Name :</span> {{element.name}} \n                    </mat-cell>\n                </ng-container>\n\n                <!-- Weight Column -->\n                <ng-container matColumnDef=\"weight\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header> Weight </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">Weight :</span> {{element.weight}} \n                    </mat-cell>\n                </ng-container>\n\n                <!-- Symbol Column -->\n                <ng-container matColumnDef=\"symbol\">\n                    <mat-header-cell *matHeaderCellDef mat-sort-header> Symbol </mat-header-cell>\n                    <mat-cell *matCellDef=\"let element\"> \n                        <span class=\"header-label\">Symbol :</span> {{element.symbol}} \n                    </mat-cell>\n                </ng-container>\n\n                <mat-header-row *matHeaderRowDef=\"displayedColumns3\"></mat-header-row>\n                <mat-row *matRowDef=\"let row; columns: displayedColumns3;\"></mat-row>\n            </mat-table>\n        </div>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/datatables/materialtable/materialtable.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/datatables/materialtable/materialtable.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\nbutton {\n  margin: 16px 8px; }\n\ntr.example-detail-row {\n  height: 0; }\n\ntr.example-element-row:not(.example-expanded-row):hover {\n  background: #f5f5f5; }\n\ntr.example-element-row:not(.example-expanded-row):active {\n  background: #efefef; }\n\n.example-element-row td {\n  border-bottom-width: 0; }\n\n.example-element-detail {\n  overflow: hidden;\n  display: flex; }\n\n.example-element-diagram {\n  min-width: 80px;\n  border: 2px solid black;\n  padding: 8px;\n  font-weight: lighter;\n  margin: 8px 0;\n  height: 112px; }\n\n.example-element-symbol {\n  font-weight: bold;\n  font-size: 40px;\n  line-height: normal; }\n\n.example-element-description {\n  padding: 16px; }\n\n.example-element-description-attribution {\n  opacity: 0.5; }\n\n.fixed-height {\n  height: 270px;\n  overflow: auto; }\n\ntr.mat-footer-row {\n  font-weight: bold; }\n\n.mat-table-sticky {\n  border-top: 1px solid #e0e0e0; }\n\n.fixed-header {\n  height: 250px;\n  overflow: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGF0YXRhYmxlcy9tYXRlcmlhbHRhYmxlL0M6XFx4YW1wcFxcaHRkb2NzXFxqZWV2ZWFuYWx5dGljc1xcY2xpZW50Mi9zcmNcXGFwcFxcZGF0YXRhYmxlc1xcbWF0ZXJpYWx0YWJsZVxcbWF0ZXJpYWx0YWJsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVcsRUFDWjs7QUFFRDtFQUNFLGlCQUFnQixFQUNqQjs7QUFFRDtFQUNFLFVBQVMsRUFDVjs7QUFFRDtFQUNFLG9CQUFtQixFQUNwQjs7QUFFRDtFQUNFLG9CQUFtQixFQUNwQjs7QUFFRDtFQUNFLHVCQUFzQixFQUN2Qjs7QUFFRDtFQUNFLGlCQUFnQjtFQUNoQixjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxnQkFBZTtFQUNmLHdCQUF1QjtFQUN2QixhQUFZO0VBQ1oscUJBQW9CO0VBQ3BCLGNBQWE7RUFDYixjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxrQkFBaUI7RUFDakIsZ0JBQWU7RUFDZixvQkFBbUIsRUFDcEI7O0FBRUQ7RUFDRSxjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxhQUFZLEVBQ2I7O0FBRUQ7RUFDRSxjQUFhO0VBQ2IsZUFBYyxFQUNmOztBQUVEO0VBQ0Usa0JBQWlCLEVBQ2xCOztBQUVEO0VBQ0UsOEJBQTZCLEVBQzlCOztBQUVEO0VBQ0UsY0FBYTtFQUNiLGVBQWMsRUFDZiIsImZpbGUiOiJzcmMvYXBwL2RhdGF0YWJsZXMvbWF0ZXJpYWx0YWJsZS9tYXRlcmlhbHRhYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xuICB3aWR0aDogMTAwJTtcbn1cblxuYnV0dG9uIHtcbiAgbWFyZ2luOiAxNnB4IDhweDtcbn1cblxudHIuZXhhbXBsZS1kZXRhaWwtcm93IHtcbiAgaGVpZ2h0OiAwO1xufVxuXG50ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbn1cblxudHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTphY3RpdmUge1xuICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xufVxuXG4uZXhhbXBsZS1lbGVtZW50LXJvdyB0ZCB7XG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XG59XG5cbi5leGFtcGxlLWVsZW1lbnQtZGV0YWlsIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmV4YW1wbGUtZWxlbWVudC1kaWFncmFtIHtcbiAgbWluLXdpZHRoOiA4MHB4O1xuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcbiAgcGFkZGluZzogOHB4O1xuICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgbWFyZ2luOiA4cHggMDtcbiAgaGVpZ2h0OiAxMTJweDtcbn1cblxuLmV4YW1wbGUtZWxlbWVudC1zeW1ib2wge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiA0MHB4O1xuICBsaW5lLWhlaWdodDogbm9ybWFsO1xufVxuXG4uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uIHtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLmV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvbi1hdHRyaWJ1dGlvbiB7XG4gIG9wYWNpdHk6IDAuNTtcbn1cblxuLmZpeGVkLWhlaWdodCB7XG4gIGhlaWdodDogMjcwcHg7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG50ci5tYXQtZm9vdGVyLXJvdyB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4ubWF0LXRhYmxlLXN0aWNreSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTBlMGUwO1xufVxuXG4uZml4ZWQtaGVhZGVyIHtcbiAgaGVpZ2h0OiAyNTBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/datatables/materialtable/materialtable.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/datatables/materialtable/materialtable.component.ts ***!
  \*********************************************************************/
/*! exports provided: MaterialTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialTableComponent", function() { return MaterialTableComponent; });
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, theme: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, theme: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, theme: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, theme: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, theme: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, theme: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, theme: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, theme: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, theme: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, theme: 'Ne' }
];
var MY_DATA = [
    {
        position: 1,
        name: 'Hydrogen',
        weight: 1.0079,
        symbol: 'H',
        description: "Hydrogen is a chemical element with symbol H and atomic number 1. With a standard\n        atomic weight of 1.008, hydrogen is the lightest element on the periodic table."
    },
    {
        position: 2,
        name: 'Helium',
        weight: 4.0026,
        symbol: 'He',
        description: "Helium is a chemical element with symbol He and atomic number 2. It is a\n        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas\n        group in the periodic table. Its boiling point is the lowest among all the elements."
    },
    {
        position: 3,
        name: 'Lithium',
        weight: 6.941,
        symbol: 'Li',
        description: "Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,\n        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the\n        lightest solid element."
    },
    {
        position: 4,
        name: 'Beryllium',
        weight: 9.0122,
        symbol: 'Be',
        description: "Beryllium is a chemical element with symbol Be and atomic number 4. It is a\n        relatively rare element in the universe, usually occurring as a product of the spallation of\n        larger atomic nuclei that have collided with cosmic rays."
    },
    {
        position: 5,
        name: 'Boron',
        weight: 10.811,
        symbol: 'B',
        description: "Boron is a chemical element with symbol B and atomic number 5. Produced entirely\n        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a\n        low-abundance element in the Solar system and in the Earth's crust."
    },
    {
        position: 6,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
        description: "Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic\n        and tetravalent\u2014making four electrons available to form covalent chemical bonds. It belongs\n        to group 14 of the periodic table."
    },
    {
        position: 7,
        name: 'Nitrogen',
        weight: 14.0067,
        symbol: 'N',
        description: "Nitrogen is a chemical element with symbol N and atomic number 7. It was first\n        discovered and isolated by Scottish physician Daniel Rutherford in 1772."
    },
    {
        position: 8,
        name: 'Oxygen',
        weight: 15.9994,
        symbol: 'O',
        description: "Oxygen is a chemical element with symbol O and atomic number 8. It is a member of\n         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing\n         agent that readily forms oxides with most elements as well as with other compounds."
    },
    {
        position: 9,
        name: 'Fluorine',
        weight: 18.9984,
        symbol: 'F',
        description: "Fluorine is a chemical element with symbol F and atomic number 9. It is the\n        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard\n        conditions."
    },
    {
        position: 10,
        name: 'Neon',
        weight: 20.1797,
        symbol: 'Ne',
        description: "Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.\n        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about\n        two-thirds the density of air."
    }
];
var SELECT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];
var SORT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];
// End for 4
var MaterialTableComponent = /** @class */ (function () {
    // Start 1
    function MaterialTableComponent(breakpointObserver) {
        var _this = this;
        this.displayedColumns = ['name', 'weight', 'theme', 'position'];
        this.columnsToDisplay = this.displayedColumns.slice();
        this.data = ELEMENT_DATA;
        // End 1
        // Start 2
        this.dataSource = ELEMENT_DATA;
        this.columnsToDisplay1 = ['name', 'weight', 'symbol', 'position'];
        // End 2
        // Start For 3
        this.displayedColumns2 = [
            'select',
            'position',
            'name',
            'weight',
            'symbol'
        ];
        this.dataSource2 = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](SELECT_DATA);
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_0__["SelectionModel"](true, []);
        // End For 3
        // Start for 4
        this.displayedColumns3 = ['position', 'name', 'weight', 'symbol'];
        this.dataSource3 = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](SORT_DATA);
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(function (result) {
            // For 1
            _this.displayedColumns = result.matches ?
                ['name', 'weight', 'theme', 'position'] :
                ['name', 'weight', 'theme', 'position'];
            // For 2
            _this.columnsToDisplay1 = result.matches ?
                ['name', 'weight', 'theme', 'position'] :
                ['name', 'weight', 'theme', 'position'];
            // For 3
            _this.displayedColumns2 = result.matches ?
                ['select', 'position', 'name', 'weight', 'symbol'] :
                ['select', 'position', 'name', 'weight', 'symbol'];
            // For 4 
            _this.displayedColumns3 = result.matches ?
                ['position', 'name', 'weight', 'symbol'] :
                ['position', 'name', 'weight', 'symbol'];
        });
    }
    MaterialTableComponent.prototype.ngOnInit = function () {
        this.dataSource3.sort = this.sort;
    };
    // End for 4
    // 1
    MaterialTableComponent.prototype.addColumn = function () {
        var randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
        this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
    };
    MaterialTableComponent.prototype.removeColumn = function () {
        if (this.columnsToDisplay.length) {
            this.columnsToDisplay.pop();
        }
    };
    MaterialTableComponent.prototype.shuffle = function () {
        var currentIndex = this.columnsToDisplay.length;
        while (0 !== currentIndex) {
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // Swap
            var temp = this.columnsToDisplay[currentIndex];
            this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
            this.columnsToDisplay[randomIndex] = temp;
        }
    };
    // End 1
    // Start 3
    /** Whether the number of selected elements matches the total number of rows. */
    MaterialTableComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource2.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    MaterialTableComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource2.data.forEach(function (row) { return _this.selection.select(row); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], MaterialTableComponent.prototype, "sort", void 0);
    MaterialTableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-material-table',
            template: __webpack_require__(/*! ./materialtable.component.html */ "./src/app/datatables/materialtable/materialtable.component.html"),
            styles: [__webpack_require__(/*! ./materialtable.component.scss */ "./src/app/datatables/materialtable/materialtable.component.scss")],
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["trigger"])('detailExpand', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({ height: '0px', minHeight: '0', display: 'none' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({ height: '*' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_3__["BreakpointObserver"]])
    ], MaterialTableComponent);
    return MaterialTableComponent;
}());



/***/ }),

/***/ "./src/app/datatables/table-editing/table-editing.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/datatables/table-editing/table-editing.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-content>\n    <mat-card-title>Editable table</mat-card-title>\n    <ngx-datatable #mydatatable class=\"material\" [headerHeight]=\"50\" [limit]=\"5\" [columnMode]=\"'force'\" [footerHeight]=\"50\" [rowHeight]=\"'auto'\"\n      [rows]=\"rows\">\n      <ngx-datatable-column name=\"Name\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span title=\"Double click to edit\" (dblclick)=\"editing[rowIndex + '-name'] = true\" *ngIf=\"!editing[rowIndex + '-name']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'name', rowIndex)\" *ngIf=\"editing[rowIndex+ '-name']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Gender\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"editing[rowIndex + '-gender'] = true\" *ngIf=\"!editing[rowIndex + '-gender']\">\n            {{value}}\n          </span>\n          <select *ngIf=\"editing[rowIndex + '-gender']\" (change)=\"updateValue($event, 'gender', rowIndex)\" [value]=\"value\">\n            <option value=\"male\">Male</option>\n            <option value=\"female\">Female</option>\n          </select>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Age\">\n        <ng-template ngx-datatable-cell-template let-value=\"value\">\n          {{value}}\n        </ng-template>\n      </ngx-datatable-column>\n    </ngx-datatable>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/datatables/table-editing/table-editing.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/datatables/table-editing/table-editing.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RhdGF0YWJsZXMvdGFibGUtZWRpdGluZy90YWJsZS1lZGl0aW5nLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/datatables/table-editing/table-editing.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/datatables/table-editing/table-editing.component.ts ***!
  \*********************************************************************/
/*! exports provided: TableEditingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableEditingComponent", function() { return TableEditingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var data = __webpack_require__(/*! assets/company.json */ "./src/assets/company.json");
var TableEditingComponent = /** @class */ (function () {
    function TableEditingComponent() {
        var _this = this;
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    TableEditingComponent_1 = TableEditingComponent;
    TableEditingComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // update the rows
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    TableEditingComponent.prototype.updateValue = function (event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = this.rows.slice();
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    };
    var TableEditingComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(TableEditingComponent_1),
        __metadata("design:type", TableEditingComponent)
    ], TableEditingComponent.prototype, "table", void 0);
    TableEditingComponent = TableEditingComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-editing',
            template: __webpack_require__(/*! ./table-editing.component.html */ "./src/app/datatables/table-editing/table-editing.component.html"),
            styles: [__webpack_require__(/*! ./table-editing.component.scss */ "./src/app/datatables/table-editing/table-editing.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TableEditingComponent);
    return TableEditingComponent;
}());



/***/ }),

/***/ "./src/app/datatables/table-filter/table-filter.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/datatables/table-filter/table-filter.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Filtered table</mat-card-title>\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter the name column...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/datatables/table-filter/table-filter.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/datatables/table-filter/table-filter.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RhdGF0YWJsZXMvdGFibGUtZmlsdGVyL3RhYmxlLWZpbHRlci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/datatables/table-filter/table-filter.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/datatables/table-filter/table-filter.component.ts ***!
  \*******************************************************************/
/*! exports provided: TableFilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableFilterComponent", function() { return TableFilterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var data = __webpack_require__(/*! assets/company.json */ "./src/assets/company.json");
var TableFilterComponent = /** @class */ (function () {
    function TableFilterComponent() {
        var _this = this;
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    TableFilterComponent_1 = TableFilterComponent;
    TableFilterComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    TableFilterComponent.prototype.updateValue = function (event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = this.rows.slice();
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    };
    var TableFilterComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(TableFilterComponent_1),
        __metadata("design:type", TableFilterComponent)
    ], TableFilterComponent.prototype, "table", void 0);
    TableFilterComponent = TableFilterComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./table-filter.component.html */ "./src/app/datatables/table-filter/table-filter.component.html"),
            styles: [__webpack_require__(/*! ./table-filter.component.scss */ "./src/app/datatables/table-filter/table-filter.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TableFilterComponent);
    return TableFilterComponent;
}());



/***/ })

}]);
//# sourceMappingURL=datatables-datatables-module.js.map