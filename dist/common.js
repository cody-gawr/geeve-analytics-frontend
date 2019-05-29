(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/rxjs-compat/_esm5/Subject.js":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/Subject.js ***!
  \***************************************************/
/*! exports provided: Subject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]; });


//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "./src/app/dentist/dentist.service.ts":
/*!********************************************!*\
  !*** ./src/app/dentist/dentist.service.ts ***!
  \********************************************/
/*! exports provided: DentistService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DentistService", function() { return DentistService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-cookie/core */ "./node_modules/angular2-cookie/core.js");
/* harmony import */ var angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DentistService = /** @class */ (function () {
    function DentistService(http, _cookieService) {
        this.http = http;
        this._cookieService = _cookieService;
        //append headers
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    }
    // Get Dentist
    DentistService.prototype.getDentists = function (user_id, clinic_id, token) {
        if (user_id === void 0) { user_id = '23'; }
        if (clinic_id === void 0) { clinic_id = '1'; }
        if (token === void 0) { token = this._cookieService.get("token"); }
        return this.http.get("http://localhost/jeeveanalytics/server/AccountingInvoicesAndReceipts/dentists/23/1", { headers: this.headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Delete Dentist
    DentistService.prototype.deleteDentists = function (dentist_id, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('id', dentist_id);
        formData.append('token', token);
        return this.http.post("http://localhost/jeeveanalytics/server/Dentists/delete", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    // Update Dentist
    DentistService.prototype.updateDentists = function (dentist_id, value, token) {
        if (token === void 0) { token = this._cookieService.get("token"); }
        var formData = new FormData();
        formData.append('provider_id', dentist_id);
        formData.append('name', value);
        formData.append('user_id', '23');
        formData.append('clinic_id', '1');
        formData.append('token', token);
        return this.http.post("http://localhost/jeeveanalytics/server/Dentists/update", formData)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (response) {
            return response;
        }));
    };
    DentistService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], angular2_cookie_core__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], DentistService);
    return DentistService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map