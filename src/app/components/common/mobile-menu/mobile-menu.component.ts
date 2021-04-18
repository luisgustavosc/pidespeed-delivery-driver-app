import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { CompanyUsersService } from '../../users/services/company-users/company-users.service';

@Component({
    selector: 'app-mobile-menu',
    templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() { }

    getUser() {
        return this.authService.getCurrentUser();
    }

    isAdmin() {
        const user = this.getUser();
        return user.role === CompanyUsersService.ROLE_ADMIN;
    }

    isWorker() {
        const user = this.getUser();
        return user.role === CompanyUsersService.ROLE_WORKER;
    }

    public onLogOut() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
