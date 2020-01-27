import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/data-models';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class IsLoggedInGuard {
    user: User;
    constructor(
        private router: Router, private cookieService: CookieService) {
    }

    resolve() {
        if (this.cookieService.check(environment.cookieToken) && this.cookieService.check(environment.cookieUser)) {
            this.user = JSON.parse(
                this.cookieService.get(environment.cookieUser));
            this.router.navigate(['home']);
        } else {
            this.router.navigate(['signin']);
        }
    }

}
