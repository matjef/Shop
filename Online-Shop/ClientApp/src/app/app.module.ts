import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from "../environments/environment";
import {HomeComponent} from "./components/home/home.component";
import {CatalogComponent} from "./components/catalog/catalog.component";
import {ProductEditComponent} from "./components/product/product-edit/product-edit.component";
import {ProductDetailComponent} from "./components/product/product-detail/product-detail.component";
import {ProductCreateComponent} from "./components/product/product-create/product-create.component";
import {LoginComponent} from "./components/account/login/login.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {ProfileComponent} from "./components/account/profile/profile.component";
import {ProductService} from "./services/product.service";
import {NavMenuComponent} from "./components/nav-menu/nav-menu.component";
import {ProductFormComponent} from "./components/product/product-form/product-form.component";
import {ProductCardComponent} from "./components/product/product-card/product-card.component";
import {UserService} from "./services/user.service";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {SignupComponent} from "./components/account/signup/signup.component";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CatalogComponent,
    ProductFormComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    LoginComponent,
    SignupComponent,
    FavoritesComponent,
    ProfileComponent,
    ProductCardComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhileListedDomains
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'catalog', component: CatalogComponent},
      { path: 'product/edit/:id', component: ProductEditComponent, canActivate: [AdminGuard]},
      { path: 'product/detail/:id', component: ProductDetailComponent},
      { path: 'product/create', component: ProductCreateComponent, canActivate: [AdminGuard] },
      { path: 'login', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
      { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
      { path: 'profile', component: ProfileComponent}
    ])
  ],
  providers: [ProductService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
