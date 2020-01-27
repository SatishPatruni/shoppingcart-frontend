import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const authToken = localStorage.getItem(environment.cookieToken);

@Injectable({
  providedIn: 'root'
})

export class BaseService {
  public authHeaders: HttpHeaders;
  
  constructor() {
    this.authHeaders = new HttpHeaders();
    this.authHeaders = this.authHeaders.append(
      'Content-Type',
      'application/json'
    );
    this.authHeaders = this.authHeaders.append('Authorization', authToken);
  }
}
