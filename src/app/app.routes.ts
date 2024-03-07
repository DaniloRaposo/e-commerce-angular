import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, title: "Login" },
  { path: 'signup', component: SignupComponent, title: "Sign up" },
];
