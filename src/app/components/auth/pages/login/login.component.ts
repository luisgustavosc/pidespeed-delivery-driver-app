import { Component, OnInit } from '@angular/core';
import { ActionService } from 'src/app/services/action/action.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    public isFormLoading: boolean = false;
    private loginForm: FormGroup = new FormGroup({
        user: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    constructor(private authService: AuthService, private router: Router, private actionService: ActionService) { }

    ngOnInit() { }

    onLogin = (): void => {
        this.isFormLoading = true;
        this.authService.login(this.loginForm.value).subscribe((res: any) => {
            if (res) {
                this.isFormLoading = false;
            }
            if (res.message == 'ok') {
                this.authService.setAccessToken(res.token);
                this.authService.setUser(res.user);
                this.authService.setBusiness(res.empresa);
                //TODO: encontrar forma de no refrecar y
                //solo redirigir en login
                //this.router.navigate(['/']);
                window.location.reload();
            } else {
                this.actionService.getSwalError('Usuario o contraseña incorrecto', null);
            }
        },
        err => {
            this.isFormLoading = false;
            this.actionService.getSwalError();
        });
    }
}
