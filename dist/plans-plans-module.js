(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["plans-plans-module"],{

/***/ "./src/app/plans/dialog-overview-example.html":
/*!****************************************************!*\
  !*** ./src/app/plans/dialog-overview-example.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add Member Plan</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.planName\" placeholder=\"Member Plan\"  class=\"form-control-dialog\" required=\"true\">\n   \n  </mat-form-field>\n  <input matInput style=\"color: #FF0000;\" tabindex=\"1\" *ngIf=\"valplans\" [(ngModel)]=\"valplans\" required=\"true\">\n\n      <mat-form-field>\n        <mat-select placeholder=\"Treatments\" tabindex=\"1\" [formControl]=\"data.treat\" multiple >\n          <mat-option *ngFor=\"let treatment of data.treatmentdata\" [value]=\"treatment\">{{treatment.treatmentName}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n  <mat-form-field>\n    <mat-label>Duration</mat-label> \n    <mat-select tabindex=\"1\" [(ngModel)]= \"data.planLength\" required=\"true\">\n      <mat-option value=\"MONTHLY\">MONTHLY</mat-option>\n      <mat-option value=\"YEARLY\">YEARLY</mat-option>\n    </mat-select>\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput tabindex=\"1\" type=\"number\" [(ngModel)]=\"data.totalAmount\" placeholder=\"Total Amount\"  class=\"form-control-dialog\" required=\"true\">\n  </mat-form-field>\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" type=\"number\" [(ngModel)]=\"data.discount\" class=\"form-control\" min=\"1\" max=\"100\"  onkeyup=\"if(parseInt(this.value)>100){ this.value =100; return false; }\" placeholder=\"Discount %\"  class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n  \n    <mat-form-field>\n        <input matInput tabindex=\"1\" [(ngModel)]=\"data.description\" placeholder=\"Description\" class=\"form-control-dialog\" required=\"true\">\n      </mat-form-field>\n  <!--  <input type=\"file\" (change)=\"onChange($event)\"> -->\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"save(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ }),

/***/ "./src/app/plans/plans.component.html":
/*!********************************************!*\
  !*** ./src/app/plans/plans.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<input type=\"button\" id=\"clinic_initiate\" (click) = \"initiate_clinic()\"  [style.display]=\"'none'\">\n\n<mat-card>\n    <mat-card-content>\n        <mat-card-title>Member Plans <button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\">Add Member Plan</button></mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Plan name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n       <ngx-datatable-column name=\"Id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span>\n            {{rowIndex+1}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"planName\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Member Plan</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n            {{value}}\n       </ng-template>\n        \n      </ngx-datatable-column>\n\n\n       <ngx-datatable-column name=\"planLength\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Plan Length</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <!-- <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'planLength')\" *ngIf=\"!editing[rowIndex + '-planLength'] && value != ''\"> -->\n            {{value}}\n          <!-- </span>\n          \n          <select id=\"statusFilter\" *ngIf=\"editing[rowIndex+ '-planLength']\" (change)=\"updateValue($event, 'planLength', rowIndex)\">\n            <option value=\"MONTHLY\" [selected]=\"row.planLength =='MONTHLY' ? true : null\" >MONTHLY</option>\n             <option value=\"YEARLY\" [selected]=\"row.planLength =='YEARLY' ? true : null\">YEARLY</option>\n           </select> -->\n\n        </ng-template>\n      </ngx-datatable-column>\n\n\n       <ngx-datatable-column name=\"totalAmount\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Total Amount</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n            $ {{value}}\n       </ng-template>\n\n      </ngx-datatable-column>\n\n\n       <ngx-datatable-column name=\"discount\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n       <span>Discount</span>\n     </ng-template>\n       <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n           {{value}} %\n       </ng-template>\n     </ngx-datatable-column>\n\n\n     <ngx-datatable-column name=\"treatments\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n     <span>Treatment Name</span>\n   </ng-template>\n     <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n         {{value}}\n    \n     </ng-template>\n   </ngx-datatable-column>\n   \n      \n   <ngx-datatable-column name=\"description\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n     <span>Description</span>\n   </ng-template>\n     <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n         {{value}}\n      </ng-template>\n   </ngx-datatable-column>\n\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n            <a [routerLink]=\"['/patients-detail',value]\" class=\"action_btn golden\" title= 'Patients Detail'><i class=\"ti-eye  m-r-10\"></i></a>\n            <a class=\"action_btn golden\" (click)=\"openUpdateDialog(rowIndex)\" title= 'Update Patient'><i class=\"ti-settings  m-r-10\"></i></a>\n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deletePlan(rowIndex)\">\n         \n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/plans/plans.component.scss":
/*!********************************************!*\
  !*** ./src/app/plans/plans.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9wbGFucy9wbGFucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFpQixFQUNwQjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9wbGFucy9wbGFucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sZHMtcm9sbGVyIGRpdjo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xufVxuLnNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/plans/plans.component.ts":
/*!******************************************!*\
  !*** ./src/app/plans/plans.component.ts ***!
  \******************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, UpdatePlanDialogComponent, PlansComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatePlanDialogComponent", function() { return UpdatePlanDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlansComponent", function() { return PlansComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _plans_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plans.service */ "./src/app/plans/plans.service.ts");
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
    function DialogOverviewExampleDialogComponent(plansService, dialogRef, data) {
        this.plansService = plansService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.clinic_id = {};
    }
    DialogOverviewExampleDialogComponent.prototype.save = function (data) {
        var _this = this;
        this.clinic_id = $('#currentClinicid').attr('cid');
        this.plansService.getPlannamevalidation(data.planName, this.clinic_id).subscribe(function (res) {
            if (res.message == 'error') {
                _this.valplans = res.data['message'];
                //console.log(this.valplans)
                //  console.log(data.planName);
                //return true;
                $('#email').focus();
                return false;
            }
            else {
                if (data.planName != undefined && _this.valplans != '' && data.treat != undefined && data.planLength != undefined && data.totalAmount != undefined && data.discount != undefined && data.description != undefined) {
                    _this.dialogRef.close(data);
                }
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
            return false;
        });
        $('.form-control-dialog').each(function () {
            $(this).click();
        });
    };
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/plans/dialog-overview-example.html"),
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_plans_service__WEBPACK_IMPORTED_MODULE_1__["PlansService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var UpdatePlanDialogComponent = /** @class */ (function () {
    function UpdatePlanDialogComponent(plansService, dialogUpdateRef, data) {
        this.plansService = plansService;
        this.dialogUpdateRef = dialogUpdateRef;
        this.data = data;
        this.clinic_id = {};
    }
    UpdatePlanDialogComponent.prototype.update = function (data) {
        var _this = this;
        this.clinic_id = $('#currentClinicid').attr('cid');
        console.log(data);
        this.plansService.getUpdateplanvalidation(data.planName, this.clinic_id, data.memberplan_id).subscribe(function (res) {
            if (res.message == 'error') {
                _this.valplans = res.data['message'];
                //console.log(this.valplans)
                //   console.log(data.planName);
                //return true;
            }
            else {
                if (data.planName != undefined && _this.valplans != '' && data.treat != undefined && data.planLength != undefined && data.totalAmount != undefined && data.discount != undefined && data.description != undefined) {
                    _this.dialogUpdateRef.close(data);
                }
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
            return false;
        });
        $('.form-control-dialog').each(function () {
            $(this).click();
        });
        console.log(this.valplans);
    };
    UpdatePlanDialogComponent.prototype.onNoClick = function () {
        this.dialogUpdateRef.close();
    };
    UpdatePlanDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-update-plan-dialog',
            template: __webpack_require__(/*! ./update-plan.html */ "./src/app/plans/update-plan.html"),
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_plans_service__WEBPACK_IMPORTED_MODULE_1__["PlansService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], UpdatePlanDialogComponent);
    return UpdatePlanDialogComponent;
}());

var PlansComponent = /** @class */ (function () {
    function PlansComponent(notifierService, plansService, dialog, _cookieService, router) {
        var _this = this;
        this.plansService = plansService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.treat = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]();
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'planLength' }, { name: 'totalAmount' }, { name: 'discount' }, { name: 'description' }];
        this.notifier = notifierService;
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    PlansComponent.prototype.ngAfterViewInit = function () {
        this.initiate_clinic();
        this.getTreatments();
        $('#title').html('Members Plan');
        $('.header_filters').removeClass('hide_header');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
    };
    PlansComponent.prototype.initiate_clinic = function () {
        this.clinic_id = $('#currentClinicid').attr('cid');
        if (this.clinic_id)
            this.getPlans();
    };
    PlansComponent.prototype.getPlans = function () {
        var _this = this;
        this.rows = [];
        this.plansService.getPlans(this.clinic_id).subscribe(function (res) {
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
    PlansComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { planName: this.planName, planLength: this.planLength, totalAmount: this.totalAmount, discount: this.discount, description: this.description, treatmentdata: this.treatmentdata, treat: this.treat }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var test = _this.treat.value;
            var data1 = test.map(function (t) { return t.id; });
            var tretid = data1.join();
            $('.ajax-loader').show();
            _this.plansService.addPlans(result.planName, result.planLength, result.totalAmount, result.discount, result.description, _this.clinic_id, tretid).subscribe(function (res) {
                $('.ajax-loader').hide();
                if (res.message == 'success') {
                    _this.notifier.notify('success', 'New Plan Added', 'vertical');
                    _this.getPlans();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        });
    };
    PlansComponent.prototype.openUpdateDialog = function (rowIndex) {
        var _this = this;
        console.log(this.rows);
        this.memberplan_id = this.rows[rowIndex]['id'];
        this.selectedtreat = this.rows[rowIndex]['treatmentsID'];
        var settreatmentid = $.map((this.selectedtreat).split(','), function (value) {
            return parseInt(value);
        });
        this.treat.setValue(settreatmentid);
        var dialogUpdateRef = this.dialog.open(UpdatePlanDialogComponent, {
            width: '250px',
            data: { planName: this.rows[rowIndex]['planName'], planLength: this.rows[rowIndex]['planLength'], totalAmount: this.rows[rowIndex]['totalAmount'], discount: this.rows[rowIndex]['discount'], description: this.rows[rowIndex]['description'], treatmentdata: this.treatmentdata, treat: this.treat, memberplan_id: this.memberplan_id }
        });
        dialogUpdateRef.afterClosed().subscribe(function (result) {
            var test = _this.treat.value;
            var data1 = test.map(function (t) { return t; });
            var tretid = data1.join();
            _this.plansService.updateUser(_this.memberplan_id, _this.clinic_id, result.planName, result.planLength, result.totalAmount, result.discount, tretid, result.description).subscribe(function (res) {
                if (res.message == 'success') {
                    _this.getPlans();
                    _this.notifier.notify('success', 'Plan Updated', 'vertical');
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        });
    };
    PlansComponent.prototype.getTreatments = function () {
        var _this = this;
        this.plansService.getTreatments().subscribe(function (res) {
            if (res.message == 'success') {
                _this.treatmentdata = res.data;
                _this.treat;
                //  console.log(this.treatmentdata);
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    PlansComponent.prototype.deletePlan = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete this plan?")) {
            if (this.rows[row]['id']) {
                this.plansService.deletePlan(this.rows[row]['id']).subscribe(function (res) {
                    if (res.message == 'success') {
                        _this.notifier.notify('success', 'Plan Removed', 'vertical');
                        _this.getPlans();
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            }
            else {
                this.getPlans();
                this.rows.splice(row, 1);
                this.rows = this.rows.slice();
            }
        }
    };
    PlansComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        console.log(event.target.value);
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.planName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    // updateValue(event, cell, rowIndex) {
    //   this.editing[rowIndex + '-' + cell] = false;
    //   if(event.target.value == '')
    //     this.notifier.notify( 'success', 'Value cannot be empty!' ,'vertical');
    //   else {
    //   this.rows[rowIndex][cell] = event.target.value;
    //   this.plansService.updateUser(this.rows[rowIndex]['id'], this.clinic_id,this.rows[rowIndex][cell],cell).subscribe((res) => {
    //     // console.log();
    //      if(res.message == 'success'){
    //       this.notifier.notify( 'success', 'Plan Updated' ,'vertical');
    //         this.getPlans();
    //      }
    //   }, error => {
    //     this.warningMessage = "Please Provide Valid Inputs!";
    //   }    
    //   );  
    //   this.rows = [...this.rows];
    // }
    // }
    PlansComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
        //console.log(this.editing);
    };
    PlansComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./plans.component.html */ "./src/app/plans/plans.component.html"),
            styles: [__webpack_require__(/*! ./plans.component.scss */ "./src/app/plans/plans.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"], _plans_service__WEBPACK_IMPORTED_MODULE_1__["PlansService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], PlansComponent);
    return PlansComponent;
}());



/***/ }),

/***/ "./src/app/plans/plans.module.ts":
/*!***************************************!*\
  !*** ./src/app/plans/plans.module.ts ***!
  \***************************************/
/*! exports provided: PlansModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlansModule", function() { return PlansModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _plans_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plans.service */ "./src/app/plans/plans.service.ts");
/* harmony import */ var _plans_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./plans.component */ "./src/app/plans/plans.component.ts");
/* harmony import */ var _plans_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./plans.routing */ "./src/app/plans/plans.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var PlansModule = /** @class */ (function () {
    function PlansModule() {
    }
    PlansModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_plans_routing__WEBPACK_IMPORTED_MODULE_8__["PlansRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
            ],
            providers: [
                _plans_service__WEBPACK_IMPORTED_MODULE_6__["PlansService"]
            ],
            entryComponents: [_plans_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _plans_component__WEBPACK_IMPORTED_MODULE_7__["UpdatePlanDialogComponent"]],
            declarations: [_plans_component__WEBPACK_IMPORTED_MODULE_7__["PlansComponent"], _plans_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _plans_component__WEBPACK_IMPORTED_MODULE_7__["UpdatePlanDialogComponent"]]
        })
    ], PlansModule);
    return PlansModule;
}());



/***/ }),

/***/ "./src/app/plans/plans.routing.ts":
/*!****************************************!*\
  !*** ./src/app/plans/plans.routing.ts ***!
  \****************************************/
/*! exports provided: PlansRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlansRoutes", function() { return PlansRoutes; });
/* harmony import */ var _plans_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plans.component */ "./src/app/plans/plans.component.ts");

var PlansRoutes = [
    {
        path: '',
        component: _plans_component__WEBPACK_IMPORTED_MODULE_0__["PlansComponent"],
        data: {
            title: 'Plans'
        }
    }
];


/***/ }),

/***/ "./src/app/plans/plans.service.ts":
/*!****************************************!*\
  !*** ./src/app/plans/plans.service.ts ***!
  \****************************************/
/*! exports provided: PlansService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlansService", function() { return PlansService; });
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





var PlansService = /** @class */ (function () {
    function PlansService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Get Dentist
    PlansService.prototype.getPlans = function (clinic_id, user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/MemberPlan/getMemberplan?token=" + this._cookieService.get("token") + "&user_id=" + this._cookieService.get("userid") + "&clinic_id=" + clinic_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    PlansService.prototype.getTreatments = function (user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Treatments/getTreatments?token=" + this._cookieService.get("token") + "&user_id=" + this._cookieService.get("userid"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Delete Clinic
    PlansService.prototype.deletePlan = function (id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/MemberPlan/deleteMemberplan", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // updateUser(memberid,clinic_id, value, column, token = this._cookieService.get("token")): Observable<any> {
    // const formData = new FormData();
    // formData.append('id', memberid);
    // formData.append('clinic_id', clinic_id);
    //  formData.append(column, value);
    //  formData.append('user_id', this._cookieService.get("userid"));
    //  formData.append('token', token);
    //     return this.http.post(this.apiUrl +"/MemberPlan/updateMemberplan/", formData)
    //     .pipe(map((response: Response) => {
    //                     return response;
    //                 })
    //     );
    // }
    PlansService.prototype.updateUser = function (memberid, clinic_id, planName, planLength, totalAmount, discount, treatment_id, description, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', memberid);
        formData.append('clinic_id', clinic_id);
        formData.append('planName', planName);
        formData.append('planLength', planLength);
        formData.append('totalAmount', totalAmount);
        formData.append('discount', discount);
        formData.append('treatment_id', treatment_id);
        formData.append('description', description);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/MemberPlan/updateMemberplan/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    PlansService.prototype.addPlans = function (planName, planLength, totalAmount, discount, description, clinic_id, treat, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('clinic_id', clinic_id);
        formData.append('planName', planName);
        formData.append('planLength', planLength);
        formData.append('discount', discount);
        formData.append('totalAmount', totalAmount);
        formData.append('description', description);
        formData.append('treatment_id', treat);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/MemberPlan/addmemberplan/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    PlansService.prototype.getPlannamevalidation = function (planName, clinic_id, token, user_id) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        return this.http.get(this.apiUrl + "/MemberPlan/getPlannamevalidation?token=" + this._cookieService.get("token") + "&planName=" + planName + "&clinic_id=" + clinic_id + "&user_id=" + this._cookieService.get("userid"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            // console.log(response);
            return response;
        }));
    };
    PlansService.prototype.getUpdateplanvalidation = function (planName, clinic_id, memberid, token, user_id) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        return this.http.get(this.apiUrl + "/MemberPlan/getUpdateplanvalidation?token=" + this._cookieService.get("token") + "&planName=" + planName + "&clinic_id=" + clinic_id + "&id=" + memberid + "&user_id=" + this._cookieService.get("userid"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            // console.log(response);
            return response;
        }));
    };
    PlansService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], PlansService);
    return PlansService;
}());



/***/ }),

/***/ "./src/app/plans/update-plan.html":
/*!****************************************!*\
  !*** ./src/app/plans/update-plan.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Update Member Plan</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.planName\" placeholder=\"Member Plan\"  class=\"form-control-dialog\" required=\"true\">\n   \n  </mat-form-field>\n  <input matInput style=\"color: #FF0000;\" tabindex=\"1\" *ngIf=\"valplans\" [(ngModel)]=\"valplans\" required=\"true\">\n\n <mat-form-field>\n          <mat-select placeholder=\"Treatments\" tabindex=\"1\" [formControl]=\"data.treat\" multiple>       \n            <mat-option *ngFor=\"let treatment of data.treatmentdata\" [value]=\"treatment.id\">{{treatment.treatmentName}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n  <mat-form-field>\n\n    <mat-label>Duration</mat-label> \n    <mat-select tabindex=\"1\" [(ngModel)]= \"data.planLength\" required=\"true\">\n      <mat-option value=\"MONTHLY\">MONTHLY</mat-option>\n      <mat-option value=\"YEARLY\">YEARLY</mat-option>\n    </mat-select>\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput tabindex=\"1\" type=\"number\" [(ngModel)]=\"data.totalAmount\" placeholder=\"Total Amount\"  class=\"form-control-dialog\" required=\"true\">\n  </mat-form-field>\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" type=\"number\" [(ngModel)]=\"data.discount\" class=\"form-control\" min=\"1\" max=\"100\"  onkeyup=\"if(parseInt(this.value)>100){ this.value =100; return false; }\" placeholder=\"Discount %\"  class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n  \n    <mat-form-field>\n        <input matInput tabindex=\"1\" [(ngModel)]=\"data.description\" placeholder=\"Description\" class=\"form-control-dialog\" required=\"true\">\n      </mat-form-field>\n  <!--  <input type=\"file\" (change)=\"onChange($event)\"> -->\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"update(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ })

}]);
//# sourceMappingURL=plans-plans-module.js.map