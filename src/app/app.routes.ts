import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { isAuthenticated, isNotAuthenticated } from './services/route-permission.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: "Login", canActivate: [isNotAuthenticated] },
  { path: 'signup', component: SignupComponent, title: "Sign up", canActivate: [isNotAuthenticated] },
  { path: "product", component: ProductFormComponent, title: "Create Product", canActivate: [isAuthenticated] },
  { path: "product/:id", component: ProductDetailsComponent, title: "Product", canActivate: [isAuthenticated] },
  { path: "", component: HomeComponent, title: "Home", canActivate: [isAuthenticated]}
];
