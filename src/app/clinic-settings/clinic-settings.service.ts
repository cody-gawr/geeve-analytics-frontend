
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from "angular2-cookie/core";
import { environment } from "../../environments/environment";


@Injectable()
export class ClinicSettingsService {


    public token: string;
    private headers: HttpHeaders;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,private _cookieService: CookieService) {
        //append headers
        this.headers = new HttpHeaders();
        this.headers.append("Content-Type", 'application/json');
        this.headers.append("Access-Control-Allow-Origin", "*");
        this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
   }


   // Get ClinicSettings
    getClinicSettings( clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"/Practices/getPractices?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }

       // Get ClinicSettings
    getClinicSettingsForSubscription( clinic_id='1', user_id = this._cookieService.get("userid")): Observable<any> {
        return this.http.get(this.apiUrl +"/Practices/getPracticesForSubscription?user_id="+user_id+"&clinic_id="+clinic_id, { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
    
       // Get ClinicSettings
  getClinicLandingPageSettings(clinic_id='1', user_id = this._cookieService.get("userid"),token = this._cookieService.get("token")): Observable<any> {
        return this.http.get(this.apiUrl +"Clinics/getClinicInfo?user_id="+user_id+"&clinic_id="+clinic_id+"&token="+this._cookieService.get("token"), { headers: this.headers })
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }


       // Get ClinicSettings
    updateClinicSettings(clinic_id, name, address, contact_name,phone_no,publishable_key,secret_key, imageURL, token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();

    formData.append('clinicName', name);
    formData.append('address', address);
    formData.append('contactName', contact_name);
    formData.append('phoneNo', phone_no);
    formData.append('publishable_key', publishable_key);
    formData.append('secret_key', secret_key);
    // formData.append('practice_size', practice_size);
    formData.append('logo', imageURL);   

    formData.append('id', clinic_id);

    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token);

    return this.http.post(this.apiUrl +"/Practices/update/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
    }
   updateLandingPageSettings(clinic_id,headerInfo,socialInfo,clinicTagLine,token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('header_info', headerInfo);
    formData.append('social_info', socialInfo);
    formData.append('id', clinic_id);
    formData.append('clinicTagLine', clinicTagLine);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token); 

    return this.http.post(this.apiUrl +"/Practices/update/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        ); 
    }

updateSliderImagesSettings(clinic_id,sliderInfo,token = this._cookieService.get("token")): Observable<any> {
    
    const formData = new FormData();
    formData.append('slider_info', sliderInfo);
    formData.append('id', clinic_id);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token);
    console.log(formData);
    return this.http.post(this.apiUrl +"/Practices/update/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
}

removeSliderImage(clinic_id,keyUrl,index,token = this._cookieService.get("token")): Observable<any> {
    const formData = new FormData();
    formData.append('keyUrl', keyUrl);
    formData.append('id', clinic_id);
    formData.append('index', index);
    formData.append('user_id', this._cookieService.get("userid"));
    formData.append('token', token);
    console.log(formData);
    return this.http.post(this.apiUrl +"/Practices/removeSliderImage/", formData)
        .pipe(map((response: Response) => {
                        return response;
                    })
        );
}




    logoUpload( formData): Observable<any> {
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        formData.append('id', this._cookieService.get("childid"));
        else
        formData.append('id', this._cookieService.get("userid"));

        formData.append('token', this._cookieService.get("token"));

    return this.http.post(this.apiUrl +"/Practices/logoUpload/", formData)
    .pipe(map((response: Response) => {
                    return response;
                })
    );
    }

    landingImageUpload(formData): Observable<any> {
        if(this._cookieService.get("user_type") != '1' && this._cookieService.get("user_type") != '2')                 
        formData.append('id', this._cookieService.get("childid"));
        else
        formData.append('id', this._cookieService.get("userid"));

        formData.append('token', this._cookieService.get("token"));

        return this.http.post(this.apiUrl +"/Practices/landingImageUpload/", formData)
         .pipe(map((response: Response) => {
                    return response;
                })
           );
    }
       
}

