(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-users-module"],{

/***/ "./src/app/users/users.component.html":
/*!********************************************!*\
  !*** ./src/app/users/users.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-content>\n        <mat-card-title>Users  <button class=\"sa-pull-right mat-raised-button mat-gray\" mat-raised-button (click)=\"openDialog()\"disabled =\"true \">Add User</button></mat-card-title>\n\n        <mat-form-field>\n            <input matInput type='text' class=\"form-control\" placeholder='Type to filter User name...' (keyup)='updateFilter($event)'\n            />\n        </mat-form-field>\n        <ngx-datatable #table class='material' [columns]=\"columns\" [columnMode]=\"'force'\" [headerHeight]=\"50\" [footerHeight]=\"50\"\n            [rowHeight]=\"'auto'\" [limit]=\"10\" [rows]='rows'>\n       <ngx-datatable-column name=\"Id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Id</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n          <span>\n            {{value}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Username\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>User Name</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'username')\" *ngIf=\"!editing[rowIndex + '-username'] && value != ''\">\n            {{value}}\n          </span>\n           <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'username')\" *ngIf=\"!editing[rowIndex + '-username'] && value == ''\">\n            Enter Username\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'username', rowIndex)\" *ngIf=\"editing[rowIndex+ '-username']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n       <ngx-datatable-column name=\"Email\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'email')\" *ngIf=\"!editing[rowIndex + '-email'] && value != ''\">\n            {{value}}\n          </span>\n           <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'email')\" *ngIf=\"!editing[rowIndex + '-email'] && value == ''\">\n            Enter Email\n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'email', rowIndex)\" *ngIf=\"editing[rowIndex+ '-email']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"usertype\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>User Type</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span title=\"Double click to edit\" (dblclick)=\"enableEditing(rowIndex,'usertype')\" *ngIf=\"!editing[rowIndex + '-usertype']\">\n          &nbsp;&nbsp;  {{value}}  \n          </span>\n          <input autofocus (blur)=\"updateValue($event, 'usertype', rowIndex)\" *ngIf=\"editing[rowIndex+ '-usertype']\" type=\"text\" [value]=\"value\"\n          />\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"Created\">\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\">\n          <span>\n            {{value| date}}\n          </span>\n        </ng-template>\n      </ngx-datatable-column>\n      <ngx-datatable-column name=\"id\">\n         <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <span>Actions</span>\n      </ng-template>\n        <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" let-value=\"value\" style=\"width:266px!important;\">\n       \n          <button class=\"action_btn danger\" mat-menu-item (click) = \"deleteUsers(rowIndex)\">\n         <i class=\"ti-trash text-danger m-r-10\"></i></button>\n        </ng-template>\n      </ngx-datatable-column>\n        </ngx-datatable>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/users/users.component.scss":
/*!********************************************!*\
  !*** ./src/app/users/users.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-roller div::after {\n  background: black; }\n\n.spinner {\n  position: relative;\n  background: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC91c2Vycy91c2Vycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFpQixFQUNwQjs7QUFDRDtFQUNJLG1CQUFrQjtFQUNsQixpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC91c2Vycy91c2Vycy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sZHMtcm9sbGVyIGRpdjo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xufVxuLnNwaW5uZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/users/users.component.ts":
/*!******************************************!*\
  !*** ./src/app/users/users.component.ts ***!
  \******************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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
var UsersComponent = /** @class */ (function () {
    function UsersComponent(usersService, dialog, _cookieService, router) {
        var _this = this;
        this.usersService = usersService;
        this.dialog = dialog;
        this._cookieService = _cookieService;
        this.router = router;
        this.data = [
            {
                "dentist": "Ethel Price",
                "provider": "female",
                "company": "Johnson",
                "age": 22
            }
        ];
        this.editing = {};
        this.rows = [];
        this.temp = data.slice();
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [{ prop: 'id' }, { name: 'username' }, { name: 'email' }, { name: 'user_type' }, { name: 'created' }];
        this.rows = data;
        this.temp = data.slice();
        setTimeout(function () {
            _this.loadingIndicator = false;
        }, 1500);
    }
    UsersComponent.prototype.ngAfterViewInit = function () {
        this.getUsers();
        $('#title').html('Users');
        $('.header_filters').hide();
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.usersService.getUsers().subscribe(function (res) {
            if (res.message == 'success') {
                _this.rows = res.data;
                _this.temp = res.data.slice();
                _this.table = data;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    UsersComponent.prototype.deleteUsers = function (row) {
        var _this = this;
        if (confirm("Are you sure to delete this user?")) {
            if (this.rows[row]['id']) {
                this.usersService.deleteUser(this.rows[row]['id']).subscribe(function (res) {
                    if (res.message == 'success') {
                        alert('User Removed');
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
    UsersComponent.prototype.addDentist = function () {
        var temp = {};
        temp['providerId'] = 'Enter Provider Id';
        temp['name'] = 'Enter Name';
        var length = this.rows.length;
        this.editing[length + '-providerId'] = true;
        this.editing[length + '-name'] = true;
        this.rows.push(temp);
        this.table = data;
    };
    UsersComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.username.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
    };
    UsersComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _this = this;
        this.editing[rowIndex + '-' + cell] = false;
        if (event.target.value == '')
            alert('Value cannot be empty!');
        else {
            this.rows[rowIndex][cell] = event.target.value;
            this.usersService.updateUser(this.rows[rowIndex]['id'], this.rows[rowIndex][cell], cell).subscribe(function (res) {
                if (res.message == 'success') {
                    alert('User Updated');
                    _this.getUsers();
                }
            }, function (error) {
                _this.warningMessage = "Please Provide Valid Inputs!";
            });
            this.rows = this.rows.slice();
        }
    };
    UsersComponent.prototype.enableEditing = function (rowIndex, cell) {
        this.editing[rowIndex + '-' + cell] = true;
    };
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-table-filter',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.scss */ "./src/app/users/users.component.scss")]
        }),
        __metadata("design:paramtypes", [_users_service__WEBPACK_IMPORTED_MODULE_1__["UsersService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/users/users.module.ts":
/*!***************************************!*\
  !*** ./src/app/users/users.module.ts ***!
  \***************************************/
/*! exports provided: UsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./users.service */ "./src/app/users/users.service.ts");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./users.component */ "./src/app/users/users.component.ts");
/* harmony import */ var _users_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./users.routing */ "./src/app/users/users.routing.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_users_routing__WEBPACK_IMPORTED_MODULE_8__["UsersRoutes"]),
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"],
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"]
            ],
            providers: [
                _users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"]
            ],
            declarations: [_users_component__WEBPACK_IMPORTED_MODULE_7__["UsersComponent"]]
        })
    ], UsersModule);
    return UsersModule;
}());



/***/ }),

/***/ "./src/app/users/users.routing.ts":
/*!****************************************!*\
  !*** ./src/app/users/users.routing.ts ***!
  \****************************************/
/*! exports provided: UsersRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersRoutes", function() { return UsersRoutes; });
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./users.component */ "./src/app/users/users.component.ts");

var UsersRoutes = [
    {
        path: '',
        component: _users_component__WEBPACK_IMPORTED_MODULE_0__["UsersComponent"],
        data: {
            title: 'Users'
        }
    }
];


/***/ }),

/***/ "./src/app/users/users.service.ts":
/*!****************************************!*\
  !*** ./src/app/users/users.service.ts ***!
  \****************************************/
/*! exports provided: UsersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersService", function() { return UsersService; });
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





var UsersService = /** @class */ (function () {
    function UsersService(http, _cookieService) {
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
    UsersService.prototype.getUsers = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Users/getPracticeOwners?token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Delete Clinic
    UsersService.prototype.deleteUser = function (user_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', user_id);
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Users/delete", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    UsersService.prototype.updateUser = function (user_id, value, column, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', user_id);
        formData.append(column, value);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('clinic_id', '1');
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Users/edit/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Clinic
    UsersService.prototype.addClinic = function (name, address, contact_name, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('clinicName', name);
        formData.append('address', address);
        formData.append('contactName', contact_name);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Practices/add/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    UsersService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], UsersService);
    return UsersService;
}());



/***/ })

}]);
//# sourceMappingURL=users-users-module.js.map