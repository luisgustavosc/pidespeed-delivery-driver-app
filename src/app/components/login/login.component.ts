import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    hide = false;
    subscription: Subscription;
    emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    lazyloader: boolean = false;
    loginForm = new FormGroup({
        user: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
    });
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        if (this.authService.getCurrentUser() && !this.authService.checktoken(this.authService.getAccessToken()) && !this.authService.checktoken(this.authService.getAdminToken())) {
            this.router.navigate(["/"]);
        } 
    }

    refresh(): void {
        window.location.reload();
    }

    onLogin(): void {
        this.lazyloader = true;
        this.authService.login(this.loginForm.value).subscribe((data: any) => {
            if (data.message == "ok") {
                this.authService.saveToken(data.token, data.tokenAdmin);
                this.authService.setUser(data.user);
                this.lazyloader = false;
                this.refresh();
            } else {
                this.lazyloader = false;
                Swal.fire({
                    title: "Usuario o contraseña incorrecto",
                    confirmButtonText: "Aceptar"
                });
            }
        },
        err => {
            this.lazyloader = false;
            Swal.fire({
                title: "Ha ocurrido un error",
                confirmButtonText: "Aceptar"
            });
        });
    }
}
