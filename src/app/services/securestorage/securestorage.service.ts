import { Injectable } from '@angular/core';

const CryptoJS = require("crypto-js");
const SECRET_KEY = 'my secret key';

@Injectable({
  providedIn: 'root'
})
export class SecurestorageService {
  public encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  };

  public decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
  }
}
