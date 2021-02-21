import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "src/app/components/auth/services/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class ActiveSessionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    if (this.authService.getCurrentUser()) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
  }
}
