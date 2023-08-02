import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private key = 'jeeve-analytics-key';

  constructor() {}

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public saveObject(key: string, value: any) {
    this.saveData(key, JSON.stringify(value));
  }

  public getObject<T>(key: string): T {
    return <T>JSON.parse(this.getData(key));
  }

  public getClinicData(clinicId: string){
    const clinics = this.getObject<any[]>('clinics') || [];
    return clinics.find((c) => c.id == parseInt(clinicId));
  }

  public isEachClinicExact(clinicId: string | string[]): boolean {
    let clinics = this.getObject<any[]>('clinics') || [];
    if (typeof clinicId == 'string') {
      clinics = clinics.filter((c) => c.id == parseInt(clinicId));
    } else if (Array.isArray(clinicId)) {
      clinics = clinics.filter((c) =>
        (<string[]>clinicId).map((cId) => parseInt(cId)).includes(c.id)
      );
    }

    return clinics.every((c) => ['exact', 'core'].includes(c.pms));
  }

  public isEachClinicPmsExactOrCore(clinicId: string | string[]): boolean {
    let clinics = this.getObject<any[]>('clinics') || [];
    if (typeof clinicId == 'string') {
      clinics = clinics.filter((c) => c.id == parseInt(clinicId));
    } else if (Array.isArray(clinicId)) {
      clinics = clinics.filter((c) =>
        (<string[]>clinicId).map((cId) => parseInt(cId)).includes(c.id)
      );
    }
    return clinics.every((c) => ['exact', 'core'].includes(c.pms));
  }

  public isEachClinicPmsCore(clinicId: string | string[]): boolean {
    let clinics = this.getObject<any[]>('clinics') || [];
    if (typeof clinicId == 'string') {
      clinics = clinics.filter((c) => c.id == parseInt(clinicId));
    } else if (Array.isArray(clinicId)) {
      clinics = clinics.filter((c) =>
        (<string[]>clinicId).map((cId) => parseInt(cId)).includes(c.id)
      );
    }
    return clinics.every((c) => ['core'].includes(c.pms));
  }

  public isEachClinicPmsD4w(clinicId: string | string[]): boolean {
    let clinics = this.getObject<any[]>('clinics') || [];
    if (typeof clinicId == 'string') {
      clinics = clinics.filter((c) => c.id == parseInt(clinicId));
    } else if (Array.isArray(clinicId)) {
      clinics = clinics.filter((c) =>
        (<string[]>clinicId).map((cId) => parseInt(cId)).includes(c.id)
      );
    }
    return clinics.every((c) => c.pms == 'd4w');
  }

  public isClinicPmsType(clinicId: number | string, pms: 'd4w' | 'exact' | 'core'){
    let clinics = this.getObject<any[]>('clinics') || [];
    const clinic = clinics.find((c) => c.id == parseInt(<string>clinicId));
    return clinic.pms && clinic.pms == pms;
  } 
}
