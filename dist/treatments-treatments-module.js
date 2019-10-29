(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["treatments-treatments-module"],{

/***/ "./src/app/treatments/dialog-overview-example.html":
/*!*********************************************************!*\
  !*** ./src/app/treatments/dialog-overview-example.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"AddUserPopup\"> \n<h1 mat-dialog-title>Add Treatment</h1>\n<div mat-dialog-content>\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.treatmentName\" placeholder=\"Treatment Name\" required=\"true\">\n  </mat-form-field>\n  <span class=\"treatNameError\"></span>\n\n   <mat-form-field>\n    <mat-label>Treatment Status</mat-label> \n    <mat-select name =\"value\" tabindex=\"1\" [(ngModel)]= \"data.treatmentStatus\"  class=\"form-control-dialog\" required=\"true\">\n      <mat-option value=\"1\">ACTIVE</mat-option>\n      <mat-option value=\"2\">INACTIVE</mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"save(data)\"  tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>\n</div>"

/***/ }),

/***/ "./src/app/treatments/treatments.component.html":
/*!******************************************************!*\
  !*** ./src/app/treatments/treatments.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"roles_users\">\n    <mat-card-content>\n        <mat-card-title>Treatments <div class=\"sa-pull-right\"><button class=\"mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\">Add Treatment</button></div>\n        </mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Treatments List...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n       <ngx-datatable-column name=\"Sr\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span>\n            {{value}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"treatmentName\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Treatment Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'treatmentName')\" *ngIf=\"!editing[rowIndex + '-treatmentName']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'treatmentName', rowIndex)\" *ngIf=\"editing[rowIndex+ '-treatmentName']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n       <!--ngx-datatable-column name=\"Email\">\n       \n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'email')\" *ngIf=\"!editing[rowIndex + '-email']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'email', rowIndex)\" *ngIf=\"editing[rowIndex+ '-email']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column-->\n       <ngx-datatable-column name=\"treatmentStatus\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Treatment Status</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'contactName', rowIndex)\" *ngIf=\"editing[rowIndex+ '-treatmentStatus']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Created\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span>\n            {{value| date}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n           \n          <a mat-raised-button (click)=\"openupdateDialog(rowIndex)\" data-id={{value}} class=\"action_btn golden\" title= 'Edit Treatment Details'><i class=\"ti-eye  m-r-10\"></i></a>\n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deleteTreatment(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/treatments/treatments.component.scss":
/*!******************************************************!*\
  !*** ./src/app/treatments/treatments.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n.mat-dialog-container {\n  min-width: 700px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC90cmVhdG1lbnRzL3RyZWF0bWVudHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBaUIsRUFDcEI7O0FBQ0Q7RUFDSSxtQkFBa0I7RUFDbEIsaUJBQWdCLEVBQ25COztBQUNEO0VBRUksNEJBQTJCLEVBRTlCIiwiZmlsZSI6InNyYy9hcHAvdHJlYXRtZW50cy90cmVhdG1lbnRzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxkcy1yb2xsZXIgZGl2OjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG59XG4uc3Bpbm5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG59XG4ubWF0LWRpYWxvZy1jb250YWluZXIge1xuXG4gICAgbWluLXdpZHRoOiA3MDBweCAhaW1wb3J0YW50O1xuXG59Il19 */"

/***/ }),

/***/ "./src/app/treatments/treatments.component.ts":
/*!****************************************************!*\
  !*** ./src/app/treatments/treatments.component.ts ***!
  \****************************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, UpdateDialogOverviewExampleDialogComponent, TreatmentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdateDialogOverviewExampleDialogComponent", function() { return UpdateDialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreatmentsComponent", function() { return TreatmentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _treatments_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./treatments.service */ "./src/app/treatments/treatments.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dentist/dentist.service */ "./src/app/dentist/dentist.service.ts");
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








var DialogOverviewExampleDialogComponent = /** @class */ (function () {
    function DialogOverviewExampleDialogComponent(treatmentsService, dialogRef, data) {
        this.treatmentsService = treatmentsService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.clinic_id = {};
        this.show_dentist = false;
        this.onDentist = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DialogOverviewExampleDialogComponent.prototype.save = function (data) {
        var _this = this;
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
        if (data.treatmentName != undefined && data.treatmentStatus != undefined) {
            this.treatmentsService.checkTreatmentName(data.treatmentName).subscribe(function (res) {
                if ($.trim(res.message) == $.trim('success') && $.trim(res.status) == $.trim('exist')) {
                    $(".treatNameError").text("");
                    $(".treatNameError").text("Treatment name already exists .");
                    $(".treatNameError").css("color", "red");
                    return false;
                }
                else {
                    _this.dialogRef.close(data);
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        }
        else {
            return false;
        }
    };
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent.prototype.loadDentist = function (val) {
        if (val == '4')
            this.show_dentist = true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DialogOverviewExampleDialogComponent.prototype, "onDentist", void 0);
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/treatments/dialog-overview-example.html"),
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_treatments_service__WEBPACK_IMPORTED_MODULE_1__["TreatmentsService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var UpdateDialogOverviewExampleDialogComponent = /** @class */ (function () {
    function UpdateDialogOverviewExampleDialogComponent(treatmentsService, dialogRefUpdate, data) {
        this.treatmentsService = treatmentsService;
        this.dialogRefUpdate = dialogRefUpdate;
        this.data = data;
        this.clinic_id = {};
        this.onAdd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    UpdateDialogOverviewExampleDialogComponent.prototype.updatesave = function (data) {
        var _this = this;
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
        console.log(data);
        if (data.treatmentName != "" && data.treatmentStatus != "" && data.treatmentId != "") {
            this.treatmentsService.checkTreatmentNameForUpdate(data.treatmentName, data.treatmentId).subscribe(function (res) {
                if ($.trim(res.message) == $.trim('success') && $.trim(res.status) == $.trim('exist')) {
                    $(".treatNameError").text("");
                    $(".treatNameError").text("Treatment name already exists .");
                    $(".treatNameError").css("color", "red");
                    return false;
                }
                else {
                    _this.dialogRefUpdate.close(data);
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        }
        else {
            return false;
        }
    };
    UpdateDialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRefUpdate.close();
    };
    UpdateDialogOverviewExampleDialogComponent.prototype.loadPermisions = function (val) {
        this.selected_id = val;
        this.onAdd.emit(val);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], UpdateDialogOverviewExampleDialogComponent.prototype, "onAdd", void 0);
    UpdateDialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-overview-example-dialog',
            template: __webpack_require__(/*! ./update-dialog-overview-example.html */ "./src/app/treatments/update-dialog-overview-example.html"),
        })
        //UpdateDialogOverviewExampleDialogComponent
        ,
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_treatments_service__WEBPACK_IMPORTED_MODULE_1__["TreatmentsService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], UpdateDialogOverviewExampleDialogComponent);
    return UpdateDialogOverviewExampleDialogComponent;
}());

var data = __webpack_require__(/*! assets/company.json */ "./src/assets/company.json");
var TreatmentsComponent = /** @class */ (function () {
    function TreatmentsComponent(notifierService, treatmentsService, dialog, _cookieService, router, route, dentistService) {
        var _this = this;
        this.treatmentsService = treatmentsService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.route = route;
        this.dentistService = dentistService;
        this.user_type = '';
        this.dentist_id = '';
        this.dentists = [];
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'sr' }, { name: 'displayName' }, { name: 'email' }, { name: 'usertype' }, { name: 'created' }];
        this.roles = [];
        this.abc = true;
        this.selectedRole = [];
        this.notifier = notifierService;
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    TreatmentsComponent_1 = TreatmentsComponent;
    TreatmentsComponent.prototype.ngAfterViewInit = function () {
        $('.header_filters').removeClass('hide_header');
        $('.header_filters').removeClass('flex_direct_mar');
        this.getTreatments();
        this.clinic_id = this.route.snapshot.paramMap.get("id");
        $('#title').html('Treatments');
        $('.header_filters').addClass('hide_header');
    };
    TreatmentsComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { display_name: 'test25' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (result != undefined) {
                _this.addTreatment(result.treatmentName, result.treatmentStatus);
            }
        });
    };
    TreatmentsComponent.prototype.openupdateDialog = function (rowIndex) {
        var _this = this;
        if (this.rows[rowIndex]['id']) {
            this.treatmentsService.getTreatmentDetail(this.rows[rowIndex]['id']).subscribe(function (res) {
                //this.data.treatmentName = res.treatmentName;         
                var dialogRefUpdate = _this.dialog.open(UpdateDialogOverviewExampleDialogComponent, {
                    width: '250px',
                    data: { display_name: 'test26', treatmentName: res.treatmentName, treatmentStatus: res.treatmentStatus, treatmentId: _this.rows[rowIndex]['id'] }
                });
                dialogRefUpdate.afterClosed().subscribe(function (result) {
                    if (result != undefined) {
                        _this.updateTreatment(result.treatmentName, result.treatmentStatus, _this.rows[rowIndex]['id']);
                    }
                });
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
        }
        else {
            this.rows.splice(rowIndex, 1);
            this.rows = this.rows.slice();
        }
    };
    TreatmentsComponent.prototype.addTreatment = function (treatmentName, treatmentStatus) {
        var _this = this;
        this.treatmentsService.addTreatment(treatmentName, treatmentStatus).subscribe(function (res) {
            //if(res.message == 'success'){
            _this.notifier.notify('success', 'Treatment Added', 'vertical');
            _this.getTreatments();
            //  }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    TreatmentsComponent.prototype.updateTreatment = function (treatmentName, treatmentStatus, treatmentId) {
        var _this = this;
        this.treatmentsService.updateTreatment(treatmentName, treatmentStatus, treatmentId).subscribe(function (res) {
            //if(res.message == 'success'){
            _this.notifier.notify('success', 'Treatment Updated', 'vertical');
            _this.getTreatments();
            //  }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    TreatmentsComponent.prototype.getTreatments = function () {
        var _this = this;
        this.treatmentsService.getTreatments().subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                _this.temp = res.data.slice();
                _this.table = data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    TreatmentsComponent.prototype.deleteTreatment = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete Treatment ?")) {
            if (this.rows[row]['id']) {
                this.treatmentsService.deleteTreatment(this.rows[row]['id']).subscribe(function (res) {
                    if (res.message == 'success') {
                        _this.notifier.notify('success', 'Treatment Removed', 'vertical');
                        _this.getTreatments();
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
    TreatmentsComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.treatmentName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    /*updateValue(event, cell, rowIndex) {
     if((this.rows[rowIndex]['providerId']  == 'Enter Provider Id') || (this.rows[rowIndex]['name']  == 'Enter Name')) {
       this.editing[length + '-providerId'] = true;
       this.editing[length + '-name'] = true;
     }
     else {
       this.editing[rowIndex + '-' + cell] = false;
       this.rows[rowIndex][cell] = event.target.value;
       this.treatmentsService.updateRoleUser(this.rows[rowIndex]['id'], this.rows[rowIndex][cell],cell).subscribe((res) => {
          if(res.message == 'success'){
           alert('User Details Updated');
     
          }
       }, error => {
         this.warningMessage = "Please Provide Valid Inputs!";
       }
       );
       this.rows = [...this.rows];
       console.log('UPDATED!', this.rows[rowIndex][cell]);
     }
     } */
    TreatmentsComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
    };
    var TreatmentsComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(TreatmentsComponent_1),
        __metadata("design:type", TreatmentsComponent)
    ], TreatmentsComponent.prototype, "table", void 0);
    TreatmentsComponent = TreatmentsComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./treatments.component.html */ "./src/app/treatments/treatments.component.html"),
            styles: [__webpack_require__(/*! ./treatments.component.scss */ "./src/app/treatments/treatments.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"], _treatments_service__WEBPACK_IMPORTED_MODULE_1__["TreatmentsService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_5__["DentistService"]])
    ], TreatmentsComponent);
    return TreatmentsComponent;
}());



/***/ }),

/***/ "./src/app/treatments/treatments.module.ts":
/*!*************************************************!*\
  !*** ./src/app/treatments/treatments.module.ts ***!
  \*************************************************/
/*! exports provided: TreatmentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreatmentsModule", function() { return TreatmentsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _treatments_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./treatments.service */ "./src/app/treatments/treatments.service.ts");
/* harmony import */ var _treatments_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./treatments.component */ "./src/app/treatments/treatments.component.ts");
/* harmony import */ var _treatments_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./treatments.routing */ "./src/app/treatments/treatments.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var TreatmentsModule = /** @class */ (function () {
    function TreatmentsModule() {
    }
    TreatmentsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_treatments_routing__WEBPACK_IMPORTED_MODULE_8__["TreatmentsRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]
            ],
            providers: [
                _treatments_service__WEBPACK_IMPORTED_MODULE_6__["TreatmentsService"]
            ],
            entryComponents: [_treatments_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _treatments_component__WEBPACK_IMPORTED_MODULE_7__["UpdateDialogOverviewExampleDialogComponent"]],
            declarations: [_treatments_component__WEBPACK_IMPORTED_MODULE_7__["TreatmentsComponent"],
                _treatments_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _treatments_component__WEBPACK_IMPORTED_MODULE_7__["UpdateDialogOverviewExampleDialogComponent"]]
        })
    ], TreatmentsModule);
    return TreatmentsModule;
}());



/***/ }),

/***/ "./src/app/treatments/treatments.routing.ts":
/*!**************************************************!*\
  !*** ./src/app/treatments/treatments.routing.ts ***!
  \**************************************************/
/*! exports provided: TreatmentsRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreatmentsRoutes", function() { return TreatmentsRoutes; });
/* harmony import */ var _treatments_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./treatments.component */ "./src/app/treatments/treatments.component.ts");

var TreatmentsRoutes = [
    {
        path: '',
        component: _treatments_component__WEBPACK_IMPORTED_MODULE_0__["TreatmentsComponent"],
        data: {
            title: 'Roles Users'
        }
    }
];


/***/ }),

/***/ "./src/app/treatments/treatments.service.ts":
/*!**************************************************!*\
  !*** ./src/app/treatments/treatments.service.ts ***!
  \**************************************************/
/*! exports provided: TreatmentsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreatmentsService", function() { return TreatmentsService; });
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





var TreatmentsService = /** @class */ (function () {
    function TreatmentsService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Get Treatments
    TreatmentsService.prototype.getTreatments = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/treatments/getTreatments?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token") + "&type=all", { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            console.log(response);
            return response;
        }));
    };
    TreatmentsService.prototype.checkTreatmentName = function (treatmentName, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/treatments/checkTreatmentName?token=" + this._cookieService.get("token") + "&treatmentName=" + treatmentName, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    TreatmentsService.prototype.checkTreatmentNameForUpdate = function (treatmentName, treatmentId, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/treatments/checkTreatmentNameForUpdate?token=" + this._cookieService.get("token") + "&treatmentName=" + treatmentName + "&treatmentId=" + treatmentId, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Delete Clinic
    TreatmentsService.prototype.deleteTreatment = function (treatment_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', treatment_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/treatments/deleteTreatments", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    //Add Treatment
    TreatmentsService.prototype.addTreatment = function (treatmentName, treatmentStatus, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('treatmentName', treatmentName);
        formData.append('treatmentStatus', treatmentStatus);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/treatments/addTreatments/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    TreatmentsService.prototype.updateTreatment = function (treatmentName, treatmentStatus, id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('treatmentName', treatmentName);
        formData.append('treatmentStatus', treatmentStatus);
        formData.append('id', id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/treatments/updateTreatments/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    TreatmentsService.prototype.getTreatmentDetail = function (treatment_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/treatments/getTreatmentDetail?token=" + this._cookieService.get("token") + "&treatmentId=" + treatment_id, { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    TreatmentsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], TreatmentsService);
    return TreatmentsService;
}());



/***/ }),

/***/ "./src/app/treatments/update-dialog-overview-example.html":
/*!****************************************************************!*\
  !*** ./src/app/treatments/update-dialog-overview-example.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"AddUserPopup\"> \n<h1 mat-dialog-title>Update Treatment</h1>\n <input type=\"hidden\" tabindex=\"1\" [(ngModel)]=\"data.treatmentId\" placeholder=\"Treatment Id\" class=\"treatmentId\" value=\"\" required=\"true\">\n<div mat-dialog-content>\n\n  <mat-form-field>\n    <input matInput tabindex=\"1\" [(ngModel)]=\"data.treatmentName\" placeholder=\"Treatment Name\" class=\"treatmentName\" required=\"true\">\n  </mat-form-field>\n  <span class=\"treatNameError\"></span>\n\n   <mat-form-field>\n    <mat-label>Treatment Status</mat-label> \n    <mat-select name =\"value\" tabindex=\"1\" [(ngModel)]= \"data.treatmentStatus\"  class=\"form-control-dialog treatmentStatus\" required=\"true\">\n      <mat-option  value=\"ACTIVE\">ACTIVE</mat-option>\n      <mat-option  value=\"INACTIVE\">INACTIVE</mat-option>\n    </mat-select>\n  </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"updatesave(data)\"  tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>\n</div>"

/***/ })

}]);
//# sourceMappingURL=treatments-treatments-module.js.map