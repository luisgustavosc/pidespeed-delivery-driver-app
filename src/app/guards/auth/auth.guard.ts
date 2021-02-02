import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate() {
        this.authService.isTokenValid().subscribe(() => { }, err => {
          console.log(err.error)
          if (err.error.message && (err.error.message === 'Invalid session' || err.error.message === 'Expired session')) {
            this.router.navigate(['/login']);
            this.authService.logout();
          }
        })
        if (this.authService.getAccessToken()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          this.authService.logout();
          return false;
        }
      }
}
