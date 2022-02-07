import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { CompanyUsersService } from 'src/app/components/users/services/company-users/company-users.service';

@Injectable({
    providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
    user: any;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate() {
        this.user = this.authService.getCurrentUser();

        if (this.user.role === CompanyUsersService.ROLE_ADMIN) {
            return true;
        }

        this.router.navigate(['/']);
        return false
    }
}
