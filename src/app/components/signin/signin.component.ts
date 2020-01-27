import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginResponse } from '../../models/reponse-models';
import { UserService } from '../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { User } from '../../models/data-models';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signIn: FormGroup;
  public emailValidationPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  public emailControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailValidationPattern)]);
  public passwordControl = new FormControl();
  public loginResponse: LoginResponse;

  constructor(private userService: UserService, private messageService: MessageService, private cookieService: CookieService) { }

  ngOnInit() {
    this.signIn = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  isFormInvalid() {
    if (this.signIn.untouched) {
      return true;
    }
    return this.signIn.invalid;
  }

  login() {
    this.signIn.setErrors({ incorrect: true });

    let user = new User();
    user.user_name = this.emailControl.value;
    user.password = this.passwordControl.value;

    this.userService.login(user).subscribe(
      data => {
        this.loginResponse = data;
        console.log(data);
        if (this.loginResponse.user) {
          this.cookieService.set('user', JSON.stringify(this.loginResponse.user));
          window.location.href = '/home';
        }
      },
      errResponse => {
        switch (errResponse.status) {
          case 401:
            this.messageService.add({
              key: 'successKey',
              severity: 'success',
              summary: 'Email or password incorrect',
              detail: ''
            });
            break;
          case 404:
            console.log(JSON.stringify(errResponse));
            this.messageService.add({
              key: 'successKey',
              severity: 'success',
              summary: 'User not found!',
              detail: ''
            });
            break;
          default:
            if (errResponse.error != null) {
              console.log(JSON.stringify(errResponse));
            }
        }
      }
    );
  }

}
