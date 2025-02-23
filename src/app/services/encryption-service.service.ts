import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionServiceService {

  private secretKey = '';

  constructor(){}

  encrypt(value: string): string{
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(encryptedValue: string): string{

    const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);

  }

}
