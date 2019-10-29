(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["in-office-in-office-module"],{

/***/ "./src/app/in-office/dialog-overview-example.html":
/*!********************************************************!*\
  !*** ./src/app/in-office/dialog-overview-example.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add In-Office Plan</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.patient_name\" placeholder=\"Patient Name\"  class=\"form-control-dialog\" required=\"true\">\n   \n  </mat-form-field>\n \n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.patient_email\" placeholder=\"Email\" id=\"email\" [formControl]=\"email\" class=\"form-control-dialog\" required=\"true\">\n    <mat-error *ngIf=\"email.invalid\">{{getErrorMessage()}}</mat-error>\n  </mat-form-field>\n  <input matInput style=\"color: #FF0000;\" tabindex=\"1\" *ngIf=\"valplans\" [(ngModel)]=\"valplans\" required=\"true\" readonly>\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" [(ngModel)]=\"data.plan_name\" placeholder=\"Plan Name\" class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n\n    <mat-form-field>\n      <input matInput tabindex=\"1\" [(ngModel)]=\"data.plan_description\" placeholder=\"Plan Description\"\n\n      class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n\n\n\n    <mat-form-field>\n        <input matInput tabindex=\"1\" id=\"total_amount\"  [(ngModel)]=\"data.total_amount\"  type=\"number\" min=\"0\"  placeholder=\"Plan Fee\" class=\"form-control-dialog\" (change)=\"deposite_amount(data.deposite_amount)\" required=\"true\">\n      </mat-form-field>\n\n\n    <mat-form-field>\n        <input matInput tabindex=\"1\" type=\"number\" min=\"0\" [(ngModel)]=\"data.setup_fee\" placeholder=\"Setup Fee\" class=\"form-control-dialog\" required=\"true\">\n     </mat-form-field>\n\n\n    <mat-form-field>\n        <input matInput tabindex=\"1\" id=\"deposite_amount\" type=\"number\" min=\"0\"  (change)=\"deposite_amount(data.deposite_amount)\" [(ngModel)]=\"data.deposite_amount\" placeholder=\"Deposited Amount\" class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n\n\n    <mat-form-field>\n        <input matInput tabindex=\"1\" id=\"balance_amount\" type=\"number\" min=\"0\" [(ngModel)]=\"data.balance_amount\" placeholder=\"Balance Amount\" class=\"form-control-dialog\" readonly>\n      </mat-form-field>\n        \n        <mat-form-field>\n            <mat-label>Frequency of payments</mat-label> \n            <mat-select tabindex=\"1\" [(ngModel)]= \"data.payment_frequency\" required=\"true\" >\n              <mat-option value=\"MONTHLY\">MONTHLY</mat-option>\n              <mat-option value=\"WEEKLY\">WEEKLY</mat-option>\n            </mat-select>\n          </mat-form-field>\n\n        <mat-form-field>\n            <input matInput tabindex=\"1\" id=\"duration\" type=\"number\" min=\"0\" [(ngModel)]=\"data.duration\" placeholder=\"Duration (Period of Loan)\" (change)=\"durationcal(data.duration)\" class=\"form-control-dialog\" required=\"true\">\n          </mat-form-field>\n\n          \n          <mat-form-field>\n              <input matInput tabindex=\"1\" type=\"number\" step=\".01\" min=\"0\" [(ngModel)]=\"data.monthly_weekly_payment\" placeholder=\"Monthly/Weekly Payment\" class=\"form-control-dialog\" readonly>\n            </mat-form-field>\n      \n            <mat-form-field>\n                <input matInput tabindex=\"1\" type=\"date\" [(ngModel)]=\"data.start_date\" placeholder=\"Start Date\" class=\"form-control-dialog\" required=\"true\">\n              </mat-form-field>\n\n              <mat-form-field>\n                  <input matInput tabindex=\"1\" type=\"date\" [(ngModel)]=\"data.due_date\" placeholder=\"Due Date\" class=\"form-control-dialog\" required=\"true\">\n                </mat-form-field>\n          \n<!--        \n            <mat-form-field>\n                <mat-label>Start Date</mat-label> \n                <input matInput [matDatepicker]=\"picker1\" tabindex=\"1\" [(ngModel)]=\"data.start_date\" placeholder=\"Choose a date\" required=\"true\">\n                <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\n                <mat-datepicker #picker1></mat-datepicker>\n\n              </mat-form-field>\n\n   \n              <mat-form-field>\n                <mat-label>Monthly Due Date</mat-label> \n                <input matInput [matDatepicker]=\"picker2\" tabindex=\"1\" [(ngModel)]=\"data.due_date\" placeholder=\"Choose a date\" required=\"true\">\n                <mat-datepicker-toggle matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\n                <mat-datepicker #picker2></mat-datepicker>\n              </mat-form-field>  -->\n\n              <!--  <input type=\"file\" (change)=\"onChange($event)\"> -->\n\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"save(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ }),

/***/ "./src/app/in-office/in-office.component.html":
/*!****************************************************!*\
  !*** ./src/app/in-office/in-office.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<input type=\"button\" id=\"clinic_initiate\" (click) = \"initiate_clinic()\"  [style.display]=\"'none'\">\n\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>In-Office Payment Plans <button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\">Add In-Office Plan</button></mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Plan name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows' >\n       <ngx-datatable-column name=\"Id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span>\n            {{rowIndex+1}} \n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column prop=\"patient_name\" name=\"patient_name\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Patient Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n             {{value}}\n     </ng-template>\n    </ngx-datatable-column>\n       <ngx-datatable-column prop=\"patient_email\" name=\"patient_email\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Email</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n           {{value}}\n      </ng-template>\n\n    </ngx-datatable-column>\n\n\n    <!-- <ngx-datatable-column prop=\"plan_name\" name=\"plan_name\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n       <span>Plan Name</span>\n     </ng-template>\n       <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n         <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'plan_name')\" *ngIf=\"!editing[rowIndex + '-plan_name'] && value != ''\">\n           {{value}}\n         </span>\n         \n       </ng-template>\n     </ngx-datatable-column> -->\n\n\n       <ngx-datatable-column prop=\"amount_owing\" name=\"amount_owing\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n       <span>Amount Owing</span>\n     </ng-template>\n       <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          $ {{value}}\n        </ng-template>\n     </ngx-datatable-column>\n\n\n     <ngx-datatable-column prop=\"amount_paid\" name=\"amount_paid\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n     <span>Amount Paid</span>\n   </ng-template>\n     <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          $ {{value}}\n      </ng-template>\n   </ngx-datatable-column>\n   \n      \n   <ngx-datatable-column prop=\"total_amount\" name=\"total_amount\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n     <span>Total Amount</span>\n   </ng-template>\n     <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n        $ {{value}}\n      </ng-template>\n   </ngx-datatable-column>\n\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions </span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n            <a [routerLink]=\"['/in-office-history',value]\" class=\"action_btn golden\" title= 'In-office History'><i class=\"ti-eye  m-r-10\"></i></a>{{rows.clinic_id}}\n            <a class=\"action_btn golden\" (click)=\"openUpdateDialog(value)\" title= 'Update Patient'><i class=\"ti-settings  m-r-10\"></i></a>\n\n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deletePlan(rowIndex)\">\n         \n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/in-office/in-office.component.scss":
/*!****************************************************!*\
  !*** ./src/app/in-office/in-office.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9pbi1vZmZpY2UvaW4tb2ZmaWNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQWlCLEVBQ3BCOztBQUNEO0VBQ0ksbUJBQWtCO0VBQ2xCLGlCQUFnQixFQUNuQiIsImZpbGUiOiJzcmMvYXBwL2luLW9mZmljZS9pbi1vZmZpY2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGRzLXJvbGxlciBkaXY6OmFmdGVyIHtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbn1cbi5zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/in-office/in-office.component.ts":
/*!**************************************************!*\
  !*** ./src/app/in-office/in-office.component.ts ***!
  \**************************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, UpdateInOfficeDialogComponent, InOfficeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateInOfficeDialogComponent", function() { return UpdateInOfficeDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InOfficeComponent", function() { return InOfficeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _in_office_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./in-office.service */ "./src/app/in-office/in-office.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
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
    function DialogOverviewExampleDialogComponent(inofficeService, dialogRef, data) {
        this.inofficeService = inofficeService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.clinic_id = {};
        this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].email]);
    }
    DialogOverviewExampleDialogComponent.prototype.save = function (data) {
        var _this = this;
        this.clinic_id = $('#currentClinicid').attr('cid');
        this.inofficeService.getemailvalidation(data.patient_email, this.clinic_id).subscribe(function (res) {
            if (res.message == 'error') {
                _this.valplans = res.data['message'];
                $('#email').focus();
                return false;
                //            $('#email').first().focus();
            }
            else {
                if (data.patient_name != undefined && data.patient_email != undefined && data.plan_name != undefined && data.plan_description != undefined && data.total_amount != undefined && data.setup_fee != undefined && data.deposite_amount != undefined && data.balance_amount != undefined && data.payment_frequency != undefined && data.duration != undefined && data.monthly_weekly_payment != undefined && data.start_date != undefined && data.due_date != undefined) {
                    _this.dialogRef.close(data);
                }
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
            return false;
        });
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
        // console.log(data)
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
        this.data.monthly_weekly_payment = this.monthlyweeklyamt.toFixed(2);
        // alert(this.monthlyweeklyamt);
    };
    DialogOverviewExampleDialogComponent.prototype.getErrorMessage = function () {
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email')
                ? 'Not a valid email'
                : '';
    };
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/in-office/dialog-overview-example.html"),
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_in_office_service__WEBPACK_IMPORTED_MODULE_1__["InOfficeService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var UpdateInOfficeDialogComponent = /** @class */ (function () {
    function UpdateInOfficeDialogComponent(inofficeService, dialogUpdateRef, data) {
        this.inofficeService = inofficeService;
        this.dialogUpdateRef = dialogUpdateRef;
        this.data = data;
    }
    UpdateInOfficeDialogComponent.prototype.update = function (data) {
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
        // console.log(data);
        if (data.patient_name != undefined && data.patient_address != undefined && data.patient_dob != undefined && data.patient_age != undefined && data.patient_gender != undefined && data.patient_phone_no != undefined && data.patient_home_phno != undefined) {
            this.dialogUpdateRef.close(data);
        }
    };
    UpdateInOfficeDialogComponent.prototype.onNoClick = function () {
        this.dialogUpdateRef.close();
    };
    UpdateInOfficeDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-update-in-office-dialog',
            template: __webpack_require__(/*! ./update-in-office.html */ "./src/app/in-office/update-in-office.html"),
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_in_office_service__WEBPACK_IMPORTED_MODULE_1__["InOfficeService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], UpdateInOfficeDialogComponent);
    return UpdateInOfficeDialogComponent;
}());

var InOfficeComponent = /** @class */ (function () {
    function InOfficeComponent(notifierService, inofficeService, dialog, _cookieService, router) {
        var _this = this;
        this.inofficeService = inofficeService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.treat = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]();
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.notifier = notifierService;
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    InOfficeComponent.prototype.ngAfterViewInit = function () {
        this.initiate_clinic();
        $('#title').html('In-Office Payment Plan');
        $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
    };
    InOfficeComponent.prototype.initiate_clinic = function () {
        this.clinic_id = $('#currentClinicid').attr('cid');
        if (this.clinic_id)
            this.getInofficeMembers();
    };
    InOfficeComponent.prototype.getInofficeMembers = function () {
        var _this = this;
        this.rows = [];
        this.inofficeService.getInofficeMembers(this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                // console.log(this.rows);
                _this.temp = res.data.slice();
                _this.table = data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    InOfficeComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { patient_name: this.patient_name, patient_email: this.patient_email, plan_name: this.plan_name, plan_description: this.plan_description, clinic_id: this.clinic_id, total_amount: this.total_amount, setup_fee: this.setup_fee, deposite_amount: this.deposite_amount, balance_amount: this.balance_amount, payment_frequency: this.payment_frequency, duration: this.duration, monthly_weekly_payment: this.monthly_weekly_payment, start_date: this.start_date, due_date: this.due_date }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.inofficeService.addPaymentPlans(result.patient_name, result.patient_email, result.plan_name, result.plan_description, result.clinic_id, result.total_amount, result.setup_fee, result.deposite_amount, result.balance_amount, result.payment_frequency, result.duration, result.monthly_weekly_payment, result.start_date, result.due_date).subscribe(function (res) {
                if (res.message == 'success') {
                    _this.notifier.notify('success', 'New Patient Added', 'vertical');
                    _this.getInofficeMembers();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        });
    };
    InOfficeComponent.prototype.openUpdateDialog = function (patientid) {
        var _this = this;
        this.inofficeService.getInofficeMembersByID(patientid, this.clinic_id).subscribe(function (updateres) {
            var dialogUpdateRef = _this.dialog.open(UpdateInOfficeDialogComponent, {
                width: '250px',
                data: { patient_name: updateres.data[0].patient_name, patient_address: updateres.data[0].patient_address, patient_dob: updateres.data[0].patient_dob, patient_age: updateres.data[0].patient_age, patient_gender: updateres.data[0].patient_gender, patient_phone_no: updateres.data[0].patient_phone_no, patient_home_phno: updateres.data[0].patient_home_phno, patient_id: patientid }
            });
            dialogUpdateRef.afterClosed().subscribe(function (result) {
                if (result) {
                    $('.ajax-loader').show();
                    _this.inofficeService.updatePatientsDetails(result.patient_name, result.patient_address, result.patient_dob, result.patient_age, result.patient_gender, result.patient_phone_no, result.patient_home_phno, result.patient_id).subscribe(function (res) {
                        $('.ajax-loader').hide();
                        if (res.message == 'success') {
                            _this.notifier.notify('success', 'Patient Updated', 'vertical');
                        }
                    }, function (error) {
                        _this.warningMessage = "Please Provide Valid Inputs!";
                    });
                }
            });
        });
    };
    InOfficeComponent.prototype.deletePlan = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete this plan?")) {
            if (this.rows[row]['id']) {
                this.inofficeService.deletePlan(this.rows[row]['id'], this.clinic_id).subscribe(function (res) {
                    if (res.message == 'success') {
                        _this.notifier.notify('success', 'Plan Removed', 'vertical');
                        _this.getInofficeMembers();
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            }
            else {
                this.getInofficeMembers();
                this.rows.splice(row, 1);
                this.rows = this.rows.slice();
            }
        }
    };
    InOfficeComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.patient_name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    InOfficeComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
        //console.log(this.editing);
    };
    InOfficeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./in-office.component.html */ "./src/app/in-office/in-office.component.html"),
            styles: [__webpack_require__(/*! ./in-office.component.scss */ "./src/app/in-office/in-office.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"], _in_office_service__WEBPACK_IMPORTED_MODULE_1__["InOfficeService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], InOfficeComponent);
    return InOfficeComponent;
}());



/***/ }),

/***/ "./src/app/in-office/in-office.module.ts":
/*!***********************************************!*\
  !*** ./src/app/in-office/in-office.module.ts ***!
  \***********************************************/
/*! exports provided: InOfficeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InOfficeModule", function() { return InOfficeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _in_office_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./in-office.service */ "./src/app/in-office/in-office.service.ts");
/* harmony import */ var _in_office_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./in-office.component */ "./src/app/in-office/in-office.component.ts");
/* harmony import */ var _in_office_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./in-office.routing */ "./src/app/in-office/in-office.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var InOfficeModule = /** @class */ (function () {
    function InOfficeModule() {
    }
    InOfficeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_in_office_routing__WEBPACK_IMPORTED_MODULE_8__["InOfficeRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
            ],
            providers: [
                _in_office_service__WEBPACK_IMPORTED_MODULE_6__["InOfficeService"]
            ],
            entryComponents: [_in_office_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _in_office_component__WEBPACK_IMPORTED_MODULE_7__["UpdateInOfficeDialogComponent"]],
            declarations: [_in_office_component__WEBPACK_IMPORTED_MODULE_7__["InOfficeComponent"], _in_office_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _in_office_component__WEBPACK_IMPORTED_MODULE_7__["UpdateInOfficeDialogComponent"]]
        })
    ], InOfficeModule);
    return InOfficeModule;
}());



/***/ }),

/***/ "./src/app/in-office/in-office.routing.ts":
/*!************************************************!*\
  !*** ./src/app/in-office/in-office.routing.ts ***!
  \************************************************/
/*! exports provided: InOfficeRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InOfficeRoutes", function() { return InOfficeRoutes; });
/* harmony import */ var _in_office_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./in-office.component */ "./src/app/in-office/in-office.component.ts");

var InOfficeRoutes = [
    {
        path: '',
        component: _in_office_component__WEBPACK_IMPORTED_MODULE_0__["InOfficeComponent"],
        data: {
            title: 'In Office'
        }
    }
];


/***/ }),

/***/ "./src/app/in-office/in-office.service.ts":
/*!************************************************!*\
  !*** ./src/app/in-office/in-office.service.ts ***!
  \************************************************/
/*! exports provided: InOfficeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InOfficeService", function() { return InOfficeService; });
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





var InOfficeService = /** @class */ (function () {
    function InOfficeService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Delete Clinic
    InOfficeService.prototype.deletePlan = function (id, clinic_id, user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_id', id);
        formData.append('clinic_id', clinic_id);
        formData.append('user_id', user_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/InofficePayments/deleteInofficeMembers/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    InOfficeService.prototype.addPaymentPlans = function (patient_name, patient_email, plan_name, plan_description, clinic_id, total_amount, setup_fee, deposite_amount, balance_amount, payment_frequency, duration, monthly_weekly_payment, start_date, due_date, token) {
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
            // console.log(response);
            return response;
        }));
    };
    InOfficeService.prototype.getInofficeMembers = function (clinic_id, token, user_id) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        return this.http.get(this.apiUrl + "/InofficePayments/getInofficeMembers?token=" + this._cookieService.get("token") + "&clinic_id=" + clinic_id + "&user_id=" + this._cookieService.get("userid"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            // console.log(response);
            return response;
        }));
    };
    InOfficeService.prototype.updatePatientsDetails = function (patient_name, patient_address, patient_dob, patient_age, patient_gender, patient_phone_no, patient_home_phno, patient_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_name', patient_name);
        formData.append('patient_address', patient_address);
        formData.append('patient_dob', patient_dob);
        formData.append('patient_age', patient_age);
        formData.append('patient_gender', patient_gender);
        formData.append('patient_phone_no', patient_phone_no);
        formData.append('patient_home_phno', patient_home_phno);
        formData.append('patient_id', patient_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/InofficePayments/updatePatientsDetails/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    InOfficeService.prototype.getInofficeMembersByID = function (patient_id, clinic_id, user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/InofficePayments/getInofficeMembersByID?patient_id=" + patient_id + "&user_id=" + this._cookieService.get("userid") + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    InOfficeService.prototype.getemailvalidation = function (patient_email, clinic_id, user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Patients/getemailvalidation?patient_email=" + patient_email + "&user_id=" + this._cookieService.get("userid") + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    InOfficeService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], InOfficeService);
    return InOfficeService;
}());



/***/ }),

/***/ "./src/app/in-office/update-in-office.html":
/*!*************************************************!*\
  !*** ./src/app/in-office/update-in-office.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Update Patient Details</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.patient_name\" placeholder=\"Patient Name\"  class=\"form-control-dialog\" required=\"true\">\n   \n  </mat-form-field>\n \n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.patient_address\" placeholder=\"Patient Address\" class=\"form-control-dialog\" required=\"true\">\n  </mat-form-field>\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" type=\"date\" [(ngModel)]=\"data.patient_dob\" placeholder=\"Patient Dob\" class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n\n    <mat-form-field>\n      <input matInput tabindex=\"1\" type=\"number\" min=\"0\" [(ngModel)]=\"data.patient_age\" placeholder=\"Patient Age\" class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n\n    <mat-form-field>\n      <mat-label>Gender</mat-label> \n      <mat-select tabindex=\"1\" [(ngModel)]= \"data.patient_gender\" required=\"true\">\n        <mat-option value=\"MALE\">MALE</mat-option>\n        <mat-option value=\"FEMALE\">FEMALE</mat-option>\n      </mat-select>\n    </mat-form-field>\n\n\n    <mat-form-field>\n        <input matInput tabindex=\"1\" type=\"number\" min=\"0\" [(ngModel)]=\"data.patient_phone_no\" placeholder=\"Phone Number\" class=\"form-control-dialog\" oninput=\"this.value = this.value.slice(0,10);\" required=\"true\">\n      </mat-form-field>\n\n\n    <mat-form-field>\n        <input matInput tabindex=\"1\" type=\"number\" min=\"0\" [(ngModel)]=\"data.patient_home_phno\" placeholder=\"Home Phone Number\" class=\"form-control-dialog\" oninput=\"this.value = this.value.slice(0,10);\" required=\"true\">\n     </mat-form-field>\n\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"update(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ })

}]);
//# sourceMappingURL=in-office-in-office-module.js.map