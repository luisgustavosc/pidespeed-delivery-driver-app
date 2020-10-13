import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import sha256 from "crypto-js/sha256";
import * as moment from 'moment';
function passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) return;
    const pwd = c.parent.get("password");
    const cpwd = c.parent.get("confirmPassword");
    if (!pwd || !cpwd) return;
    if (pwd.value !== cpwd.value) {
        return { invalid: true };
    }
}

@Component({
  selector: "app-forgotten-password",
  templateUrl: "./forgotten-password.component.html",
  styleUrls: ["./forgotten-password.component.css"]
})
export class ForgottenPasswordComponent implements OnInit {
    lazyloader: boolean = false;
    email:any;
    empresa:any;
    estadoRecuperacion: number = 1;
    emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    forgottenPasswordForm = new FormGroup({
        email: new FormControl("", [
        Validators.required,
        Validators.pattern(this.emailPattern)
        ])
    });
    codeForm = new FormGroup({
        code: new FormControl("", [Validators.required])
    });
    passwordsForm: FormGroup;
    get cpwd() {
        return this.passwordsForm.get("confirmPassword");
    }
    constructor(
        private router: Router,
        private authService: AuthService,
        private profileService: ProfileService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.passwordsForm = this.fb.group({
            password: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
            confirmPassword: ["", [Validators.required, passwordConfirming]]
        });
    }

    confirmarEmail() {
        this.lazyloader = true;
        this.profileService.buscarEmpresaEmail(this.forgottenPasswordForm.value.email).subscribe(empresa => {
            this.empresa = empresa;
            if (!this.empresa.message) {
                this.email = this.forgottenPasswordForm.value.email;
                let fecha_siguiente = moment().add(10, 'minutes').format();
                this.profileService.removeCodigo();
                this.profileService.setCodigo(fecha_siguiente);
                let codigo = sha256(fecha_siguiente).toString().substr(0,12);
                let email = {
                    email: this.forgottenPasswordForm.value.email,
                    codigo: codigo,
                    nombre: this.empresa.nombre
                };
                this.profileService.EnviarEmailRecuperar(email).subscribe((email: any) => {
                    if (email.message == "ok") {
                        this.lazyloader = false;
                        this.estadoRecuperacion = 2;
                    } else {
                        this.lazyloader = false;
                        Swal.fire({
                            title: "Ha ocurrido un error",
                            text: "Por favor intente mas tarde",
                            confirmButtonText: "Aceptar"
                        });
                    }
                },
                err => {
                    this.lazyloader = false;
                    Swal.fire({
                        title: "Ha ocurrido un error",
                        text: "Por favor intente mas tarde",
                        confirmButtonText: "Aceptar"
                    });
                });
            } else {
                this.lazyloader = false;
                Swal.fire({
                    title: "Ha ocurrido un error",
                    text: "El correo no esta registrado en la plataforma",
                    confirmButtonText: "Aceptar"
                });
            }
        }, err => {
            this.lazyloader = false;
            Swal.fire({
                title: "Ha ocurrido un error",
                text: "Por favor intente mas tarde",
                confirmButtonText: "Aceptar"
            });
        });
    }

    verificarCodigo(){
        this.lazyloader = true;
        let fechaAct = moment().format();
        let fechaSig = this.profileService.getCodigo();
        let codigo = sha256(fechaSig).toString().substr(0,12);
        if (fechaSig >= fechaAct) {
        if (this.codeForm.value.code == codigo) {
            this.estadoRecuperacion = 3;
            this.lazyloader = false;
        } else {
            this.lazyloader = false;
            Swal.fire({
                title: "El codigo es incorrecto",
                text: "Por favor intente nuevamente",
                confirmButtonText: "Aceptar"
            });
        }
        } else {
            this.lazyloader = false;
            this.profileService.removeCodigo();
            Swal.fire({
                title: "El codigo ha caducado",
                text: "Envie un nuevo codigo para confirmar",
                confirmButtonText: "Aceptar"
            });
        }
    }

    cambiarPass(){
        this.lazyloader = true;
        let password = {
            password: this.passwordsForm.value.password
        }
        this.profileService.recuperarPassword(this.email, password).subscribe(password => {
            this.lazyloader = false;
            Swal.fire({
                title: "Contraseña actualizada",
                confirmButtonText: "Aceptar"
            }).then(result => {
                this.lazyloader = false;
                this.router.navigateByUrl("/login");
            });
        },
        err => {
            this.lazyloader = false;
            Swal.fire({
                title: "Ha ocurrido un error",
                text: "Por favor intente mas tarde",
                confirmButtonText: "Aceptar"
            });
        });
    }
}
