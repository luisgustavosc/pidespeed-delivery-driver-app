import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/form/form.service';
import { RepartidoresService } from 'src/app/services/repartidores/repartidores.service';
import { ActionService } from 'src/app/services/action/action.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSelectOptions } from 'src/app/model/matSelectOptions';
@Component({
    selector: 'app-repartidor-form',
    templateUrl: './repartidor-form.component.html',
})
export class RepartidorFormComponent implements OnInit {
    @Output() private formGroupEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Input() private isFormLoading = false;
    @Input() private configId: string;
    private formGroup: FormGroup;
    private imgResultAfterCompress: string;
    private repartidorImageUrl: string;
    private empresaId: string;
    private isDataLoaded: boolean = false;
    private isPasswordVisible: boolean;
    private vehicleTypes: Array<MatSelectOptions> = [
        {
            'title' : 'Moto',
            'value': 'motorcycle'
        },
        {
            'title' : 'Carro',
            'value': 'car'
        },
        {
            'title' : 'Bicicleta',
            'value': 'bike'
        },
    ];

    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private repartidoresService: RepartidoresService,
        private actionService: ActionService,
        private authService: AuthService) { }

    ngOnInit() {
        this.empresaId = this.authService.getCurrentUser().empresaDelivery;
        this.isPasswordVisible = this.configId ? false : true;
        this.formGroup = this.fb.group({
            nombre: ['', [
                Validators.required,
                Validators.pattern(this.formService.getSpanishLettersPattern())
            ]],
            apellido: ['', [
                Validators.required,
                Validators.pattern(this.formService.getSpanishLettersPattern())
            ]],
            email: ['', [
                Validators.required,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(this.formService.getEmailPattern())
                ]),
            ]],
            cedula: ['', [
                Validators.required,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(this.formService.getNumericPattern()),
                    Validators.minLength(7),
                    Validators.maxLength(8),
                ]),
            ]],
            telefono: ['', [
                Validators.required,
                Validators.maxLength(11),
                Validators.minLength(10),
                Validators.pattern(this.formService.getNumericPattern())
            ]],
            username: ['', [
                Validators.required,
                Validators.pattern(this.formService.getUsernamePattern()),
                Validators.minLength(4),
                Validators.maxLength(20)
            ]],
            password: [''],
            direccion: ['', [
                Validators.maxLength(100),
            ]],
            image: [''],
            type: ['delivery'],
            vehicle_type: [''],
            vehicle_image: [''],
            empresa: [this.empresaId],
        });
        if(this.configId) this.listRepartidor();
        this.setPasswordValidators();
    }

    private listRepartidor() {
        this.repartidoresService.listRepartidor(this.configId).subscribe((repartidor: any) => {
            this.repartidorImageUrl = repartidor.img.url;
            this.formGroup.patchValue({
                nombre: repartidor.nombre,
                apellido: repartidor.apellido,
                email: repartidor.email,
                cedula: repartidor.cedula,
                telefono: repartidor.telefono,
                username: repartidor.username,
                direccion: repartidor.direccion,
            });
            this.isDataLoaded = true;
        }, err => {
            this.isDataLoaded = true;
            this.isFormLoading = false;
            this.actionService.getSwalError();
        })
    }

    private setPasswordValidators() {
        const passwordField = this.formGroup.get('password');
        if (this.configId && !this.isPasswordVisible) {
            passwordField.setValidators(null);
        } else {
            passwordField.setValidators([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20)
            ]);
        }
        passwordField.updateValueAndValidity();
    }

    private getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress = image;
    }

    private showPassword() {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.setPasswordValidators();
    }

    private onSubmit(form: FormGroup, image: string): void {
        form.value.image = image;
        this.formGroupEmitter.emit(form);
    }
}
