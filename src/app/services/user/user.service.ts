import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../models/reponse-models';
import { User } from '../../models/data-models';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  public login(user: User): Observable<LoginResponse> {
    console.log('Calling endpoint: ' + environment.serverEndPoint + 'users/login' + JSON.stringify(user));
    return this.httpClient.post<LoginResponse>(
      environment.serverEndPoint + 'login', user,
    );
  }
}
