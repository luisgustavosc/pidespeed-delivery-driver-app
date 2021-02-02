import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
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

    public onLogOut() {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }
}
