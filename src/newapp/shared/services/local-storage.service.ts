import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly secretKey = 'jeeve-analytics-key';
  constructor() {}

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string): string {
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.secretKey).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.secretKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
