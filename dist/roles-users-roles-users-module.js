(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["roles-users-roles-users-module"],{

/***/ "./src/app/roles-users/dialog-overview-example.html":
/*!**********************************************************!*\
  !*** ./src/app/roles-users/dialog-overview-example.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"AddUserPopup\"> \n<h1 mat-dialog-title>Add User</h1>\n<div mat-dialog-content>\n  <mat-form-field>\n    <input matInput tabindex=\"1\" class=\"form-control-dialog\" required=\"true\" [(ngModel)]=\"data.display_name\" placeholder=\"Display Name\">\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput tabindex=\"1\" class=\"form-control-dialog\" required=\"true\" [(ngModel)]=\"data.email\" placeholder=\"Email\">\n  </mat-form-field>\n  <div class=\"selectIcon\">\n     <select fxFlex.gt-sm=\"50%\" class=\"form-control-dialog\" required=\"true\" fxFlex.gt-xs=\"50%\" fxFlex=\"100\" class=\"sa_select form-control\" name=\"user_type\" [(ngModel)]=\"data.user_type\" (ngModelChange)=\"loadDentist($event)\">\n      <option value =\"\" selected>Select User Type</option>\n      <option value =\"3\">Receptionist</option>\n   </select> \n </div>\n <div class=\"selectIcon\" *ngIf=\"show_dentist == true\">\n  <select class=\"sa_select sa_select_set_roles form-control\" name=\"dentist_id\" [(ngModel)]=\"data.dentist_id\" >\n      <option value =\"\" selected=\"true\">Select Dentist</option>\n      <option *ngFor=\"let dentist of data.dentists\" value =\"{{dentist.providerId}}\">{{dentist.name}}</option>\n   </select> \n </div>\n   <input type='hidden' tabindex=\"1\" [(ngModel)]=\"data.password\"  placeholder=\"Email\">\n  <!--  <input type=\"file\" (change)=\"onChange($event)\"> -->\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"save(data)\"   tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>\n</div>"

/***/ }),

/***/ "./src/app/roles-users/roles-overview-example.html":
/*!*********************************************************!*\
  !*** ./src/app/roles-users/roles-overview-example.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"SetRolesPopup_outer\">\n<h1 mat-dialog-title>Set Roles</h1>\n<div class=\"SetRolesPopup\">\n  <div class=\"selectIcon\">\n  <select class=\"sa_select sa_select_set_roles form-control\" name=\"user_type\" [(ngModel)]=\"data.user_type\" (ngModelChange)=\"loadPermisions($event)\">\n      <option value =\"\" selected=\"true\">Select User Type</option>\n      <option *ngFor=\"let role of data.roles\" value =\"{{role.id}}\">{{role.role}}</option>\n   </select> \n </div>\n  <div class=\"SetRoles_checkbox\">\n    <mat-checkbox class=\"role_permissions\" [(ngModel)]=\"data.selectedRole['clinics_'+selected_id]\">Clinics</mat-checkbox>\n    <mat-checkbox class=\"role_permissions\" [(ngModel)]=\"data.selectedRole['plans_'+selected_id]\">Plans</mat-checkbox>\n    <mat-checkbox class=\"role_permissions\" [(ngModel)]=\"data.selectedRole['treatments_'+selected_id]\">Treatments</mat-checkbox>\n    <mat-checkbox class=\"role_permissions\" [(ngModel)]=\"data.selectedRole['roles_'+selected_id]\">Roles</mat-checkbox>\n    <mat-checkbox class=\"role_permissions\" [(ngModel)]=\"data.selectedRole['settings_'+selected_id]\">Settings</mat-checkbox>\n    <mat-checkbox class=\"role_permissions\" [(ngModel)]=\"data.selectedRole['inoffice_'+selected_id]\">Inoffice</mat-checkbox>\n  </div>\n  <!--  <input type=\"file\" (change)=\"onChange($event)\"> -->\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"data\" tabindex=\"2\" class=\"mat-raised-button mat-dc\">Ok</button>\n  <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\" class=\"mat-raised-button mat-gray\">No Thanks</button>\n</div>\n</div>"

/***/ }),

/***/ "./src/app/roles-users/roles-users.component.html":
/*!********************************************************!*\
  !*** ./src/app/roles-users/roles-users.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"roles_users\">\n    <mat-card-content>\n        <mat-card-title>Users <div class=\"sa-pull-right\"><button class=\"mat-raised-button mat-gray mr-15\" mat-raised-button (click)=\"openRoleDialog()\">Set Roles</button><button class=\"mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\">Add User</button></div>\n        </mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter Users name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material responsive-datatable' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n       <ngx-datatable-column name=\"Sr\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span>\n            {{value}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"displayName\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Display Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'displayName')\" *ngIf=\"!editing[rowIndex + '-displayName']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'displayName', rowIndex)\" *ngIf=\"editing[rowIndex+ '-displayName']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n       <ngx-datatable-column name=\"Email\">\n       \n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'email')\" *ngIf=\"!editing[rowIndex + '-email']\">\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'email', rowIndex)\" *ngIf=\"editing[rowIndex+ '-email']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n       <ngx-datatable-column name=\"usertype\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>User Type</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span >\n            {{value}}\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'contactName', rowIndex)\" *ngIf=\"editing[rowIndex+ '-contactName']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Created\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span>\n            {{value| date}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n           \n        <!--   <a [routerLink]=\"['/importcsv',value]\" class=\"action_btn golden\" title= 'Import CSV'><i class=\"ti-pencil  m-r-10\"></i></a> -->\n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deleteUser(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/roles-users/roles-users.component.scss":
/*!********************************************************!*\
  !*** ./src/app/roles-users/roles-users.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n.mat-dialog-container {\n  min-width: 700px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9yb2xlcy11c2Vycy9yb2xlcy11c2Vycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFpQixFQUNwQjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixpQkFBZ0IsRUFDbkI7O0FBQ0Q7RUFFSSw0QkFBMkIsRUFFOUIiLCJmaWxlIjoic3JjL2FwcC9yb2xlcy11c2Vycy9yb2xlcy11c2Vycy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sZHMtcm9sbGVyIGRpdjo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xufVxuLnNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xufVxuLm1hdC1kaWFsb2ctY29udGFpbmVyIHtcblxuICAgIG1pbi13aWR0aDogNzAwcHggIWltcG9ydGFudDtcblxufSJdfQ== */"

/***/ }),

/***/ "./src/app/roles-users/roles-users.component.ts":
/*!******************************************************!*\
  !*** ./src/app/roles-users/roles-users.component.ts ***!
  \******************************************************/
/*! exports provided: DialogOverviewExampleDialogComponent, RolesOverviewExampleDialogComponent, RolesUsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DialogOverviewExampleDialogComponent", function() { return DialogOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesOverviewExampleDialogComponent", function() { return RolesOverviewExampleDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesUsersComponent", function() { return RolesUsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _roles_users_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roles-users.service */ "./src/app/roles-users/roles-users.service.ts");
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
    function DialogOverviewExampleDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.clinic_id = {};
        this.show_dentist = false;
        this.onDentist = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DialogOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialogComponent.prototype.loadDentist = function (val) {
        if (val == '4')
            this.show_dentist = true;
    };
    DialogOverviewExampleDialogComponent.prototype.save = function (data) {
        $('.form-control-dialog').each(function () {
            var likeElement = $(this).click();
        });
        if (data.display_name != undefined && data.email != undefined && data.user_type != undefined) {
            this.dialogRef.close(data);
        }
        else {
            return false;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DialogOverviewExampleDialogComponent.prototype, "onDentist", void 0);
    DialogOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dialog-overview-example-dialog',
            template: __webpack_require__(/*! ./dialog-overview-example.html */ "./src/app/roles-users/dialog-overview-example.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], DialogOverviewExampleDialogComponent);
    return DialogOverviewExampleDialogComponent;
}());

var RolesOverviewExampleDialogComponent = /** @class */ (function () {
    function RolesOverviewExampleDialogComponent(rolesRef, data) {
        this.rolesRef = rolesRef;
        this.data = data;
        this.clinic_id = {};
        //   loadPermisions(val) {
        //   data.selected_id = val;
        // }
        this.onAdd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    RolesOverviewExampleDialogComponent.prototype.onNoClick = function () {
        this.rolesRef.close();
    };
    RolesOverviewExampleDialogComponent.prototype.loadPermisions = function (val) {
        this.selected_id = val;
        this.onAdd.emit(val);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], RolesOverviewExampleDialogComponent.prototype, "onAdd", void 0);
    RolesOverviewExampleDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-roles-overview-example-dialog',
            template: __webpack_require__(/*! ./roles-overview-example.html */ "./src/app/roles-users/roles-overview-example.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], RolesOverviewExampleDialogComponent);
    return RolesOverviewExampleDialogComponent;
}());

var data = __webpack_require__(/*! assets/company.json */ "./src/assets/company.json");
var RolesUsersComponent = /** @class */ (function () {
    function RolesUsersComponent(notifierService, rolesUsersService, dialog, _cookieService, router, route, dentistService) {
        var _this = this;
        this.rolesUsersService = rolesUsersService;
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
    RolesUsersComponent_1 = RolesUsersComponent;
    RolesUsersComponent.prototype.ngAfterViewInit = function () {
        $('.header_filters').addClass('hide_header');
        this.getUsers();
        this.getRoles();
        this.getDentists();
        this.clinic_id = this.route.snapshot.paramMap.get("id");
        $('#title').html('Users');
        $('.external_clinic').show();
        $('.dentist_dropdown').hide();
        $('.header_filters').addClass('flex_direct_mar');
    };
    RolesUsersComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
            width: '250px',
            data: { display_name: this.display_name, email: this.email, user_type: this.user_type, password: this.password, dentists: this.dentists, dentist_id: this.dentist_id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                _this.rolesUsersService.checkUserEmail(result.email).subscribe(function (res) {
                    if (res.message == 'success') {
                        if (res.data <= 0)
                            _this.add_user(result.display_name, result.email, result.user_type, 'jeeveanalytics', _this.clinic_id, result.dentist_id);
                        else
                            _this.notifier.notify('success', 'Email Already Exists!', 'vertical');
                    }
                }, function (error) {
                    _this.warningMessage = "Please Provide Valid Inputs!";
                });
            }
        });
    };
    RolesUsersComponent.prototype.openRoleDialog = function () {
        var _this = this;
        var rolesRef = this.dialog.open(RolesOverviewExampleDialogComponent, {
            width: '250px',
            data: { display_name: this.display_name, email: this.email, user_type: this.user_type, password: this.password, roles: this.roles, selectedRole: this.selectedRole, selected_id: this.selected_id, dentists: this.dentists }
        });
        var sub = rolesRef.componentInstance.onAdd.subscribe(function (val) {
            _this.selected_id = val;
        });
        rolesRef.afterClosed().subscribe(function (result) {
            if (result != undefined) {
                _this.roles.forEach(function (res1) {
                    var checkedRoles1 = '';
                    var checkedRoles = [];
                    if (result.selectedRole['clinics_' + res1.id])
                        checkedRoles.push('clinics');
                    if (result.selectedRole['roles_' + res1.id])
                        checkedRoles.push('roles');
                    if (result.selectedRole['settings_' + res1.id])
                        checkedRoles.push('settings');
                    if (result.selectedRole['plans_' + res1.id])
                        checkedRoles.push('plans');
                    if (result.selectedRole['treatments_' + res1.id])
                        checkedRoles.push('treatments');
                    if (result.selectedRole['inoffice_' + res1.id])
                        checkedRoles.push('inoffice');
                    var checkedRoles1 = checkedRoles.join();
                    _this.rolesUsersService.saveRoles(res1.id, checkedRoles1).subscribe(function (res) {
                        if (res.message == 'success') {
                            _this.notifier.notify('success', 'Permissions Saved!', 'vertical');
                            _this.getRoles();
                        }
                    }, function (error) {
                        _this.warningMessage = "Please Provide Valid Inputs!";
                    });
                });
            }
        });
    };
    // Get Dentist
    RolesUsersComponent.prototype.getDentists = function () {
        var _this = this;
        this.dentistService.getDentists(this.clinic_id).subscribe(function (res) {
            if (res.message == 'success') {
                res.data.forEach(function (result) {
                    var temp = [];
                    temp['providerId'] = result.providerId;
                    temp['name'] = result.name;
                    _this.dentists.push(temp);
                });
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    RolesUsersComponent.prototype.add_user = function (display_name, email, user_type, password, clinic_id, dentist_id) {
        var _this = this;
        if (dentist_id == '' || dentist_id == undefined)
            dentist_id = '';
        $('.ajax-loader').show();
        this.rolesUsersService.addRoleUser(display_name, email, user_type, password, clinic_id, dentist_id).subscribe(function (res) {
            $('.ajax-loader').hide();
            //if(res.message == 'success'){
            _this.notifier.notify('success', 'User Added', 'vertical');
            _this.getUsers();
            //  }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    RolesUsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.rolesUsersService.getUsers().subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                _this.temp = res.data.slice();
                _this.table = data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    RolesUsersComponent.prototype.getRoles = function () {
        var _this = this;
        this.rolesUsersService.getRoles().subscribe(function (res) {
            if (res.message == 'success') {
                _this.roles = [];
                res.data.forEach(function (result) {
                    _this.selectedRole['clinics_' + result.id] = false;
                    _this.selectedRole['plans_' + result.id] = false;
                    _this.selectedRole['roles_' + result.id] = false;
                    _this.selectedRole['settings_' + result.id] = false;
                    _this.selectedRole['inoffice_' + result.id] = false;
                    var temp = [];
                    temp['id'] = result.id;
                    temp['role'] = result.role;
                    temp['permisions'] = result.permisions;
                    _this.roles.push(temp);
                    var dashboards = result.permisions.split(',');
                    dashboards.forEach(function (results) {
                        _this.selectedRole[results + '_' + result.id] = true;
                    });
                });
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    RolesUsersComponent.prototype.deleteUser = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete User?")) {
            if (this.rows[row]['id']) {
                this.rolesUsersService.deleteUser(this.rows[row]['id']).subscribe(function (res) {
                    if (res.message == 'success') {
                        _this.notifier.notify('success', 'User Removed', 'vertical');
                        _this.getUsers();
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
    RolesUsersComponent.prototype.addDentist = function () {
        console.log(this.rows);
        var temp = {};
        temp['providerId'] = 'Enter Provider Id';
        temp['name'] = 'Enter Name';
        var length = this.rows.length;
        this.editing[length + '-providerId'] = true;
        this.editing[length + '-name'] = true;
        this.rows.push(temp);
        this.table = data;
    };
    RolesUsersComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.displayName.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    RolesUsersComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        if ((this.rows[rowIndex]['providerId'] == 'Enter Provider Id') || (this.rows[rowIndex]['name'] == 'Enter Name')) {
            this.editing[length + '-providerId'] = true;
            this.editing[length + '-name'] = true;
        }
        else {
            this.editing[rowIndex + '-' + cell] = false;
            this.rows[rowIndex][cell] = event.target.value;
            this.rolesUsersService.updateRoleUser(this.rows[rowIndex]['id'], this.rows[rowIndex][cell], cell).subscribe(function (res) {
                if (res.message == 'success') {
                    _this.notifier.notify('success', 'User Details Updated', 'vertical');
                    // this.getDentists();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
            this.rows = this.rows.slice();
            console.log('UPDATED!', this.rows[rowIndex][cell]);
        }
    };
    RolesUsersComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
    };
    var RolesUsersComponent_1;
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(RolesUsersComponent_1),
        __metadata("design:type", RolesUsersComponent)
    ], RolesUsersComponent.prototype, "table", void 0);
    RolesUsersComponent = RolesUsersComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./roles-users.component.html */ "./src/app/roles-users/roles-users.component.html"),
            styles: [__webpack_require__(/*! ./roles-users.component.scss */ "./src/app/roles-users/roles-users.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_6__["NotifierService"], _roles_users_service__WEBPACK_IMPORTED_MODULE_1__["RolesUsersService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"], _dentist_dentist_service__WEBPACK_IMPORTED_MODULE_5__["DentistService"]])
    ], RolesUsersComponent);
    return RolesUsersComponent;
}());



/***/ }),

/***/ "./src/app/roles-users/roles-users.module.ts":
/*!***************************************************!*\
  !*** ./src/app/roles-users/roles-users.module.ts ***!
  \***************************************************/
/*! exports provided: RolesUsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesUsersModule", function() { return RolesUsersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _roles_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./roles-users.service */ "./src/app/roles-users/roles-users.service.ts");
/* harmony import */ var _roles_users_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./roles-users.component */ "./src/app/roles-users/roles-users.component.ts");
/* harmony import */ var _roles_users_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./roles-users.routing */ "./src/app/roles-users/roles-users.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var RolesUsersModule = /** @class */ (function () {
    function RolesUsersModule() {
    }
    RolesUsersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_roles_users_routing__WEBPACK_IMPORTED_MODULE_8__["RolesUsersRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]
            ],
            providers: [
                _roles_users_service__WEBPACK_IMPORTED_MODULE_6__["RolesUsersService"]
            ],
            entryComponents: [_roles_users_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _roles_users_component__WEBPACK_IMPORTED_MODULE_7__["RolesOverviewExampleDialogComponent"]],
            declarations: [_roles_users_component__WEBPACK_IMPORTED_MODULE_7__["RolesUsersComponent"],
                _roles_users_component__WEBPACK_IMPORTED_MODULE_7__["DialogOverviewExampleDialogComponent"], _roles_users_component__WEBPACK_IMPORTED_MODULE_7__["RolesOverviewExampleDialogComponent"]]
        })
    ], RolesUsersModule);
    return RolesUsersModule;
}());



/***/ }),

/***/ "./src/app/roles-users/roles-users.routing.ts":
/*!****************************************************!*\
  !*** ./src/app/roles-users/roles-users.routing.ts ***!
  \****************************************************/
/*! exports provided: RolesUsersRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesUsersRoutes", function() { return RolesUsersRoutes; });
/* harmony import */ var _roles_users_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roles-users.component */ "./src/app/roles-users/roles-users.component.ts");

var RolesUsersRoutes = [
    {
        path: '',
        component: _roles_users_component__WEBPACK_IMPORTED_MODULE_0__["RolesUsersComponent"],
        data: {
            title: 'Roles Users'
        }
    }
];


/***/ })

}]);
//# sourceMappingURL=roles-users-roles-users-module.js.map