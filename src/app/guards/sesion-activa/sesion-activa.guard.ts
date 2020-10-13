import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { ProfileService } from "../../services/profile/profile.service";

@Injectable({
  providedIn: "root"
})
export class SesionActivaGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    public profileService: ProfileService
  ) {}

  canActivate() {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(["/"]);
      return false;
    } else {
      return true;
    }
  }
}
