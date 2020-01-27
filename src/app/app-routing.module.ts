import { SigninComponent } from "./components/signin/signin.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { Routes, RouterModule } from "@angular/router";
import { IsLoggedInGuard } from "./gaurds/is-logged-in-guard.service";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./gaurds/auth-guard.service";
import { CartComponent } from "./components/cart/cart.component";

const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'signin', component: SigninComponent },
    {
        path: 'home',
        component: ProductListComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
