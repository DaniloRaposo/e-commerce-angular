import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { isAuthenticated, isNotAuthenticated } from './services/route-permission.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: "Login", canActivate: [isNotAuthenticated] },
  { path: 'signup', component: SignupComponent, title: "Sign up", canActivate: [isNotAuthenticated] },
  { path: "", component: HomeComponent, title: "Home", canActivate: [isAuthenticated]}
];
