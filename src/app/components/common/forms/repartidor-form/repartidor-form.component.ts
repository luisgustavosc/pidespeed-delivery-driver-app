import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/form/form.service';
import { RepartidoresService } from 'src/app/services/repartidores/repartidores.service';
import { ActionService } from 'src/app/services/action/action.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
    selector: 'app-repartidor-form',
    templateUrl: './repartidor-form.component.html',
})
export class RepartidorFormComponent implements OnInit {
    @Output() private formGroupEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Input() private isLoading = false;
    @Input() private configId: string;
    private formGroup: FormGroup;
    private imgResultAfterCompress: string;
    empresaId;
    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private repartidoresService: RepartidoresService,
        private actionService: ActionService,
        private authService: AuthService) { }

    ngOnInit() {
        this.empresaId = this.authService.getCurrentUser().empresaDelivery;
        this.formGroup = this.fb.group({
            name: ['', [
                Validators.required,
                Validators.pattern(this.formService.getSpanishLettersPattern())
            ]],
            last_name: ['', [
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
            phone: ['', [
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
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20)
            ]],
            address: ['', [
                Validators.maxLength(100),
            ]],
            image: ['', [Validators.required]],
            vehicle: [''],
            isActive: [''],
            empresa: [this.empresaId],
        });
        if(this.configId) this.listRepartidor();
    }

    listRepartidor() {
        this.repartidoresService.listRepartidor(this.configId).subscribe((repartidor: any) => {
            this.formGroup.patchValue({
                name: repartidor.nombre,
                last_name: repartidor.apellido,
                email: repartidor.email,
                cedula: repartidor.cedula,
                phone: repartidor.telefono,
                username: repartidor.username,
                address: repartidor.direccion,
            })
        }, err => {
            this.isLoading = false;
            this.actionService.getErrorSwal();
        })
    }

    getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress = image;
    }

    onSubmit(form: FormGroup, image: string): void {
        form.value.image = image;
        if(this.configId)
            this.repartidoresService.updateRepartidor(form).subscribe(data => {

            }, err => {
                this.isLoading = false;
                this.actionService.getErrorSwal();
            });
        if(!this.configId)
            this.repartidoresService.addRepartidor(form).subscribe(data => {
                console.log(data)
            }, err => {
                console.log(err)
                this.isLoading = false;
                this.actionService.getErrorSwal();
            });
        this.formGroupEmitter.emit(form);
    }
}
