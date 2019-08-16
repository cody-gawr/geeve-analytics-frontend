(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["clinic-settings-clinic-settings-module"],{

/***/ "./src/app/clinic-settings/clinic-settings.component.html":
/*!****************************************************************!*\
  !*** ./src/app/clinic-settings/clinic-settings.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n<div fxLayout=\"row wrap\">\n  <div fxFlex.gt-sm=\"100\" fxFlex=\"100\">\n    <mat-card>\n      <mat-card-content>\n        <mat-card-title>Clinic Settings <button class=\"sa-pull-right mat-raised-button mat-gray connect-xero\" *ngIf =\"xeroConnect == false\" mat-raised-button (click) = \"openXero()\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>\n         <span class=\"org_xero\" *ngIf=\"xeroOrganization != ''\" >- {{xeroOrganization}}</span> <button class=\"sa-pull-right mat-raised-button mat-red disconnect-xero\" *ngIf =\"xeroConnect == true\" mat-raised-button (click) = \"disconnectXero()\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></mat-card-title>\n\n        <!-- ============================================================== -->\n        <!-- column -->\n        <!-- ============================================================== -->\n        <div fxLayout=\"row wrap\">\n        <!-- Card column -->\n        <div fxFlex.gt-sm=\"100%\" fxFlex=\"100\">\n\n                           <form [formGroup]=\"form\" class=\"basic-form\" (ngSubmit)=\"onSubmit()\">\n\n                                <div fxLayout=\"row wrap\">\n                                  <!-- column -->\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <mat-card-title>Clinic Name</mat-card-title>\n                                      <input matInput placeholder=\"\" [formControl]=\"form.controls['clinicName']\" [(ngModel)]= \"clinicName\">\n                                    </mat-form-field>\n                                  </div>\n                                   <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <mat-card-title>Contact Name</mat-card-title>\n                                      <input matInput placeholder=\"\" [formControl]=\"form.controls['contactName']\" [(ngModel)]=\"contactName\">\n                                    </mat-form-field>\n                                  </div>\n                                   <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <mat-card-title>Address</mat-card-title>\n                                      <input matInput placeholder=\"\" [formControl]=\"form.controls['address']\" [(ngModel)]=\"address\">\n                                    </mat-form-field>\n                                  </div>\n                                   <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <mat-card-title>Practice Size</mat-card-title>\n                                      <input matInput placeholder=\"\" [formControl]=\"form.controls['practice_size']\" [(ngModel)]=\"practice_size\">\n                                    </mat-form-field>\n                                  </div>\n                                   \n                                 </div> \n                                  <mat-card-actions>\n                                    <button mat-raised-button color=\"primary\" type=\"submit\">Submit</button>\n                                  </mat-card-actions>\n                                  <!-- column -->\n\n                              </form>\n\n\n        </div>\n      </div>\n \n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/clinic-settings/clinic-settings.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/clinic-settings/clinic-settings.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 90%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVhbmFseXRpY3MvY2xpZW50Mi9zcmMvYXBwL2NsaW5pYy1zZXR0aW5ncy9jbGluaWMtc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBZ0I7RUFDaEIsaUJBQWdCO0VBQ2hCLFlBQVcsRUFDWjs7QUFFRDtFQUNFLFdBQVUsRUFDWCIsImZpbGUiOiJzcmMvYXBwL2NsaW5pYy1zZXR0aW5ncy9jbGluaWMtc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXhhbXBsZS1mb3JtIHtcbiAgbWluLXdpZHRoOiAxNTBweDtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5leGFtcGxlLWZ1bGwtd2lkdGgge1xuICB3aWR0aDogOTAlO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/clinic-settings/clinic-settings.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/clinic-settings/clinic-settings.component.ts ***!
  \**************************************************************/
/*! exports provided: ClinicSettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicSettingsComponent", function() { return ClinicSettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _clinic_settings_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clinic-settings.service */ "./src/app/clinic-settings/clinic-settings.service.ts");
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






var ClinicSettingsComponent = /** @class */ (function () {
    function ClinicSettingsComponent(_cookieService, fb, clinicSettingsService, route) {
        this._cookieService = _cookieService;
        this.fb = fb;
        this.clinicSettingsService = clinicSettingsService;
        this.route = route;
        this.errorLogin = false;
        this.clinic_id = {};
        this.id = {};
        this.clinicName = 0;
        this.contactName = 0;
        // public chartData: any[] = [];
        this.address = {};
        this.practice_size = {};
        this.xeroConnect = false;
        this.xeroOrganization = '';
        // For form validator
        this.email = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email]);
        // Sufix and prefix
        this.hide = true;
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto'
        });
    }
    ClinicSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = _this.route.snapshot.paramMap.get("id");
            _this.getClinicSettings();
            $('#title').html('Clinic Settings');
            $('.external_clinic').show();
            $('.dentist_dropdown').hide();
            $('.header_filters').addClass('flex_direct_mar');
            _this.checkXeroStatus();
        });
        this.form = this.fb.group({
            clinicName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            contactName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            address: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            practice_size: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])]
        });
    };
    ClinicSettingsComponent.prototype.getErrorMessage = function () {
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email')
                ? 'Not a valid email'
                : '';
    };
    ClinicSettingsComponent.prototype.getClinicSettings = function () {
        var _this = this;
        this.clinicSettingsService.getClinicSettings(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.clinicName = res.data[0].clinicName;
                _this.contactName = res.data[0].contactName;
                _this.address = res.data[0].address;
                _this.practice_size = res.data[0].practice_size;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicSettingsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.clinicName = this.form.value.clinicName;
        this.contactName = this.form.value.contactName;
        this.address = this.form.value.address;
        this.practice_size = this.form.value.practice_size;
        this.clinicSettingsService.updateClinicSettings(this.id, this.clinicName, this.contactName, this.address, this.practice_size).subscribe(function (res) {
            if (res.message == 'success') {
                alert('Clinic Settings Updated');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicSettingsComponent.prototype.getXeroLink = function () {
        var _this = this;
        this.clinicSettingsService.getXeroLink(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                _this.xero_link = res.data.button_link;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicSettingsComponent.prototype.openXero = function () {
        var success;
        var win = window.open(this.xero_link, "MsgWindow", "width=400,height=400");
        var self = this;
        var timer = setInterval(function () {
            if (win.closed) {
                self.checkXeroStatus();
                clearTimeout(timer);
            }
        }, 1000);
    };
    ClinicSettingsComponent.prototype.checkXeroStatus = function () {
        var _this = this;
        this.clinicSettingsService.checkXeroStatus(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                if (res.data.xero_connect == 1) {
                    _this.xeroConnect = true;
                    _this.xeroOrganization = res.data.Name;
                }
                else {
                    _this.xeroConnect = false;
                    _this.xeroOrganization = '';
                    _this.disconnectXero();
                }
            }
            else {
                //alert('Error Connecting Xero!!');
                _this.xeroConnect = false;
                _this.xeroOrganization = '';
                _this.disconnectXero();
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicSettingsComponent.prototype.disconnectXero = function () {
        var _this = this;
        this.clinicSettingsService.clearSession(this.id).subscribe(function (res) {
            if (res.message == 'success') {
                //  alert('Xero Account Disconnected');
                _this.xeroConnect = false;
                _this.xeroOrganization = '';
                _this.getXeroLink();
            }
            else {
                //  alert('Error Disonnecting Xero!!');
                _this.xeroConnect = true;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ClinicSettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlayout',
            template: __webpack_require__(/*! ./clinic-settings.component.html */ "./src/app/clinic-settings/clinic-settings.component.html"),
            styles: [__webpack_require__(/*! ./clinic-settings.component.scss */ "./src/app/clinic-settings/clinic-settings.component.scss")]
        }),
        __metadata("design:paramtypes", [angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__["CookieService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _clinic_settings_service__WEBPACK_IMPORTED_MODULE_2__["ClinicSettingsService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ClinicSettingsComponent);
    return ClinicSettingsComponent;
}());



/***/ }),

/***/ "./src/app/clinic-settings/clinic-settings.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/clinic-settings/clinic-settings.module.ts ***!
  \***********************************************************/
/*! exports provided: ClinicSettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicSettingsModule", function() { return ClinicSettingsModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _clinic_settings_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clinic-settings.routing */ "./src/app/clinic-settings/clinic-settings.routing.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/index.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _clinic_settings_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./clinic-settings.component */ "./src/app/clinic-settings/clinic-settings.component.ts");
/* harmony import */ var _clinic_settings_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./clinic-settings.service */ "./src/app/clinic-settings/clinic-settings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var ClinicSettingsModule = /** @class */ (function () {
    function ClinicSettingsModule() {
    }
    ClinicSettingsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_clinic_settings_routing__WEBPACK_IMPORTED_MODULE_7__["ClinicSettingsRoutes"]),
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
                _clinic_settings_service__WEBPACK_IMPORTED_MODULE_14__["ClinicSettingsService"]
            ],
            declarations: [
                _clinic_settings_component__WEBPACK_IMPORTED_MODULE_13__["ClinicSettingsComponent"]
            ]
        })
    ], ClinicSettingsModule);
    return ClinicSettingsModule;
}());



/***/ }),

/***/ "./src/app/clinic-settings/clinic-settings.routing.ts":
/*!************************************************************!*\
  !*** ./src/app/clinic-settings/clinic-settings.routing.ts ***!
  \************************************************************/
/*! exports provided: ClinicSettingsRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicSettingsRoutes", function() { return ClinicSettingsRoutes; });
/* harmony import */ var _clinic_settings_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clinic-settings.component */ "./src/app/clinic-settings/clinic-settings.component.ts");

var ClinicSettingsRoutes = [
    {
        path: '',
        component: _clinic_settings_component__WEBPACK_IMPORTED_MODULE_0__["ClinicSettingsComponent"],
        data: {
            title: 'Clinic Settings'
        }
    }
];


/***/ }),

/***/ "./src/app/clinic-settings/clinic-settings.service.ts":
/*!************************************************************!*\
  !*** ./src/app/clinic-settings/clinic-settings.service.ts ***!
  \************************************************************/
/*! exports provided: ClinicSettingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClinicSettingsService", function() { return ClinicSettingsService; });
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





var ClinicSettingsService = /** @class */ (function () {
    function ClinicSettingsService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiUrl;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Get ClinicSettings
    ClinicSettingsService.prototype.getClinicSettings = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Practices/getPractices?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Get ClinicSettings
    ClinicSettingsService.prototype.updateClinicSettings = function (clinic_id, name, address, contact_name, practice_size, user_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('clinicName', name);
        formData.append('address', address);
        formData.append('contactName', contact_name);
        formData.append('practice_size', practice_size);
        formData.append('id', clinic_id);
        formData.append('user_id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Practices/update/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Get ClinicSettings
    ClinicSettingsService.prototype.getXeroLink = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Xeros/startPublic/?getxero=1", { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ClinicSettingsService.prototype.checkXeroStatus = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Xeros/getXeroStatus?getxero=1&user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ClinicSettingsService.prototype.clearSession = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Xeros/clearSession/?getxero=1?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ClinicSettingsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], ClinicSettingsService);
    return ClinicSettingsService;
}());



/***/ })

}]);
//# sourceMappingURL=clinic-settings-clinic-settings-module.js.map