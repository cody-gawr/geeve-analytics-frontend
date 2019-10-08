(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-settings-profile-settings-module"],{

/***/ "./src/app/profile-settings/profile-settings.component.html":
/*!******************************************************************!*\
  !*** ./src/app/profile-settings/profile-settings.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- ============================================================== -->\n<!-- Card Grid-->\n<!-- ============================================================== -->\n\n        <!-- <mat-card-title>Profile Settings</mat-card-title> -->\n\n        <!-- ============================================================== -->\n        <!-- column -->\n        <!-- ============================================================== -->\n       <div class=\"sa_dentist_graphs_area sa_profile_setting\">\n  <div fxLayout=\"row wrap\" >\n        <!-- Card column -->\n        <div fxFlex.lg=\"50\" fxFlex.md=\"50\" fxFlex.sm=\"100\" fxFlex.xs=\"100\" fxFlex=\"50\">\n          <mat-card>\n      <mat-card-content>\n          <div class=\"basic_details_form\">\n            <mat-card-title>Basic Details</mat-card-title>\n                          <!--  <form [formGroup]=\"form\" class=\"basic-form\"> -->\n\n                                <div fxLayout=\"row wrap\">\n                                  <!-- column -->\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                        <label>Display Name</label>\n                                      <input matInput placeholder=\"\" id=\"displayName\" [(ngModel)]= \"displayName\">\n                                  </div>\n                                   <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                        <label>Email</label>\n                                      <input matInput placeholder=\"\" id=\"email\" [(ngModel)]=\"email\">\n                                  </div>\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <label>Contact No.</label>\n                                    <input matInput placeholder=\"\" id=\"PhoneNo\" type=\"number\" pattern=\"\\d{3}[\\-]\\d{3}[\\-]\\d{4}\" max=\"10\" required [(ngModel)]= \"PhoneNo\">\n                                  </div>\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                      <label>Address</label>\n                                      <input matInput placeholder=\"\" id=\"Address\" [(ngModel)]= \"Address\">\n                                  </div>\n\n                                  <mat-form-field fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-label>Gender</mat-label>\n                                    <mat-select #gender name =\"value\" id=\"Gender\" [(ngModel)]= \"Gender\">\n                                      <mat-option value=\"MALE\">MALE</mat-option>\n                                      <mat-option value=\"FEMALE\">FEMALE</mat-option>\n                                    </mat-select>\n                                  </mat-form-field>\n\n\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                      <label>Specialties</label>\n                                      <input matInput placeholder=\"\" id=\"Specialties\" [(ngModel)]= \"Specialties\">\n                                  </div>\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                      <label>Education</label>\n                                      <input matInput placeholder=\"\" id=\"Education\" [(ngModel)]= \"Education\">\n                                  </div>\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <label>Practice</label>\n                                    <input matInput placeholder=\"\" id=\"practiceDesc\" [(ngModel)]= \"practiceDesc\">\n                                 </div>\n                                 <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                  <label>Website</label>\n                                  <input matInput placeholder=\"\" id=\"Website\" [(ngModel)]= \"Website\">\n                               </div>\n\n                               <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                <label>Publishable Key</label>\n                                <input matInput placeholder=\"\" id=\"publishableKey\" [(ngModel)]= \"publishableKey\">\n                             </div>\n\n                             <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                              <label>Secret Key</label>\n                              <input matInput placeholder=\"\" id=\"secretKey\" [(ngModel)]= \"secretKey\">\n                           </div>\n\n\n                                <div class=\"bd_UpoadImage\" fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                                        <label>Upload Image</label><br>\n                                                        <div class=\"upload-btn\">\n                              <span>Choose file</span>\n                              <input class=\"\" type=\"file\" placeholder=\"\" name= \"file\" id=\"file\" (change)=\"uploadImage($event.target.files)\" >\n                                                      <input type='hidden'  placeholder=\"\" id=\"imageURL\" [(ngModel)]=\"imageURL\">\n                            </div>\n                                                    \n                                  </div>\n                                 </div> \n                                  <mat-card-actions>\n                                    <button mat-raised-button color=\"dc\" type=\"button\"  (click)=\"onSubmitBasic()\">Submit</button>\n                                  </mat-card-actions>\n                                  <!-- column -->\n                            <!--   </form> -->\n                          </div>\n                        </mat-card-content></mat-card>\n        </div>\n                <div fxFlex.lg=\"49\" fxFlex.md=\"49\" fxFlex.sm=\"100\" fxFlex.xs=\"100\" fxFlex=\"49\">\n                  <mat-card>\n      <mat-card-content>\n                  <div class=\"ChangePassword-section\">\n                     <mat-card-title class=\"mat-card-title\">Change Password</mat-card-title>\n\n                           <form [formGroup]=\"form\" class=\"basic-form change-password-form\" (ngSubmit)=\"onSubmitPassword()\">\n\n                                <div fxLayout=\"row wrap\">\n                                  <!-- column -->\n                                  <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <label>Current Password</label>\n                                      <input matInput type=\"password\" placeholder=\"\" [formControl]=\"form.controls['currentPassword']\" [(ngModel)]= \"currentPassword\">\n                                    </mat-form-field>\n                                  </div>\n                                   <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <label>New Password</label>\n                                      <input matInput type=\"password\" placeholder=\"\" [formControl]=\"form.controls['newPassword']\" [(ngModel)]=\"newPassword\">\n                                    </mat-form-field>\n                                  </div>\n                                   <div fxFlex.gt-md=\"100\" fxFlex=\"100\">\n                                    <mat-form-field>\n                                        <label>Repeat Password</label>\n                                      <input matInput type=\"password\" placeholder=\"\" [formControl]=\"form.controls['repeatPassword']\" [(ngModel)]=\"repeatPassword\">\n                                    </mat-form-field>\n                                  </div>                   \n                                 </div> \n                                  <mat-card-actions>\n                                    <button mat-raised-button color=\"dc\" type=\"submit\">Submit</button>\n                                  </mat-card-actions>\n                                  <small *ngIf=\"errorLogin\" class=\"text-danger support-text\">{{errortext}}</small>\n                                  <small  class=\"text-success support-text\">{{successtext}}</small>\n\n                                  <!-- column -->\n                              </form>  </div>\n                            </mat-card-content></mat-card>\n        </div>\n      </div></div>\n \n      "

/***/ }),

/***/ "./src/app/profile-settings/profile-settings.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/profile-settings/profile-settings.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%; }\n\n.example-full-width {\n  width: 90%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi92YXIvd3d3L2h0bWwvamVldmVtZW1iZXJzL2NsaWVudDIvc3JjL2FwcC9wcm9maWxlLXNldHRpbmdzL3Byb2ZpbGUtc2V0dGluZ3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBZ0I7RUFDaEIsaUJBQWdCO0VBQ2hCLFlBQVcsRUFDWjs7QUFFRDtFQUNFLFdBQVUsRUFDWCIsImZpbGUiOiJzcmMvYXBwL3Byb2ZpbGUtc2V0dGluZ3MvcHJvZmlsZS1zZXR0aW5ncy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5leGFtcGxlLWZvcm0ge1xuICBtaW4td2lkdGg6IDE1MHB4O1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmV4YW1wbGUtZnVsbC13aWR0aCB7XG4gIHdpZHRoOiA5MCU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/profile-settings/profile-settings.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/profile-settings/profile-settings.component.ts ***!
  \****************************************************************/
/*! exports provided: ProfileSettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileSettingsComponent", function() { return ProfileSettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _profile_settings_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-settings.service */ "./src/app/profile-settings/profile-settings.service.ts");
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






var ProfileSettingsComponent = /** @class */ (function () {
    function ProfileSettingsComponent(_cookieService, fb, profileSettingsService, route) {
        this._cookieService = _cookieService;
        this.fb = fb;
        this.profileSettingsService = profileSettingsService;
        this.route = route;
        this.clinic_id = {};
        this.id = {};
        this.clinicName = 0;
        this.contactName = 0;
        // public chartData: any[] = [];
        //      public address:any = {};
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
    ProfileSettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = _this.route.snapshot.paramMap.get("id");
            _this.displayName = _this._cookieService.get("display_name");
            _this.email = _this._cookieService.get("email");
            _this.getprofileSettings();
            $('#title').html('Profile Settings');
            $('.external_clinic').hide();
            $('.dentist_dropdown').hide();
            $('.header_filters').addClass('flex_direct_mar');
            // this.checkXeroStatus();
        });
        this.form = this.fb.group({
            currentPassword: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            newPassword: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])],
            repeatPassword: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])]
        });
    };
    ProfileSettingsComponent.prototype.getprofileSettings = function () {
        var _this = this;
        this.profileSettingsService.getprofileSettings().subscribe(function (res) {
            if (res.message == 'success') {
                // this.displayName = res.data[0].displayName;
                // this.email = res.data[0].email;
                _this.PhoneNo = res.data[0].phone_no;
                _this.Address = res.data[0].address;
                _this.Gender = res.data[0].gender;
                _this.Specialties = res.data[0].specialties;
                _this.Education = res.data[0].education;
                _this.practiceDesc = res.data[0].practice_desc;
                _this.Website = res.data[0].website;
                _this.publishableKey = res.data[0].publishable_key;
                _this.secretKey = res.data[0].secret_key;
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ProfileSettingsComponent.prototype.onSubmitBasic = function () {
        var _this = this;
        this.displayName = $("#displayName").val();
        this.email = $("#email").val();
        this.imageURL = $("#imageURL").val();
        this.profileSettingsService.updateprofileSettings(this.displayName, this.email, this.PhoneNo, this.Address, this.Gender, this.Specialties, this.Education, this.practiceDesc, this.Website, this.publishableKey, this.secretKey, this.imageURL).subscribe(function (res) {
            if (res.message == 'success') {
                var opts = {
                    expires: new Date('2030-07-19')
                };
                _this._cookieService.put("display_name", _this.displayName, opts);
                _this._cookieService.put("email", _this.email, opts);
                _this._cookieService.put("user_image", _this.imageURL, opts);
                _this.display_name = _this.displayName;
                _this.phone_no = _this.PhoneNo;
                _this.address = _this.Address;
                _this.gender = _this.Gender;
                _this.specialties = _this.Specialties;
                _this.education = _this.Education;
                _this.practice_desc = _this.practiceDesc;
                _this.website = _this.Website;
                _this.publishable_key = _this.publishableKey;
                _this.secret_key = _this.secretKey;
                alert('Profile Settings Updated');
            }
        }, function (error) {
            _this.warningMessage = "Please Provide Valid Inputs!";
        });
    };
    ProfileSettingsComponent.prototype.onSubmitPassword = function () {
        var _this = this;
        this.errorLogin = false;
        this.errortext = "";
        this.successLogin = false;
        this.successtext = "";
        this.currentPassword = this.form.value.currentPassword;
        this.newPassword = this.form.value.newPassword;
        this.repeatPassword = this.form.value.repeatPassword;
        if (this.newPassword == this.repeatPassword) {
            this.profileSettingsService.updatePassword(this.currentPassword, this.newPassword).subscribe(function (res) {
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
    ProfileSettingsComponent.prototype.uploadImage = function (files) {
        var _this = this;
        this.fileToUpload = files.item(0);
        var formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        this.profileSettingsService.logoUpload(formData).subscribe(function (res) {
            if (res.message == 'success') {
                _this.imageURL = res.data;
            }
        });
    };
    ProfileSettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-formlayout',
            template: __webpack_require__(/*! ./profile-settings.component.html */ "./src/app/profile-settings/profile-settings.component.html"),
            styles: [__webpack_require__(/*! ./profile-settings.component.scss */ "./src/app/profile-settings/profile-settings.component.scss")]
        }),
        __metadata("design:paramtypes", [angular2_cookie_core__WEBPACK_IMPORTED_MODULE_4__["CookieService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _profile_settings_service__WEBPACK_IMPORTED_MODULE_2__["ProfileSettingsService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ProfileSettingsComponent);
    return ProfileSettingsComponent;
}());



/***/ }),

/***/ "./src/app/profile-settings/profile-settings.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/profile-settings/profile-settings.module.ts ***!
  \*************************************************************/
/*! exports provided: ProfileSettingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileSettingsModule", function() { return ProfileSettingsModule; });
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _demo_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demo-material-module */ "./src/app/demo-material-module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _profile_settings_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile-settings.routing */ "./src/app/profile-settings/profile-settings.routing.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/index.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tree */ "./node_modules/@angular/material/esm5/tree.es5.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/esm5/datepicker.es5.js");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-multiselect-dropdown */ "./node_modules/ng-multiselect-dropdown/fesm5/ng-multiselect-dropdown.js");
/* harmony import */ var _profile_settings_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./profile-settings.component */ "./src/app/profile-settings/profile-settings.component.ts");
/* harmony import */ var _profile_settings_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./profile-settings.service */ "./src/app/profile-settings/profile-settings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var ProfileSettingsModule = /** @class */ (function () {
    function ProfileSettingsModule() {
    }
    ProfileSettingsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_profile_settings_routing__WEBPACK_IMPORTED_MODULE_7__["ProfileSettingsRoutes"]),
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
                _profile_settings_service__WEBPACK_IMPORTED_MODULE_14__["ProfileSettingsService"]
            ],
            declarations: [
                _profile_settings_component__WEBPACK_IMPORTED_MODULE_13__["ProfileSettingsComponent"]
            ]
        })
    ], ProfileSettingsModule);
    return ProfileSettingsModule;
}());



/***/ }),

/***/ "./src/app/profile-settings/profile-settings.routing.ts":
/*!**************************************************************!*\
  !*** ./src/app/profile-settings/profile-settings.routing.ts ***!
  \**************************************************************/
/*! exports provided: ProfileSettingsRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileSettingsRoutes", function() { return ProfileSettingsRoutes; });
/* harmony import */ var _profile_settings_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile-settings.component */ "./src/app/profile-settings/profile-settings.component.ts");

var ProfileSettingsRoutes = [
    {
        path: '',
        component: _profile_settings_component__WEBPACK_IMPORTED_MODULE_0__["ProfileSettingsComponent"],
        data: {
            title: 'Profile Settings'
        }
    }
];


/***/ }),

/***/ "./src/app/profile-settings/profile-settings.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/profile-settings/profile-settings.service.ts ***!
  \**************************************************************/
/*! exports provided: ProfileSettingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileSettingsService", function() { return ProfileSettingsService; });
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





var ProfileSettingsService = /** @class */ (function () {
    function ProfileSettingsService(http, _cookieService) {
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
    ProfileSettingsService.prototype.getprofileSettings = function (user_id, token) {
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Users/getupdateprofiledata?user_id=" + user_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Get updateprofileSettings
    ProfileSettingsService.prototype.updateprofileSettings = function (displayName, email, PhoneNo, Address, Gender, Specialties, Education, practiceDesc, Website, publishableKey, secretKey, imageURL, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('displayName', displayName);
        formData.append('email', email);
        formData.append('PhoneNo', PhoneNo);
        formData.append('Address', Address);
        formData.append('Gender', Gender);
        formData.append('Specialties', Specialties);
        formData.append('Education', Education);
        formData.append('practiceDesc', practiceDesc);
        formData.append('Website', Website);
        formData.append('publishableKey', publishableKey);
        formData.append('secretKey', secretKey);
        formData.append('user_image', imageURL);
        if (this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')
            formData.append('id', this._cookieService.get("childid"));
        else
            formData.append('id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Users/updateprofileSettings/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Get updatePassword
    ProfileSettingsService.prototype.updatePassword = function (currentPassword, newPassword, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('oldpassword', currentPassword);
        formData.append('password', newPassword);
        formData.append('confirm_password', newPassword);
        if (this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')
            formData.append('id', this._cookieService.get("childid"));
        else
            formData.append('id', this._cookieService.get("userid"));
        formData.append('token', token);
        return this.http.post(this.apiUrl + "/Users/changePasswordApi/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ProfileSettingsService.prototype.logoUpload = function (formData) {
        if (this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')
            formData.append('id', this._cookieService.get("childid"));
        else
            formData.append('id', this._cookieService.get("userid"));
        formData.append('token', this._cookieService.get("token"));
        return this.http.post(this.apiUrl + "/Users/logoUpload/", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ProfileSettingsService.prototype.clearSession = function (clinic_id, user_id, token) {
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (user_id === void 0) { user_id = this._cookieService.get("userid"); }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get(this.apiUrl + "/Xeros/clearSession/?getxero=1?user_id=" + user_id + "&clinic_id=" + clinic_id + "&token=" + this._cookieService.get("token"), { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    ProfileSettingsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], ProfileSettingsService);
    return ProfileSettingsService;
}());



/***/ })

}]);
//# sourceMappingURL=profile-settings-profile-settings-module.js.map