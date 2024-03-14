import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private router: Router) {}

  logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    this.router.navigate(["/login"]);
  }

  loginHandler(token: string, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expiryDate", moment().add(60, "minutes").format());

    setTimeout(() => {this.logoutHandler();}, 60 * 60 * 1000);// set timeout to logout user after 60 minutes
  }

  sessionHandler() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (token && !expiryDate) {
      this.logoutHandler();
      return;
    }

    if (!token) {
      return;
    }

    if (moment().diff(expiryDate) > 0) {
      this.logoutHandler();
    }
  }
}
