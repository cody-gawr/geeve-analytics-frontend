(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["patients-detail-patients-detail-module"],{

/***/ "./src/app/patients-detail/dialog-overview-example.html":
/*!**************************************************************!*\
  !*** ./src/app/patients-detail/dialog-overview-example.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Invite New Member</h1>\n<div mat-dialog-content>\n \n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.invite_member_name\" placeholder=\"Name\" class=\"form-control-dialog\" required=\"true\">\n  </mat-form-field>\n\n  \n\n\n\t<mat-form-field>\n    <input matInput  tabindex=\"1\" placeholder=\"Enter your email\" [(ngModel)]=\"data.invite_member_email\"  [formControl]=\"email\" class=\"form-control-dialog\" required=\"true\">\n    <mat-error *ngIf=\"email.invalid\">{{getErrorMessage()}}</mat-error>\n  </mat-form-field>\n\n  \n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"save(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ }),

/***/ "./src/app/patients-detail/patients-detail.component.html":
/*!****************************************************************!*\
  !*** ./src/app/patients-detail/patients-detail.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Patients Listing | {{planname | titlecase}}<button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\">Invite New Member</button></mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Patient name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n   \n       <ngx-datatable-column prop=\"id\" name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span >\n               {{rowIndex+1}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n\n      <ngx-datatable-column prop=\"patient_name\" name=\"patient_name\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Patient Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n              </ng-template>\n      </ngx-datatable-column>\n\n\n  <ngx-datatable-column prop=\"planName\" name=\"planName\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Patient Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n              </ng-template>\n      </ngx-datatable-column>\n\n<!-- CODE FOR CHANGE PLAN NAME -->\n\n      <!-- <ngx-datatable-column prop=\"planName\" name=\"planName\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <span>Plan Name</span>\n      </ng-template>\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n        <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'planName')\" *ngIf=\"!editing[rowIndex + '-planName']\">\n          {{value}}\n    \n        </span>\n            <div *ngIf=\"editing[rowIndex+ '-planName']\" >\n              <select  (change)=\"updateValue($event, 'member_plan_id', rowIndex)\"  >\n                <option *ngFor=\"let plan of membersplan\" [value]=\"plan.id\" [selected]=\"plan.id == row.member_plan_id ? true : null\">{{plan.planName}} </option>\n              </select>\n            </div>\n            \n        </ng-template>\n      </ngx-datatable-column> -->\n\n\n       <ngx-datatable-column prop=\"patient_address\" name=\"patient_address\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Address</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n         \n        </ng-template>\n      </ngx-datatable-column>\n\n      <ngx-datatable-column prop=\"patient_dob\" name=\"patient_dob\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n       <span>DOB</span>\n     </ng-template>\n       <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n         <span >\n           {{value}}\n         </span>\n        \n       </ng-template>\n     </ngx-datatable-column>\n\n  \n          <ngx-datatable-column prop=\"patient_age\" name=\"patient_age\">\n            <ng-template let-column=\"column\" ngx-datatable-header-template>\n          <span>Age</span>\n        </ng-template>\n          <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n            <span >\n              {{value}}\n            </span>\n           \n          </ng-template>\n        </ngx-datatable-column>\n\n\n              <ngx-datatable-column prop=\"patient_gender\" name=\"patient_gender\">\n                <ng-template let-column=\"column\" ngx-datatable-header-template>\n              <span>Gender</span>\n            </ng-template>\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n                <span >\n                  {{value}}\n                </span>\n                  </ng-template>\n            </ngx-datatable-column>\n\n\n            <ngx-datatable-column prop=\"patient_email\" name=\"patient_email\">\n              <ng-template let-column=\"column\" ngx-datatable-header-template>\n            <span>Email</span>\n            </ng-template>\n            <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n              <span >\n                {{value}}\n              </span>\n              \n            </ng-template>\n            </ngx-datatable-column>\n\n\n        <ngx-datatable-column prop=\"patient_phone_no\" name=\"patient_phone_no\">\n          <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Phone No.</span>\n        </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n         \n        </ng-template>\n        </ngx-datatable-column>\n\n\n        <ngx-datatable-column prop=\"patient_home_phno\" name=\"patient_home_phno\">\n          <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Home Phone No.</span>\n        </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n             </ng-template>\n        </ngx-datatable-column>\n\n      <ngx-datatable-column prop=\"patient_status\" name=\"patient_status\">\n        <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <span>Status</span>\n      </ng-template>\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n        <!-- <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'patient_status')\" *ngIf=\"!editing[rowIndex + '-patient_status']\"> -->\n          {{value}}\n        <!-- </span> -->\n        <!-- <select id=\"statusFilter\" *ngIf=\"editing[rowIndex+ '-patient_status']\" (change)=\"updateValue($event, 'patient_status', rowIndex)\">\n         <option value=\"ACTIVE\" [selected]=\"row.patient_status =='ACTIVE' ? true : null\" >ACTIVE</option>\n          <option value=\"INACTIVE\" [selected]=\"row.patient_status =='INACTIVE' ? true : null\">INACTIVE</option>\n        </select> -->\n       </ng-template>\n      </ngx-datatable-column>\n\n\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n          <a [routerLink]=\"['/patient-info',value]\" class=\"action_btn golden\" title= 'Patients Details'><i class=\"ti-eye  m-r-10\"></i></a>\n          <a class=\"action_btn golden\" (click)=\"openUpdateDialog(value)\" title= 'Update Patient'><i class=\"ti-settings  m-r-10\"></i></a>\n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deletePatients(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n      \n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

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
/*! exports provided: DialogOverviewExampleDialogComponent, UpdatePatientDialogComponent, PatientsDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatePatientDialogComponent", function() { return UpdatePatientDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatientsDetailComponent", function() { return PatientsDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _patients_detail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patients-detail.service */ "./src/app/patients-detail/patients-detail.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
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
        this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].email]);
        this.emailval = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onAdd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent.prototype.getErrorMessage = function () {
        this.emailval.emit(this.email);
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email');
    };
    DialogOverviewExampleDialogComponent.prototype.uploadImage = function (files) {
        this.fileToUpload = files.item(0);
        this.onAdd.emit(this.fileToUpload);
    };
    DialogOverviewExampleDialogComponent.prototype.save = function (data) {
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
        if (data.invite_member_name != undefined && data.invite_member_email != undefined) {
            this.dialogRef.close(data);
        }
    };
    DialogOverviewExampleDialogComponent.prototype.onChange = function (event) {
        var eventObj = event;
        var target = eventObj.target;
        var files = target.files;
        this.file = files[0];
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

var UpdatePatientDialogComponent = /** @class */ (function () {
    function UpdatePatientDialogComponent(dialogUpdateRef, data) {
        this.dialogUpdateRef = dialogUpdateRef;
        this.data = data;
    }
    UpdatePatientDialogComponent.prototype.update = function (data) {
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
        console.log(data);
        if (data.patient_name != undefined && data.patient_address != undefined && data.patient_dob != undefined && data.patient_age != undefined && data.patient_gender != undefined && data.patient_phone_no != undefined && data.patient_home_phno != undefined) {
            this.dialogUpdateRef.close(data);
        }
    };
    UpdatePatientDialogComponent.prototype.onNoClick = function () {
        this.dialogUpdateRef.close();
    };
    UpdatePatientDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-update-patient-dialog',
            template: __webpack_require__(/*! ./update-patient.html */ "./src/app/patients-detail/update-patient.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], UpdatePatientDialogComponent);
    return UpdatePatientDialogComponent;
}());

var data = [];
var PatientsDetailComponent = /** @class */ (function () {
    function PatientsDetailComponent(notifierService, patientsdetailService, dialog, _cookieService, router, route, datePipe) {
        var _this = this;
        this.patientsdetailService = patientsdetailService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.route = route;
        this.datePipe = datePipe;
        this.id = {};
        this.membersplan = {};
        this.clinic_name = {};
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'id' }, { name: 'planName' }, { name: 'member_plan_id' }, { name: 'patient_address' }, { name: 'patient_age' }, { name: 'patient_dob' }, { name: 'patient_email' }, { name: 'patient_gender' }, { name: 'patient_home_phno' }, { name: 'patient_name' }, { name: 'patient_phone_no' }, { name: 'patient_status' }];
        this.notifier = notifierService;
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
        $('.header_filters').addClass('hide_header');
        this.getClinincname();
    };
    PatientsDetailComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { invite_member_name: this.invite_member_name, address: this.invite_member_email }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                $('.ajax-loader').show();
                _this.clinic_id = $('#currentClinicid').attr('cid');
                console.log(_this.clinic_id);
                _this.patientsdetailService.inviteMember(_this.clinic_id, result.invite_member_name, result.invite_member_email).subscribe(function (res) {
                    $('.ajax-loader').hide();
                    if (res.message == 'success') {
                        _this.notifier.notify('success', 'Member has been Invited', 'vertical');
                        _this.getPatients();
                    }
                    else {
                        _this.notifier.notify('success', res.data.message, 'vertical');
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            }
        });
    };
    PatientsDetailComponent.prototype.openUpdateDialog = function (patientid) {
        var _this = this;
        this.patientsdetailService.getInofficeMembersByID(patientid, this.clinic_id).subscribe(function (updateres) {
            console.log(updateres);
            _this.patientdob = _this.datePipe.transform(updateres.data[0].patient_dob, 'yyyy-MM-dd');
            var dialogUpdateRef = _this.dialog.open(UpdatePatientDialogComponent, {
                width: '250px',
                data: { patient_name: updateres.data[0].patient_name, patient_address: updateres.data[0].patient_address, patient_dob: _this.patientdob, patient_age: updateres.data[0].patient_age, patient_gender: updateres.data[0].patient_gender, patient_phone_no: updateres.data[0].patient_phone_no, patient_home_phno: updateres.data[0].patient_home_phno, patient_status: updateres.data[0].patient_status, patient_id: patientid }
            });
            dialogUpdateRef.afterClosed().subscribe(function (result) {
                _this.patientsdetailService.updatePatientsDetails(result.patient_name, result.patient_address, result.patient_dob, result.patient_age, result.patient_gender, result.patient_phone_no, result.patient_home_phno, result.patient_status, result.patient_id).subscribe(function (res) {
                    if (res.message == 'success') {
                        _this.getPatients();
                        _this.notifier.notify('success', 'Patient Updated', 'vertical');
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            });
        });
    };
    PatientsDetailComponent.prototype.getPatients = function () {
        var _this = this;
        this.patientsdetailService.getPatients(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                _this.planname = res.data[0]['planName'];
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
            else if (res.status == '400') {
                _this.rows = [];
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    PatientsDetailComponent.prototype.getClinincname = function () {
        var _this = this;
        this.patientsdetailService.getClinincname(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.clinic_name = res.data[0]['clinic']['clinicName'];
                _this.clinic_id = res.data[0]['clinic_id'];
                $('#title').html('Patients Listing - ' + _this.clinic_name);
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
                        _this.notifier.notify('success', 'Patient Removed', 'vertical');
                        _this.getPatients();
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            }
            else {
                this.rows.splice(row, 1);
                this.rows = this.rows.slice();
                this.getPatients();
            }
        }
    };
    PatientsDetailComponent.prototype.getPlans = function () {
        var _this = this;
        this.patientsdetailService.getPlans().subscribe(function (res) {
            if (res.message == 'success') {
                _this.membersplan = res.data;
                _this.clinic_id = $('#currentClinicid').attr('cid');
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
        this.patientsdetailService.updatePatients(this.rows[rowIndex]['id'], this.rows[rowIndex]['member_plan_id'], this.rows[rowIndex]['patient_status']).subscribe(function (res) {
            if (res.message == 'success') {
                _this.notifier.notify('success', 'Patient Updated', 'vertical');
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
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_7__["NotifierService"], _patients_detail_service__WEBPACK_IMPORTED_MODULE_1__["PatientsDetailService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]])
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
/* harmony import */ var _patients_detail_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./patients-detail.service */ "./src/app/patients-detail/patients-detail.service.ts");
/* harmony import */ var _patients_detail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./patients-detail.component */ "./src/app/patients-detail/patients-detail.component.ts");
/* harmony import */ var _patients_detail_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./patients-detail.routing */ "./src/app/patients-detail/patients-detail.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_9__);
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
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_patients_detail_routing__WEBPACK_IMPORTED_MODULE_7__["PatientsDetailRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_9__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"]
            ],
            providers: [
                _patients_detail_service__WEBPACK_IMPORTED_MODULE_5__["PatientsDetailService"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"]
            ],
            entryComponents: [_patients_detail_component__WEBPACK_IMPORTED_MODULE_6__["DialogOverviewExampleDialogComponent"], _patients_detail_component__WEBPACK_IMPORTED_MODULE_6__["UpdatePatientDialogComponent"]],
            declarations: [_patients_detail_component__WEBPACK_IMPORTED_MODULE_6__["PatientsDetailComponent"],
                _patients_detail_component__WEBPACK_IMPORTED_MODULE_6__["DialogOverviewExampleDialogComponent"], _patients_detail_component__WEBPACK_IMPORTED_MODULE_6__["UpdatePatientDialogComponent"]]
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
    PatientsDetailService.prototype.getClinincname = function (id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/MemberPlan/getMembersclinics?&member_plan_id=" + id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            // console.log(response)
            return response;
        }));
    };
    PatientsDetailService.prototype.updatePatientsDetails = function (patient_name, patient_address, patient_dob, patient_age, patient_gender, patient_phone_no, patient_home_phno, patient_status, patient_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('patient_name', patient_name);
        formData.append('patient_address', patient_address);
        formData.append('patient_dob', patient_dob);
        formData.append('patient_age', patient_age);
        formData.append('patient_gender', patient_gender);
        formData.append('patient_phone_no', patient_phone_no);
        formData.append('patient_home_phno', patient_home_phno);
        formData.append('patient_status', patient_status);
        formData.append('patient_id', patient_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/InofficePayments/updatePatientsDetails/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            console.log(response);
            return response;
        }));
    };
    PatientsDetailService.prototype.getInofficeMembersByID = function (patient_id, clinic_id, user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Patients/getAllPatientByID?patient_id=" + patient_id + "&user_id=" + this._cookieService.get("userid") + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
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



/***/ }),

/***/ "./src/app/patients-detail/update-patient.html":
/*!*****************************************************!*\
  !*** ./src/app/patients-detail/update-patient.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>Update Patient Details</h1>\n<div mat-dialog-content>\n\n  <mat-form-field>\n\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.patient_name\" placeholder=\"Patient Name\"  class=\"form-control-dialog\" required=\"true\">\n   \n  </mat-form-field>\n \n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.patient_address\" placeholder=\"Patient Address\" class=\"form-control-dialog\" required=\"true\">\n  </mat-form-field>\n\n  <mat-form-field>\n      <input matInput tabindex=\"1\" type=\"date\" [(ngModel)]=\"data.patient_dob\" placeholder=\"Patient Dob\" class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n\n    <mat-form-field>\n      <input matInput tabindex=\"1\" type=\"number\" min=\"0\" [(ngModel)]=\"data.patient_age\" placeholder=\"Patient Age\" class=\"form-control-dialog\" required=\"true\">\n    </mat-form-field>\n\n    <mat-form-field>\n      <mat-label>Gender</mat-label> \n      <mat-select name =\"value\" tabindex=\"1\" [(ngModel)]= \"data.patient_gender\"  class=\"form-control-dialog\" required=\"true\">\n        <mat-option value=\"MALE\">MALE</mat-option>\n        <mat-option value=\"FEMALE\">FEMALE</mat-option>\n      </mat-select>\n    </mat-form-field>\n\n\n    <mat-form-field>\n        <input matInput tabindex=\"1\" type=\"number\" min=\"0\" [(ngModel)]=\"data.patient_phone_no\" placeholder=\"Phone Number\" class=\"form-control-dialog\" oninput=\"this.value = this.value.slice(0,10);\" required=\"true\">\n      </mat-form-field>\n\n\n    <mat-form-field>\n        <input matInput tabindex=\"1\" type=\"number\" min=\"0\" [(ngModel)]=\"data.patient_home_phno\" placeholder=\"Home Phone Number\" class=\"form-control-dialog\" oninput=\"this.value = this.value.slice(0,10);\" required=\"true\">\n     </mat-form-field>\n\n    <mat-form-field>\n      <mat-label>Status</mat-label> \n      <mat-select name =\"value\" tabindex=\"1\" [(ngModel)]= \"data.patient_status\"  class=\"form-control-dialog\" required=\"true\">\n        <mat-option value=\"ACTIVE\">ACTIVE</mat-option>\n        <mat-option value=\"INACTIVE\">INACTIVE</mat-option>\n      </mat-select>\n    </mat-form-field>\n\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"update(data)\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>"

/***/ })

}]);
//# sourceMappingURL=patients-detail-patients-detail-module.js.map