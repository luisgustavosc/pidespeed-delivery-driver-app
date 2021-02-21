import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { ActionService } from 'src/app/services/action/action.service';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { CompanyUsersService } from 'src/app/services/company-users/company-users.service';

@Component({
    selector: 'app-admin-form',
    templateUrl: './admin-form.component.html',
})
export class AdminFormComponent implements OnInit {
    @Output() private formGroupEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    @Input() private isFormLoading: boolean = false;
    @Input() private configId: string;
    private formGroup: FormGroup;
    private imgResultAfterCompress: string;
    private userImageUrl: string;
    private companyId: string;
    private isDataLoaded: boolean = false;
    private isPasswordVisible: boolean;

    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private companyUsersService: CompanyUsersService,
        private actionService: ActionService,
        private authService: AuthService) { }

    ngOnInit() {
        console.log(this.configId);


        this.companyId = this.authService.getCurrentUser().empresaDelivery;
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
            type: [CompanyUsersService.TYPE_COMPANY],
            empresa: [this.companyId],
            _id: [this.configId || null],
        });
        if (this.configId) this.getUser();
        this.setPasswordValidators();
    }

    private getUser() {
        this.companyUsersService.getById(this.configId).subscribe((user: any) => {
            const {
                nombre,
                apellido,
                img,
                email,
                cedula,
                telefono,
                username,
                direccion
            } = user;

            this.userImageUrl = img?.url;
            this.formGroup.patchValue({
                nombre: nombre,
                apellido: apellido,
                email: email,
                cedula: cedula,
                telefono: telefono,
                username: username,
                direccion: direccion,
            });
            this.isDataLoaded = true;
        }, err => {
            this.isDataLoaded = true;
            this.isFormLoading = false;
            this.actionService.back();
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
        form.value.image = this.formService.processImage(image, this.configId);
        this.formGroupEmitter.emit(form);
    }
}
