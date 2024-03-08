import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutePermissionService {

  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    if (localStorage?.getItem("token")?.length) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false
  }

  isNotAuthenticated(): boolean {
    if (!localStorage?.getItem("token")?.length) {
      return true;
    }

    this.router.navigate(["/"]);
    return false;
  }
}

export function isAuthenticated() {
  return inject(RoutePermissionService).isAuthenticated();
}

export function isNotAuthenticated() {
  return inject(RoutePermissionService).isNotAuthenticated();
}
