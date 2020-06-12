(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["roles-roles-module"],{

/***/ "./src/app/roles/roles.component.html":
/*!********************************************!*\
  !*** ./src/app/roles/roles.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Roles</mat-card-title>\n\n        <!-- ============================================================== -->\n        <!-- column -->\n        <!-- ============================================================== -->\n        <div fxLayout=\"row wrap\">\n        <!-- Card column -->\n                <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n                <h5>Change Password</h5>\n\n                           <form [formGroup]=\"form\" class=\"basic-form\" (ngSubmit)=\"onSubmitPassword()\">\n\n                                <div fxLayout=\"row wrap\">\n                                  <!-- column -->\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <mat-card-title>Current Password</mat-card-title>\n                                      <input matInput type=\"password\" placeholder=\"\" [formControl]=\"form.controls['currentPassword']\" [(ngModel)]= \"currentPassword\">\n                                    </mat-form-field>\n                                  </div>\n                                   <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <mat-card-title>New Password</mat-card-title>\n                                      <input matInput type=\"password\" placeholder=\"\" [formControl]=\"form.controls['newPassword']\" [(ngModel)]=\"newPassword\">\n                                    </mat-form-field>\n                                  </div>\n                                   <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <mat-card-title>Repeat Password</mat-card-title>\n                                      <input matInput type=\"password\" placeholder=\"\" [formControl]=\"form.controls['repeatPassword']\" [(ngModel)]=\"repeatPassword\">\n                                    </mat-form-field>\n                                  </div>                   \n                                 </div> \n                                  <mat-card-actions>\n                                    <button mat-raised-button color=\"primary\" type=\"submit\">Submit</button>\n                                  </mat-card-actions>\n                                  <small *ngIf=\"errorLogin\" class=\"text-danger support-text\">{{errortext}}</small>\n                                  <small  class=\"text-success support-text\">{{successtext}}</small>\n\n                                  <!-- column -->\n                              </form>  \n        </div>\n      </div>\n \n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/roles/roles.component.scss":
/*!********************************************!*\
  !*** ./src/app/roles/roles.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 90%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcm9sZXMvQzpcXHhhbXBwXFxodGRvY3NcXGplZXZlYW5hbHl0aWNzXFxjbGllbnQyL3NyY1xcYXBwXFxyb2xlc1xccm9sZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBZ0I7RUFDaEIsaUJBQWdCO0VBQ2hCLFlBQVcsRUFDWjs7QUFFRDtFQUNFLFdBQVUsRUFDWCIsImZpbGUiOiJzcmMvYXBwL3JvbGVzL3JvbGVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmV4YW1wbGUtZm9ybSB7XG4gIG1pbi13aWR0aDogMTUwcHg7XG4gIG1heC13aWR0aDogNTAwcHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZXhhbXBsZS1mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDkwJTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/roles/roles.component.ts":
/*!******************************************!*\
  !*** ./src/app/roles/roles.component.ts ***!
  \******************************************/
/*! exports provided: RolesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesComponent", function() { return RolesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _roles_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./roles.service */ "./src/app/roles/roles.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RolesComponent = /** @class */ (function () {
    function RolesComponent(_cookieService, fb, rolesService, route) {
        this._cookieService = _cookieService;
        this.fb = fb;
        this.rolesService = rolesService;
        this.route = route;
        this.clinic_id = {};
        this.id = {};
        this.clinicName = 0;
        this.contactName = 0;
        // public chartData: any[] = [];
        this.address = {};
        this.practice_size = {};
        this.xeroConnect = false;
        this.xeroOrganization = '';
        // Sufix and prefix
        this.hide = true;
        this.errorLogin = false;
        this.errortext = "";
        this.successLogin = false;
        this.successtext = "";
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto'
        });
    }
    RolesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = _this.route.snapshot.paramMap.get("id");
            _this.displayName = _this._cookieService.get("display_name");
            _this.email = _this._cookieService.get("email");
            //  this.getprofileSettings();
            $('#title').html('Profile Settings');
            $('.header_filters').hide();
            // this.checkXeroStatus();
        });
        this.form = this.fb.group({
            currentPassword: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            newPassword: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            repeatPassword: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])]
        });
    };
    RolesComponent.prototype.getprofileSettings = function () {
        var _this = this;
        this.rolesService.getprofileSettings(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.displayName = res.data[0].displayName;
                _this.email = res.data[0].email;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    RolesComponent.prototype.onSubmitBasic = function () {
        var _this = this;
        this.displayName = $("#displayName").val();
        this.email = $("#email").val();
        this.imageURL = $("#imageURL").val();
        this.rolesService.updateprofileSettings(this.displayName, this.email, this.imageURL).subscribe(function (res) {
            if (res.message == 'success') {
                var opts = {
                    expires: new Date('2030-07-19')
                };
                _this._cookieService.put("display_name", _this.displayName, opts);
                _this._cookieService.put("user_image", _this.imageURL, opts);
                _this.display_name = _this.displayName;
                alert('Profile Settings Updated');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    RolesComponent.prototype.onSubmitPassword = function () {
        var _this = this;
        this.errorLogin = false;
        this.errortext = "";
        this.successLogin = false;
        this.successtext = "";
        this.currentPassword = this.form.value.currentPassword;
        this.newPassword = this.form.value.newPassword;
        this.repeatPassword = this.form.value.repeatPassword;
        if (this.newPassword == this.repeatPassword) {
            this.rolesService.updatePassword(this.currentPassword, this.newPassword).subscribe(function (res) {
                if (res.message == 'success') {
                    _this.successLogin = true;
                    _this.successtext = res.data;
                }
                else {
                    _this.errorLogin = true;
                    _this.errortext = res.data;
                }
            }, function (error) {
                _this.errorLogin = true;
                _this.errortext = "Please Provide Valid Inputs!";
            });
        }
        else {
            this.errorLogin = true;
            this.errortext = "Password doesn't Match!";
        }
    };
    RolesComponent.prototype.uploadImage = function (files) {
        var _this = this;
        this.fileToUpload = files.item(0);
        var formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        this.rolesService.logoUpload(formData).subscribe(function (res) {
            if (res.message == 'success') {
                _this.imageURL = res.data;
            }
        });
    };
    RolesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlayout',
            template: __webpack_require__(/*! ./roles.component.html */ "./src/app/roles/roles.component.html"),
            styles: [__webpack_require__(/*! ./roles.component.scss */ "./src/app/roles/roles.component.scss")]
        }),
        __metadata("design:paramtypes", [angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__["CookieService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _roles_service__WEBPACK_IMPORTED_MODULE_2__["RolesService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], RolesComponent);
    return RolesComponent;
}());



/***/ }),

/***/ "./src/app/roles/roles.module.ts":
/*!***************************************!*\
  !*** ./src/app/roles/roles.module.ts ***!
  \***************************************/
/*! exports provided: RolesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesModule", function() { return RolesModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _roles_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./roles.routing */ "./src/app/roles/roles.routing.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/index.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _roles_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./roles.component */ "./src/app/roles/roles.component.ts");
/* harmony import */ var _roles_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./roles.service */ "./src/app/roles/roles.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var RolesModule = /** @class */ (function () {
    function RolesModule() {
    }
    RolesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_roles_routing__WEBPACK_IMPORTED_MODULE_7__["RolesRoutes"]),
                _demo_material_module__WEBPACK_IMPORTED_MODULE_4__["DemoMaterialModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                ngx_quill__WEBPACK_IMPORTED_MODULE_8__["QuillModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__["FileUploadModule"],
                _angular_material_tree__WEBPACK_IMPORTED_MODULE_10__["MatTreeModule"],
                _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__["MatDatepickerModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__["NgMultiSelectDropDownModule"].forRoot()
            ],
            providers: [
                _roles_service__WEBPACK_IMPORTED_MODULE_14__["RolesService"]
            ],
            declarations: [
                _roles_component__WEBPACK_IMPORTED_MODULE_13__["RolesComponent"]
            ]
        })
    ], RolesModule);
    return RolesModule;
}());



/***/ }),

/***/ "./src/app/roles/roles.routing.ts":
/*!****************************************!*\
  !*** ./src/app/roles/roles.routing.ts ***!
  \****************************************/
/*! exports provided: RolesRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesRoutes", function() { return RolesRoutes; });
/* harmony import */ var _roles_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roles.component */ "./src/app/roles/roles.component.ts");

var RolesRoutes = [
    {
        path: '',
        component: _roles_component__WEBPACK_IMPORTED_MODULE_0__["RolesComponent"],
        data: {
            title: 'Roles'
        }
    }
];


/***/ }),

/***/ "./src/app/roles/roles.service.ts":
/*!****************************************!*\
  !*** ./src/app/roles/roles.service.ts ***!
  \****************************************/
/*! exports provided: RolesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesService", function() { return RolesService; });
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





var RolesService = /** @class */ (function () {
    function RolesService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Get profileSettings
    RolesService.prototype.getprofileSettings = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Users/getPractices?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Get updateprofileSettings
    RolesService.prototype.updateprofileSettings = function (displayName, email, imageURL, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('displayName', displayName);
        formData.append('email', email);
        formData.append('user_image', imageURL);
        formData.append('id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Users/updateprofileSettings/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Get updatePassword
    RolesService.prototype.updatePassword = function (currentPassword, newPassword, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('oldpassword', currentPassword);
        formData.append('password', newPassword);
        formData.append('confirm_password', newPassword);
        formData.append('id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Users/changePasswordApi/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    RolesService.prototype.logoUpload = function (formData) {
        formData.append('id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        return this.http.post(this.apiUrl + "/Users/logoUpload/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    RolesService.prototype.clearSession = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Xeros/clearSession/?getxero=1?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    RolesService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], RolesService);
    return RolesService;
}());



/***/ })

}]);
//# sourceMappingURL=roles-roles-module.js.map