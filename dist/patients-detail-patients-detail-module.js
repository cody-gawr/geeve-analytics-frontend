(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["patients-detail-patients-detail-module"],{

/***/ "./src/app/patients-detail/dialog-overview-example.html":
/*!**************************************************************!*\
  !*** ./src/app/patients-detail/dialog-overview-example.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Add New Member</h1>\n<div mat-dialog-content>\n \n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.invite_member_name\" placeholder=\"Name\">\n  </mat-form-field>\n\n  \n  <!-- <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.invite_member_email\" placeholder=\"Email Address\" />\n\n  </mat-form-field> -->\n  \n\n\t<mat-form-field>\n    <input matInput placeholder=\"Enter your email\" [(ngModel)]=\"data.invite_member_email\"  [formControl]=\"email\" required>\n    <mat-error *ngIf=\"email.invalid\">{{getErrorMessage()}}</mat-error>\n  </mat-form-field>\n\n  \n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"data\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ }),

/***/ "./src/app/patients-detail/patients-detail.component.html":
/*!****************************************************************!*\
  !*** ./src/app/patients-detail/patients-detail.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Patients Listing  <button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\">Invite New Member</button></mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Patient name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n   \n       <ngx-datatable-column prop=\"id\" name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span >\n               {{rowIndex+1}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n\n      <ngx-datatable-column prop=\"patient_name\" name=\"patient_name\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Patient Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n              </ng-template>\n      </ngx-datatable-column>\n\n      <ngx-datatable-column prop=\"planName\" name=\"planName\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <span>Plan Name</span>\n      </ng-template>\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n        <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'planName')\" *ngIf=\"!editing[rowIndex + '-planName']\">\n          {{value}}\n    \n        </span>\n            <div *ngIf=\"editing[rowIndex+ '-planName']\" >\n              <select  (change)=\"updateValue($event, 'member_plan_id', rowIndex)\"  >\n                <option *ngFor=\"let plan of membersplan\" [value]=\"plan.id\" [selected]=\"plan.id == row.member_plan_id ? true : null\">{{plan.planName}} </option>\n              </select>\n            </div>\n            \n        </ng-template>\n      </ngx-datatable-column>\n\n\n       <ngx-datatable-column prop=\"patient_address\" name=\"patient_address\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Address</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n         \n        </ng-template>\n      </ngx-datatable-column>\n\n      <ngx-datatable-column prop=\"patient_dob\" name=\"patient_dob\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n       <span>DOB</span>\n     </ng-template>\n       <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n         <span >\n           {{value}}\n         </span>\n        \n       </ng-template>\n     </ngx-datatable-column>\n\n  \n          <ngx-datatable-column prop=\"patient_age\" name=\"patient_age\">\n            <ng-template let-column=\"column\" ngx-datatable-header-template>\n          <span>Age</span>\n        </ng-template>\n          <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n            <span >\n              {{value}}\n            </span>\n           \n          </ng-template>\n        </ngx-datatable-column>\n\n\n              <ngx-datatable-column prop=\"patient_gender\" name=\"patient_gender\">\n                <ng-template let-column=\"column\" ngx-datatable-header-template>\n              <span>Gender</span>\n            </ng-template>\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n                <span >\n                  {{value}}\n                </span>\n                  </ng-template>\n            </ngx-datatable-column>\n\n\n            <ngx-datatable-column prop=\"patient_email\" name=\"patient_email\">\n              <ng-template let-column=\"column\" ngx-datatable-header-template>\n            <span>Email</span>\n            </ng-template>\n            <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n              <span >\n                {{value}}\n              </span>\n              \n            </ng-template>\n            </ngx-datatable-column>\n\n\n        <ngx-datatable-column prop=\"patient_phone_no\" name=\"patient_phone_no\">\n          <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Phone No.</span>\n        </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n         \n        </ng-template>\n        </ngx-datatable-column>\n\n\n        <ngx-datatable-column prop=\"patient_home_phno\" name=\"patient_home_phno\">\n          <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Home Phone No.</span>\n        </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n             </ng-template>\n        </ngx-datatable-column>\n\n      <ngx-datatable-column prop=\"patient_status\" name=\"patient_status\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <span>Status</span>\n      </ng-template>\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n        <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'patient_status')\" *ngIf=\"!editing[rowIndex + '-patient_status']\">\n          {{value}}\n        </span>\n        <select id=\"statusFilter\" *ngIf=\"editing[rowIndex+ '-patient_status']\" (change)=\"updateValue($event, 'patient_status', rowIndex)\">\n         <option value=\"ACTIVE\" [selected]=\"row.patient_status =='ACTIVE' ? true : null\" >ACTIVE</option>\n          <option value=\"INACTIVE\" [selected]=\"row.patient_status =='INACTIVE' ? true : null\">INACTIVE</option>\n        </select>\n       </ng-template>\n      </ngx-datatable-column>\n\n\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n          <a [routerLink]=\"['/patient-info',value]\" class=\"action_btn golden\" title= 'Patients Details'><i class=\"ti-settings  m-r-10\"></i></a>\n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deletePatients(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/patients-detail/patients-detail.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/patients-detail/patients-detail.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9wYXRpZW50cy1kZXRhaWwvcGF0aWVudHMtZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQWlCLEVBQ3BCOztBQUNEO0VBQ0ksbUJBQWtCO0VBQ2xCLGlCQUFnQixFQUNuQiIsImZpbGUiOiJzcmMvYXBwL3BhdGllbnRzLWRldGFpbC9wYXRpZW50cy1kZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGRzLXJvbGxlciBkaXY6OmFmdGVyIHtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbn1cbi5zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYmFja2dyb3VuZDogbm9uZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/patients-detail/patients-detail.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/patients-detail/patients-detail.component.ts ***!
  \**************************************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, PatientsDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientsDetailComponent", function() { return PatientsDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _patients_detail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patients-detail.service */ "./src/app/patients-detail/patients-detail.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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







var DialogOverviewExampleDialogComponent = /** @class */ (function () {
    function DialogOverviewExampleDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.clinic_id = {};
        this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].email]);
        this.emailval = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onAdd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent.prototype.getErrorMessage = function () {
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email')
                ? 'Not a valid email'
                : '';
        this.emailval.emit(this.email);
    };
    DialogOverviewExampleDialogComponent.prototype.uploadImage = function (files) {
        this.fileToUpload = files.item(0);
        this.onAdd.emit(this.fileToUpload);
    };
    DialogOverviewExampleDialogComponent.prototype.onChange = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        this.file = files[0];
        console.log(this.file);
        //  this.filedata =this.file;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DialogOverviewExampleDialogComponent.prototype, "emailval", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DialogOverviewExampleDialogComponent.prototype, "onAdd", void 0);
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/patients-detail/dialog-overview-example.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var data = [];
var PatientsDetailComponent = /** @class */ (function () {
    function PatientsDetailComponent(patientsdetailService, dialog, _cookieService, router, route) {
        var _this = this;
        this.patientsdetailService = patientsdetailService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.route = route;
        this.id = {};
        this.membersplan = {};
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'member_plan_id' }, { name: 'patient_address' }, { name: 'patient_age' }, { name: 'patient_dob' }, { name: 'patient_email' }, { name: 'patient_gender' }, { name: 'patient_home_phno' }, { name: 'patient_name' }, { name: 'patient_phone_no' }, { name: 'patient_status' }];
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    PatientsDetailComponent_1 = PatientsDetailComponent;
    PatientsDetailComponent.prototype.ngAfterViewInit = function () {
        this.id = this.route.snapshot.paramMap.get("id");
        this.getPlans();
        this.getPatients();
        $('#title').html('Patients Listing');
        //$('.header_filters').hide();
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
    };
    PatientsDetailComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { invite_member_name: this.invite_member_name, address: this.invite_member_email }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.clinic_id = $('#currentClinicid').attr('cid');
            _this.patientsdetailService.inviteMember(_this.clinic_id, result.invite_member_name, result.invite_member_email).subscribe(function (res) {
                console.log(res);
                if (res.message == 'success') {
                    alert('Member has been Invited');
                    _this.getPatients();
                    console.log(res);
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        });
    };
    PatientsDetailComponent.prototype.getPatients = function () {
        var _this = this;
        this.patientsdetailService.getPatients(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                console.log(_this.rows);
                _this.temp = res.data.slice();
                // console.log(this.temp )
                _this.table = data;
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
    PatientsDetailComponent.prototype.deletePatients = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete Patient?")) {
            if (this.rows[row]['id']) {
                this.patientsdetailService.deletePatients(this.rows[row]['id']).subscribe(function (res) {
                    if (res.message == 'success') {
                        alert('Patient Removed');
                        _this.getPatients();
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
    PatientsDetailComponent.prototype.getPlans = function () {
        var _this = this;
        this.patientsdetailService.getPlans().subscribe(function (res) {
            if (res.message == 'success') {
                _this.membersplan = res.data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    PatientsDetailComponent.prototype.updateFilter = function (event) {
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
    PatientsDetailComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        console.log(this.rows);
        this.patientsdetailService.updatePatients(this.rows[rowIndex]['id'], this.rows[rowIndex]['member_plan_id'], this.rows[rowIndex]['patient_status']).subscribe(function (res) {
            if (res.message == 'success') {
                alert('patient Updated');
                _this.getPatients();
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
        this.rows = this.rows.slice();
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    };
    PatientsDetailComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
    };
    var PatientsDetailComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(PatientsDetailComponent_1),
        __metadata("design:type", PatientsDetailComponent)
    ], PatientsDetailComponent.prototype, "table", void 0);
    PatientsDetailComponent = PatientsDetailComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./patients-detail.component.html */ "./src/app/patients-detail/patients-detail.component.html"),
            styles: [__webpack_require__(/*! ./patients-detail.component.scss */ "./src/app/patients-detail/patients-detail.component.scss")]
        }),
        __metadata("design:paramtypes", [_patients_detail_service__WEBPACK_IMPORTED_MODULE_1__["PatientsDetailService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], PatientsDetailComponent);
    return PatientsDetailComponent;
}());



/***/ }),

/***/ "./src/app/patients-detail/patients-detail.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/patients-detail/patients-detail.module.ts ***!
  \***********************************************************/
/*! exports provided: PatientsDetailModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientsDetailModule", function() { return PatientsDetailModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _patients_detail_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./patients-detail.service */ "./src/app/patients-detail/patients-detail.service.ts");
/* harmony import */ var _patients_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./patients-detail.component */ "./src/app/patients-detail/patients-detail.component.ts");
/* harmony import */ var _patients_detail_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./patients-detail.routing */ "./src/app/patients-detail/patients-detail.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var PatientsDetailModule = /** @class */ (function () {
    function PatientsDetailModule() {
    }
    PatientsDetailModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_patients_detail_routing__WEBPACK_IMPORTED_MODULE_8__["PatientsDetailRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"]
            ],
            providers: [
                _patients_detail_service__WEBPACK_IMPORTED_MODULE_6__["PatientsDetailService"]
            ],
            entryComponents: [_patients_detail_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"]],
            declarations: [_patients_detail_component__WEBPACK_IMPORTED_MODULE_7__["PatientsDetailComponent"],
                _patients_detail_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"]]
        })
    ], PatientsDetailModule);
    return PatientsDetailModule;
}());



/***/ }),

/***/ "./src/app/patients-detail/patients-detail.routing.ts":
/*!************************************************************!*\
  !*** ./src/app/patients-detail/patients-detail.routing.ts ***!
  \************************************************************/
/*! exports provided: PatientsDetailRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientsDetailRoutes", function() { return PatientsDetailRoutes; });
/* harmony import */ var _patients_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./patients-detail.component */ "./src/app/patients-detail/patients-detail.component.ts");

var PatientsDetailRoutes = [
    {
        path: '',
        component: _patients_detail_component__WEBPACK_IMPORTED_MODULE_0__["PatientsDetailComponent"],
        data: {
            title: 'PatientsDetail'
        }
    }
];


/***/ }),

/***/ "./src/app/patients-detail/patients-detail.service.ts":
/*!************************************************************!*\
  !*** ./src/app/patients-detail/patients-detail.service.ts ***!
  \************************************************************/
/*! exports provided: PatientsDetailService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientsDetailService", function() { return PatientsDetailService; });
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





var PatientsDetailService = /** @class */ (function () {
    function PatientsDetailService(http, _cookieService) {
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
    PatientsDetailService.prototype.getPatients = function (memberid, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Patients/getAllPatient?member_plan_id=" + memberid + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    PatientsDetailService.prototype.updatePatients = function (patient_id, member_plan_id, patient_status, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_id', patient_id);
        formData.append('member_plan_id', member_plan_id);
        formData.append('status', patient_status);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Patients/updatePatientByID/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            console.log(response);
            return response;
        }));
    };
    PatientsDetailService.prototype.getPlans = function (user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/MemberPlan/getAllMemberPlans?token=" + this._cookieService.get("token") + "&user_id=" + this._cookieService.get("userid"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Delete Clinic
    PatientsDetailService.prototype.deletePatients = function (patient_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_id', patient_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Patients/deletePatientByID", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    PatientsDetailService.prototype.inviteMember = function (clinic_id, invite_member_name, invite_member_email, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('clinic_id', clinic_id);
        formData.append('invite_member_name', invite_member_name);
        formData.append('invite_member_email', invite_member_email);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/InviteMember/add/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
            console.log(response);
        }));
    };
    PatientsDetailService.prototype.logoUpload = function (formData) {
        if (this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')
            formData.append('id', this._cookieService.get("childid"));
        else
            formData.append('id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        return this.http.post(this.apiUrl + "/Practices/logoUpload/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    PatientsDetailService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], PatientsDetailService);
    return PatientsDetailService;
}());



/***/ })

}]);
//# sourceMappingURL=patients-detail-patients-detail-module.js.map