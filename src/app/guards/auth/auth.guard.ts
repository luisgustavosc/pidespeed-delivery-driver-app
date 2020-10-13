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
export class AuthGuard implements CanActivate {
  public token: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    public profileService: ProfileService
  ) {}

  canActivate() {
    if (this.authService.getCurrentUser() && !this.authService.checktoken(this.authService.getAccessToken()) && !this.authService.checktoken(this.authService.getAdminToken())) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      this.authService.logout();
      return false;
    }
  }
}
