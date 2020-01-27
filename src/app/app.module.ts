import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SigninComponent } from './components/signin/signin.component';
import { MessageService } from 'primeng/api';
import { UserService } from './services/user/user.service';
import { BaseService } from './services/base/base.service';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { IsLoggedInGuard } from './gaurds/is-logged-in-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ProductService } from './services/product/product.service';
import { CartComponent } from './components/cart/cart.component';
import { PaymentService } from './services/payment/payment.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CalendarModule,
    ToastModule,
    HttpClientModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    SigninComponent,
    CartComponent
  ],
  providers: [
    MessageService,
    UserService,
    BaseService,
    IsLoggedInGuard,
    CookieService,
    ProductService,
    PaymentService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }