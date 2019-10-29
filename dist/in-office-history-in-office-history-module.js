(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["in-office-history-in-office-history-module"],{

/***/ "./src/app/in-office-history/dialog-overview-example.html":
/*!****************************************************************!*\
  !*** ./src/app/in-office-history/dialog-overview-example.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add In-Office Plan Details</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.plan_name\" placeholder=\"Plan Name\" class=\"form-control-dialog\" required=\"true\">\n  </mat-form-field>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.plan_description\" placeholder=\"Plan Description\"\n\n    class=\"form-control-dialog\" required=\"true\">\n  </mat-form-field>\n\n\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" id=\"total_amount\" [(ngModel)]=\"data.total_amount\" type=\"number\" min=\"0\"  placeholder=\"Plan Fee\" class=\"form-control-dialog\" (change)=\"deposite_amount(data.deposite_amount)\" required=\"true\">\n    </mat-form-field>\n\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" type=\"number\" min=\"0\" [(ngModel)]=\"data.setup_fee\" placeholder=\"Setup Fee\" class=\"form-control-dialog\" required=\"true\">\n   </mat-form-field>\n\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" id=\"deposite_amount\" type=\"number\" min=\"0\"  (change)=\"deposite_amount(data.deposite_amount)\" [(ngModel)]=\"data.deposite_amount\" placeholder=\"Deposited Amount\" class=\"form-control-dialog\" required=\"true\">\n  </mat-form-field>\n\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" id=\"balance_amount\" type=\"number\" min=\"0\" [(ngModel)]=\"data.balance_amount\" placeholder=\"Balance Amount\" class=\"form-control-dialog\" readonly>\n    </mat-form-field>\n      \n    <mat-form-field>\n      <mat-label>Frequency of payments</mat-label> \n      <mat-select tabindex=\"1\" [(ngModel)]= \"data.payment_frequency\" required=\"true\">\n        <mat-option value=\"MONTHLY\">MONTHLY</mat-option>\n        <mat-option value=\"WEEKLY\">WEEKLY</mat-option>\n      </mat-select>\n    </mat-form-field>\n\n\n      <mat-form-field>\n          <input matInput tabindex=\"1\" id=\"duration\" type=\"number\" min=\"0\" [(ngModel)]=\"data.duration\" placeholder=\"Duration (Period of Loan)\" (change)=\"durationcal(data.duration)\" class=\"form-control-dialog\" required=\"true\">\n        </mat-form-field>\n\n        \n        <mat-form-field>\n            <input matInput tabindex=\"1\" type=\"number\" step=\".01\" min=\"0\" [(ngModel)]=\"data.monthly_weekly_payment\" placeholder=\"Monthly/Weekly Payment\" class=\"form-control-dialog\" readonly>\n          </mat-form-field>\n    \n          <mat-form-field>\n              <input matInput tabindex=\"1\" type=\"date\" [(ngModel)]=\"data.start_date\" placeholder=\"Start Date\" class=\"form-control-dialog\" required=\"true\">\n            </mat-form-field>\n\n            <mat-form-field>\n                <input matInput tabindex=\"1\" type=\"date\" [(ngModel)]=\"data.due_date\"  placeholder=\"Due Date\" class=\"form-control-dialog\" required=\"true\">\n              </mat-form-field>\n\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"save(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/in-office-history/in-office-history.component.html":
/*!********************************************************************!*\
  !*** ./src/app/in-office-history/in-office-history.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\r\n<!-- Card Grid-->\r\n<!-- ============================================================== -->\r\n<div fxLayout=\"row wrap\">\r\n    <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\r\n        <mat-card>\r\n            <mat-card-content>\r\n              <mat-card-title>In-office Payment Plans | {{patientname | titlecase}} <button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\" [disabled]=\"rows == ''\" >Add More Plan</button></mat-card-title>\r\n               <!-- ============================================================== -->\r\n                <!-- column -->\r\n                <!-- ============================================================== -->\r\n             \r\n\r\n                <div fxLayout=\"row wrap\">\r\n                    <!-- Card column -->\r\n                    <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\" class=\"sa_mattabs_design sa_matforms_design\">\r\n\r\n                            <mat-tab-group dynamicHeight>\r\n                         \r\n                        <!-- Plan Details tab -->\r\n                              <mat-tab label=\" Payment Plans/History\">\r\n                               \r\n                                   \r\n                         <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\r\n                                  [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\r\n                             <ngx-datatable-column prop=\"sr\" name=\"sr\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Id</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\r\n                                <span>\r\n                                  {{rowIndex + 1}}\r\n                                </span>\r\n                              </ng-template>\r\n                            </ngx-datatable-column>\r\n                            <ngx-datatable-column prop=\"plan_name\" name=\"plan_name\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Plan Name</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                <span >\r\n                                  {{value}}\r\n                                </span>\r\n                                    </ng-template>\r\n                            </ngx-datatable-column>\r\n                      \r\n                             <ngx-datatable-column prop=\"start_date\" name=\"start_date\">\r\n                               <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                              <span>Start Date</span>\r\n                            </ng-template>\r\n                              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                                <span >\r\n                                    {{value | date: 'dd-MM-yyyy'}}\r\n                                </span>\r\n                               \r\n                              </ng-template>\r\n                            </ngx-datatable-column>\r\n                      \r\n                            <ngx-datatable-column prop=\"total_amount\" name=\"total_amount\">\r\n                              <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                             <span>Amount</span>\r\n                           </ng-template>\r\n                             <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                               <span >\r\n                                 $ {{value}}\r\n                               </span>\r\n                              \r\n                             </ng-template>\r\n                           </ngx-datatable-column>\r\n\r\n                           <ngx-datatable-column prop=\"amount_paid\" name=\"amount_paid\">\r\n                            <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                           <span>Paid</span>\r\n                         </ng-template>\r\n                           <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                             <span >\r\n                              $ {{value}}\r\n                             </span>\r\n                            \r\n                           </ng-template>\r\n                         </ngx-datatable-column>\r\n                      \r\n                         <ngx-datatable-column prop=\"amount_balance\" name=\"amount_balance\">\r\n                          <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                         <span>Balance</span>\r\n                       </ng-template>\r\n                         <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                           <span >\r\n                            $ {{value}}\r\n                           </span>\r\n                          \r\n                         </ng-template>\r\n                       </ngx-datatable-column>\r\n                    \r\n                       <ngx-datatable-column prop=\"patient_status\" name=\"patient_status\">\r\n                        <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                       <span>Patient Status</span>\r\n                     </ng-template>\r\n                       <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\r\n                         <span >\r\n                           {{value}}\r\n                         </span>\r\n                        \r\n                       </ng-template>\r\n                     </ngx-datatable-column>\r\n                        \r\n\r\n                     <ngx-datatable-column name=\"id\">\r\n                      <ng-template let-column=\"column\" ngx-datatable-header-template>\r\n                     <span>Actions</span>\r\n                   </ng-template>\r\n                     <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\r\n                       <a class=\"action_btn golden\" title= 'Patients Details' (click) = \"invoiceDialog()\"><i class=\"ti-eye  m-r-10\"></i></a>\r\n                       <button class=\"action_btn danger\" mat-menu-item (click) = \"deleteInofficeMembersPlan(rowIndex)\">\r\n                      <i class=\"ti-trash text-danger m-r-10\"></i></button>\r\n                     </ng-template>\r\n                   </ngx-datatable-column>\r\n\r\n                  </ngx-datatable>\r\n\r\n                            </mat-tab>\r\n\r\n                      <!-- Contract Upload tab -->\r\n                                <mat-tab label=\"Contract Upload\">\r\n                             \r\n                                  <form *ngIf=\"form\" [formGroup]=\"form\" class=\"basic-form\" (ngSubmit)=\"onSubmit()\">\r\n                                    <div class=\"bd_UpoadImage\" fxFlex.gt-md=\"100\" fxFlex=\"100\">\r\n                                        <label>Upload Agreement</label><br>\r\n                                        <div class=\"upload-btn\">\r\n                                            <span>Choose file</span>\r\n                                            <input class=\"\" type=\"file\" placeholder=\"\" name= \"file\" id=\"file\" (change)=\"uploadImage($event.target.files)\">\r\n                                            <input type='hidden'  placeholder=\"\" id=\"imageURL\" >\r\n                                        </div>\r\n                                                          \r\n                                     </div>\r\n                               \r\n                                   <p>\r\n                                      <button mat-raised-button color=\"dc\">Save</button>\r\n                                   </p>\r\n                                   </form>\r\n                                  <p *ngIf=\"contract_url; else empty\">\r\n                                    Download Agreement\r\n                                    <a mat-raised-button class=\"contractupload\" color=\"accent\" target=\"_blank\" href=\"{{contract_url}}\">Download</a>\r\n                                </p>\r\n                                </mat-tab>\r\n\r\n\r\n                            </mat-tab-group>\r\n                       </div>\r\n                </div>\r\n\r\n            </mat-card-content>\r\n        </mat-card>\r\n    </div>\r\n</div>\r\n "

/***/ }),

/***/ "./src/app/in-office-history/in-office-history.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/in-office-history/in-office-history.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 90%; }\n\n.sa_plan_show {\n  width: 100%;\n  text-align: left;\n  margin-bottom: 10px; }\n\n.sa_plan_show td {\n  padding: 4px 10px;\n  background: #f2f2f2;\n  border: 1px solid #ccc; }\n\n.sa_userstable {\n  width: 100%; }\n\n.sa_plan_show th {\n  padding: 4px 10px;\n  background: #f2f2f2;\n  border: 1px solid #ccc;\n  font-weight: 400;\n  width: 280px; }\n\n.sa_upload_sec {\n  text-align: center;\n  padding: 40px 20px 20px;\n  border: 2px dotted #ccc;\n  min-height: 220px; }\n\n.sa_download_sec {\n  text-align: center;\n  padding: 40px 20px 20px;\n  background: #f2f2f2;\n  min-height: 220px; }\n\n.mat-card .mat-card-content {\n  font-size: 1rem;\n  line-height: 31px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9pbi1vZmZpY2UtaGlzdG9yeS9pbi1vZmZpY2UtaGlzdG9yeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFnQjtFQUNoQixpQkFBZ0I7RUFDaEIsWUFBVyxFQUNaOztBQUVEO0VBQ0UsV0FBVSxFQUNYOztBQUVEO0VBQWMsWUFBVTtFQUFFLGlCQUFlO0VBQUUsb0JBQWtCLEVBQUc7O0FBQ2hFO0VBQWlCLGtCQUFnQjtFQUFFLG9CQUFrQjtFQUFFLHVCQUFxQixFQUFHOztBQUMvRTtFQUFlLFlBQVUsRUFBRzs7QUFDNUI7RUFBaUIsa0JBQWdCO0VBQUUsb0JBQWtCO0VBQUUsdUJBQXFCO0VBQUUsaUJBQWU7RUFBRSxhQUFXLEVBQUc7O0FBQzdHO0VBQWUsbUJBQWtCO0VBQy9CLHdCQUF1QjtFQUN2Qix3QkFBdUI7RUFDdkIsa0JBQWdCLEVBQ2pCOztBQUVEO0VBQWlCLG1CQUFrQjtFQUNqQyx3QkFBdUI7RUFDeEIsb0JBQWtCO0VBQUUsa0JBQWdCLEVBQUU7O0FBRXRDO0VBQ0MsZ0JBQWU7RUFDZixrQkFBaUIsRUFBRSIsImZpbGUiOiJzcmMvYXBwL2luLW9mZmljZS1oaXN0b3J5L2luLW9mZmljZS1oaXN0b3J5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtZm9ybSB7XHJcbiAgbWluLXdpZHRoOiAxNTBweDtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1mdWxsLXdpZHRoIHtcclxuICB3aWR0aDogOTAlO1xyXG59XHJcblxyXG4uc2FfcGxhbl9zaG93e3dpZHRoOjEwMCU7IHRleHQtYWxpZ246bGVmdDsgbWFyZ2luLWJvdHRvbToxMHB4O31cclxuLnNhX3BsYW5fc2hvdyB0ZHtwYWRkaW5nOjRweCAxMHB4OyBiYWNrZ3JvdW5kOiNmMmYyZjI7IGJvcmRlcjoxcHggc29saWQgI2NjYzt9XHJcbi5zYV91c2Vyc3RhYmxle3dpZHRoOjEwMCU7fVxyXG4uc2FfcGxhbl9zaG93IHRoe3BhZGRpbmc6NHB4IDEwcHg7IGJhY2tncm91bmQ6I2YyZjJmMjsgYm9yZGVyOjFweCBzb2xpZCAjY2NjOyBmb250LXdlaWdodDo0MDA7IHdpZHRoOjI4MHB4O31cclxuLnNhX3VwbG9hZF9zZWN7dGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDQwcHggMjBweCAyMHB4O1xyXG4gIGJvcmRlcjogMnB4IGRvdHRlZCAjY2NjO1xyXG4gIG1pbi1oZWlnaHQ6MjIwcHg7XHJcbn1cclxuXHJcbi5zYV9kb3dubG9hZF9zZWN7dGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDQwcHggMjBweCAyMHB4O1xyXG4gYmFja2dyb3VuZDojZjJmMmYyOyBtaW4taGVpZ2h0OjIyMHB4O31cclxuXHJcbiAubWF0LWNhcmQgLm1hdC1jYXJkLWNvbnRlbnQge1xyXG4gIGZvbnQtc2l6ZTogMXJlbTtcclxuICBsaW5lLWhlaWdodDogMzFweDt9Il19 */"

/***/ }),

/***/ "./src/app/in-office-history/in-office-history.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/in-office-history/in-office-history.component.ts ***!
  \******************************************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, InvoiceDetailsDialogComponent, InOfficeHistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceDetailsDialogComponent", function() { return InvoiceDetailsDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InOfficeHistoryComponent", function() { return InOfficeHistoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _in_office_history_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./in-office-history.service */ "./src/app/in-office-history/in-office-history.service.ts");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _layouts_full_header_header_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../layouts/full/header/header.service */ "./src/app/layouts/full/header/header.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var data = [];
var DialogOverviewExampleDialogComponent = /** @class */ (function () {
    function DialogOverviewExampleDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DialogOverviewExampleDialogComponent.prototype.save = function (data) {
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
        console.log(data);
        if (data.plan_name != undefined && data.plan_description != undefined && data.total_amount != undefined && data.setup_fee != undefined && data.deposite_amount != undefined && data.balance_amount != undefined && data.payment_frequency != undefined && data.duration != undefined && data.monthly_weekly_payment != undefined && data.start_date != undefined && data.due_date != undefined) {
            this.dialogRef.close(data);
        }
    };
    DialogOverviewExampleDialogComponent.prototype.deposite_amount = function (depositeamount) {
        this.totalAmount = $('#total_amount').val();
        this.balanceamt = this.totalAmount - depositeamount;
        this.data.balance_amount = this.balanceamt;
        this.durationcal(this.durationval);
    };
    DialogOverviewExampleDialogComponent.prototype.durationcal = function (durationval) {
        this.durationval = durationval;
        this.monthlyweeklyamt = this.balanceamt / this.durationval;
        this.data.monthly_weekly_payment = this.monthlyweeklyamt;
        // alert(this.monthlyweeklyamt);
    };
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/in-office-history/dialog-overview-example.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var InvoiceDetailsDialogComponent = /** @class */ (function () {
    function InvoiceDetailsDialogComponent(dialogRef2, data) {
        this.dialogRef2 = dialogRef2;
        this.data = data;
    }
    InvoiceDetailsDialogComponent.prototype.onNoClick = function () {
        this.dialogRef2.close();
    };
    InvoiceDetailsDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-invoice-details-dialog',
            template: __webpack_require__(/*! ./invoice-details.html */ "./src/app/in-office-history/invoice-details.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogRef"], Object])
    ], InvoiceDetailsDialogComponent);
    return InvoiceDetailsDialogComponent;
}());

var InOfficeHistoryComponent = /** @class */ (function () {
    function InOfficeHistoryComponent(notifierService, headerService, fb, dialog, inOfficeHistoryService, route, _cookieService, router, breakpointObserver) {
        var _this = this;
        this.headerService = headerService;
        this.fb = fb;
        this.dialog = dialog;
        this.inOfficeHistoryService = inOfficeHistoryService;
        this.route = route;
        this._cookieService = _cookieService;
        this.router = router;
        this.color = 'primary';
        this.mode = 'determinate';
        this.value = 50;
        this.bufferValue = 75;
        this.id = {};
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.rows = [];
        this.notifier = notifierService;
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    InOfficeHistoryComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { plan_name: this.plan_name, plan_description: this.plan_description, clinic_id: this.clinic_id, total_amount: this.total_amount, setup_fee: this.setup_fee, deposite_amount: this.deposite_amount, balance_amount: this.balance_amount, payment_frequency: this.payment_frequency, duration: this.duration, monthly_weekly_payment: this.monthly_weekly_payment, start_date: this.start_date, due_date: this.due_date }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.inOfficeHistoryService.addPaymentPlans(_this.patientname, _this.patientemail, result.plan_name, result.plan_description, result.clinic_id, result.total_amount, result.setup_fee, result.deposite_amount, result.balance_amount, result.payment_frequency, result.duration, result.monthly_weekly_payment, result.start_date, result.due_date).subscribe(function (res) {
                if (res.message == 'success') {
                    _this.notifier.notify('success', 'New Plan Added', 'vertical');
                    _this.getInofficeMembersByID();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        });
    };
    InOfficeHistoryComponent.prototype.invoiceDialog = function () {
        var _this = this;
        this.inOfficeHistoryService.getInofficeMembersPlanInvoices(this.id, this.inoffice_payment_id).subscribe(function (updateres) {
            _this.invoicedata = updateres.data[0]['inoffice_payments_invoices'];
            console.log(_this.invoicedata);
            var dialogRef2 = _this.dialog.open(InvoiceDetailsDialogComponent, {
                width: '250px',
                data: { invoicedata: _this.invoicedata, }
            });
        });
    };
    InOfficeHistoryComponent.prototype.ngAfterViewInit = function () {
        this.id = this.route.snapshot.paramMap.get("id");
        this.getClinicPatientsbyId();
        // this.getInofficeMembersByID();
        $('.header_filters').removeClass('hide_header');
        $('nb.header_filters').removeClass('flex_direct_mar');
        $('.header_filters').addClass('hide_header');
        this.route.params.subscribe(function (params) {
            // this.getClinicGoals();
            $('#title').html('In-office Payment Plans');
        });
        this.form = this.fb.group({});
    };
    //  initiate_clinic(){  
    //     this.clinic_id = $('#currentClinicid').attr('cid');
    //   if(this.clinic_id)
    //   this.getInofficeMembersByID();
    //     }
    InOfficeHistoryComponent.prototype.getInofficeMembersByID = function () {
        var _this = this;
        this.inOfficeHistoryService.getInofficeMembersByID(this.id, this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                _this.patientname = res.data[0]['patient_name'];
                _this.patientemail = res.data[0]['patient_email'];
                _this.inoffice_payment_id = res.data[0]['inoffice_paymentID'];
                // console.log(this.rows);
            }
            else if (res.status == '401') {
                _this._cookieService.put("username", '');
                _this._cookieService.put("email", '');
                _this._cookieService.put("token", '');
                _this._cookieService.put("userid", '');
                _this.router.navigateByUrl('/login');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    InOfficeHistoryComponent.prototype.getPatientContract = function () {
        var _this = this;
        this.inOfficeHistoryService.getPatientContract(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.contract_url = res.data['contract_upload'];
            }
            else if (res.status == '401') {
                _this._cookieService.put("token", '');
                _this._cookieService.put("userid", '');
                _this.router.navigateByUrl('/login');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    InOfficeHistoryComponent.prototype.getClinicPatientsbyId = function () {
        var _this = this;
        this.inOfficeHistoryService.getClinicPatientsbyId(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.clinic_id = res.data[0]['clinic_id'];
                _this.getInofficeMembersByID();
            }
            else if (res.status == '401') {
                _this._cookieService.put("token", '');
                _this._cookieService.put("userid", '');
                _this.router.navigateByUrl('/login');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    InOfficeHistoryComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.imageURL == undefined) {
            alert("Please Upload file");
        }
        else {
            $('.ajax-loader').show();
            this.inOfficeHistoryService.updatePatients(this.id, this.imageURL).subscribe(function (res) {
                $('.ajax-loader').hide();
                // console.log(this.imageURL);
                if (res.message == 'success') {
                    _this.notifier.notify('success', 'Document Uploaded', 'vertical');
                    _this.getPatientContract();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        }
    };
    InOfficeHistoryComponent.prototype.uploadImage = function (files) {
        var _this = this;
        this.fileToUpload = files.item(0);
        var extension = this.fileToUpload.name.split('.')[1].toLowerCase();
        if (extension !== "pdf") {
            alert('Please Upload PDF file');
            return null;
        }
        else {
            $('.ajax-loader').show();
            var formData = new FormData();
            formData.append('file', this.fileToUpload, this.fileToUpload.name);
            this.inOfficeHistoryService.contractUpload(formData).subscribe(function (res) {
                $('.ajax-loader').hide();
                if (res.message == 'success') {
                    _this.imageURL = res.data;
                }
            });
        }
    };
    InOfficeHistoryComponent.prototype.deleteInofficeMembersPlan = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete this plan?")) {
            if (this.rows[row]['patientID']) {
                this.inOfficeHistoryService.deleteInofficeMembersPlan(this.rows[row]['patientID'], this.rows[row]['inoffice_paymentID']).subscribe(function (res) {
                    if (res.message == 'success') {
                        _this.getInofficeMembersByID();
                        _this.notifier.notify('success', 'Plan Removed', 'vertical');
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            }
            else {
                this.rows.splice(row, 1);
                this.rows = this.rows.slice();
            }
        }
    };
    InOfficeHistoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlayout',
            template: __webpack_require__(/*! ./in-office-history.component.html */ "./src/app/in-office-history/in-office-history.component.html"),
            styles: [__webpack_require__(/*! ./in-office-history.component.scss */ "./src/app/in-office-history/in-office-history.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"], _layouts_full_header_header_service__WEBPACK_IMPORTED_MODULE_8__["HeaderService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"], _in_office_history_service__WEBPACK_IMPORTED_MODULE_2__["InOfficeHistoryService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_7__["BreakpointObserver"]])
    ], InOfficeHistoryComponent);
    return InOfficeHistoryComponent;
}());



/***/ }),

/***/ "./src/app/in-office-history/in-office-history.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/in-office-history/in-office-history.module.ts ***!
  \***************************************************************/
/*! exports provided: InOfficeHistoryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InOfficeHistoryModule", function() { return InOfficeHistoryModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _in_office_history_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./in-office-history.routing */ "./src/app/in-office-history/in-office-history.routing.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/index.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _in_office_history_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./in-office-history.component */ "./src/app/in-office-history/in-office-history.component.ts");
/* harmony import */ var _in_office_history_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./in-office-history.service */ "./src/app/in-office-history/in-office-history.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var InOfficeHistoryModule = /** @class */ (function () {
    function InOfficeHistoryModule() {
    }
    InOfficeHistoryModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_in_office_history_routing__WEBPACK_IMPORTED_MODULE_7__["InOfficeHistoryRoutes"]),
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                ngx_quill__WEBPACK_IMPORTED_MODULE_9__["QuillModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__["NgxDatatableModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_10__["FileUploadModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_11__["MatTreeModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__["MatDatepickerModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_14__["NgMultiSelectDropDownModule"].forRoot()
            ],
            providers: [
                _in_office_history_service__WEBPACK_IMPORTED_MODULE_16__["InOfficeHistoryService"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"]
            ],
            entryComponents: [_in_office_history_component__WEBPACK_IMPORTED_MODULE_15__["DialogOverviewExampleDialogComponent"], _in_office_history_component__WEBPACK_IMPORTED_MODULE_15__["InvoiceDetailsDialogComponent"]],
            declarations: [
                _in_office_history_component__WEBPACK_IMPORTED_MODULE_15__["InOfficeHistoryComponent"], _in_office_history_component__WEBPACK_IMPORTED_MODULE_15__["DialogOverviewExampleDialogComponent"], _in_office_history_component__WEBPACK_IMPORTED_MODULE_15__["InvoiceDetailsDialogComponent"]
            ]
        })
    ], InOfficeHistoryModule);
    return InOfficeHistoryModule;
}());



/***/ }),

/***/ "./src/app/in-office-history/in-office-history.routing.ts":
/*!****************************************************************!*\
  !*** ./src/app/in-office-history/in-office-history.routing.ts ***!
  \****************************************************************/
/*! exports provided: InOfficeHistoryRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InOfficeHistoryRoutes", function() { return InOfficeHistoryRoutes; });
/* harmony import */ var _in_office_history_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./in-office-history.component */ "./src/app/in-office-history/in-office-history.component.ts");

var InOfficeHistoryRoutes = [
    {
        path: '',
        component: _in_office_history_component__WEBPACK_IMPORTED_MODULE_0__["InOfficeHistoryComponent"],
        data: {
            title: 'In-Office History'
        }
    }
];


/***/ }),

/***/ "./src/app/in-office-history/in-office-history.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/in-office-history/in-office-history.service.ts ***!
  \****************************************************************/
/*! exports provided: InOfficeHistoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InOfficeHistoryService", function() { return InOfficeHistoryService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InOfficeHistoryService = /** @class */ (function () {
    function InOfficeHistoryService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    InOfficeHistoryService.prototype.getPatientContract = function (patient_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Patients/getPatientContract?patient_id=" + patient_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    InOfficeHistoryService.prototype.updatePatients = function (patient_id, contract_upload, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_id', patient_id);
        formData.append('contract_upload', contract_upload);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/InofficePayments/UploadContract/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            //      console.log(response);
            return response;
        }));
    };
    InOfficeHistoryService.prototype.contractUpload = function (formData) {
        formData.append('id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        return this.http.post(this.apiUrl + "/Patients/logoUpload/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            // console.log(response);
            return response;
        }));
    };
    InOfficeHistoryService.prototype.deleteInofficeMembersPlan = function (patient_id, inoffice_payment_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_id', patient_id);
        formData.append('inoffice_payment_id', inoffice_payment_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/InofficePayments/deleteInofficeMembersPlan/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            //      console.log(response);
            return response;
        }));
    };
    InOfficeHistoryService.prototype.getInofficeMembersByID = function (patient_id, clinic_id, user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/InofficePayments/getInofficeMembersByID?patient_id=" + patient_id + "&user_id=" + this._cookieService.get("userid") + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            // console.log(response);
            return response;
        }));
    };
    InOfficeHistoryService.prototype.addPaymentPlans = function (patient_name, patient_email, plan_name, plan_description, clinic_id, total_amount, setup_fee, deposite_amount, balance_amount, payment_frequency, duration, monthly_weekly_payment, start_date, due_date, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_name', patient_name);
        formData.append('patient_email', patient_email);
        formData.append('plan_name', plan_name);
        formData.append('plan_description', plan_description);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('clinic_id', clinic_id);
        formData.append('total_amount', total_amount);
        formData.append('setup_fee', setup_fee);
        formData.append('deposite_amount', deposite_amount);
        formData.append('balance_amount', balance_amount);
        formData.append('payment_frequency', payment_frequency);
        formData.append('duration', duration);
        formData.append('monthly_weekly_payment', monthly_weekly_payment);
        formData.append('start_date', start_date);
        formData.append('due_date', due_date);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/InofficePayments/addPaymentPlans/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    InOfficeHistoryService.prototype.getInofficeMembersPlanInvoices = function (patient_id, inoffice_payment_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/InofficePayments/getInofficeMembersPlanInvoices?patient_id=" + patient_id + "&inoffice_payment_id=" + inoffice_payment_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    InOfficeHistoryService.prototype.getClinicPatientsbyId = function (patient_id, user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Patients/getClinicPatientsbyId?patient_id=" + patient_id + "&user_id=" + this._cookieService.get("userid") + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    InOfficeHistoryService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], InOfficeHistoryService);
    return InOfficeHistoryService;
}());



/***/ }),

/***/ "./src/app/in-office-history/invoice-details.html":
/*!********************************************************!*\
  !*** ./src/app/in-office-history/invoice-details.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Invoice Details</h1>\n<ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\" [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='data.invoicedata'>\n    \n <ngx-datatable-column prop=\"sr\" name=\"sr\">\n              <ng-template let-column=\"column\" ngx-datatable-header-template>\n            <span>Id</span>\n          </ng-template>\n            <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n              <span>\n                {{rowIndex + 1}}\n              </span>\n            </ng-template>\n          </ngx-datatable-column>\n          <ngx-datatable-column prop=\"invoiceId\" name=\"invoiceId\">\n              <ng-template let-column=\"column\" ngx-datatable-header-template>\n            <span>Invoice Id</span>\n          </ng-template>\n            <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n              <span >\n                {{value}}\n              </span>\n                  </ng-template>\n          </ngx-datatable-column>\n                    \n            <ngx-datatable-column prop=\"subscriptionId\" name=\"subscriptionId\">\n              <ng-template let-column=\"column\" ngx-datatable-header-template>\n              <span>Subscription Id</span>\n            </ng-template>\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n                <span >\n                  {{value}}\n                </span>\n              \n              </ng-template>\n            </ngx-datatable-column>\n\n            <ngx-datatable-column prop=\"total_paid\" name=\"total_paid\">\n            <ng-template let-column=\"column\" ngx-datatable-header-template>\n            <span>Total Paid</span>\n          </ng-template>\n            <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n              <span >\n              $ {{value}}\n              </span>\n            \n            </ng-template>\n          </ngx-datatable-column>\n      \n  </ngx-datatable>"

/***/ })

}]);
//# sourceMappingURL=in-office-history-in-office-history-module.js.map