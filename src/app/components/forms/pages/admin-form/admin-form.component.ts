import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { CompanyUsersService } from 'src/app/components/users/services/company-users/company-users.service';
import { ImageModel } from 'src/app/model/imageModel';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/components/users/services/roles/roles.service';

@Component({
    selector: 'app-admin-form',
    templateUrl: './admin-form.component.html',
})
export class AdminFormComponent implements OnInit {
    @Input() public isFormLoading = false;
    @Input() public configId: string;
    public formGroup: FormGroup;
    public imgResultAfterCompress: string;
    public userImageUrl: ImageModel;
    public companyId: string;
    public isDataLoaded = false;
    public isPasswordVisible: boolean;
    public goBackUrl = '/settings/admins';

    constructor(
        private fb: FormBuilder,
        private formService: FormService,
        private companyUsersService: CompanyUsersService,
        private utils: UtilsService,
        private authService: AuthService,
        private router: Router,
        private rolesService: RolesService,
    ) { }

    ngOnInit() {
        this.companyId = this.authService.getCurrentUser().empresaDelivery;
        this.isPasswordVisible = this.configId ? false : true;
        this.initForm();
        this.setPasswordValidators();
    }

    initForm() {
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
            ],
                this.formService.validateExistingData.bind(this, {
                    fieldName: 'email',
                    service: this.companyUsersService,
                    configId: this.configId,
                })
            ],
            cedula: ['', [
                Validators.required,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(this.formService.getNumericPattern()),
                    Validators.minLength(7),
                    Validators.maxLength(8),
                ]),
            ],
                this.formService.validateExistingData.bind(this, {
                    fieldName: 'cedula',
                    service: this.companyUsersService,
                    configId: this.configId,
                })
            ],
            telefono: ['', [
                Validators.required,
                Validators.maxLength(11),
                Validators.minLength(10),
                Validators.pattern(this.formService.getNumericPattern())
            ],
                this.formService.validateExistingData.bind(this, {
                    fieldName: 'telefono',
                    service: this.companyUsersService,
                    configId: this.configId,
                })
            ],
            username: ['', [
                Validators.required,
                Validators.pattern(this.formService.getUsernamePattern()),
                Validators.minLength(4),
                Validators.maxLength(20)
            ],
                this.formService.validateExistingData.bind(this, {
                    fieldName: 'username',
                    service: this.companyUsersService,
                    configId: this.configId,
                })
            ],
            password: [''],
            direccion: ['', [
                Validators.maxLength(100),
            ]],
            image: [''],
            type: [CompanyUsersService.COMPANY_TYPE_DELIVER],
            role: [''],
            empresa: [this.companyId],
            _id: [this.configId || null],
        });

        if ( this.configId ) {
            this.getUser();
        }

        this.setRole();
    }

    getUser() {
        this.companyUsersService.getById(this.configId).subscribe((user: any) => {
            this.isDataLoaded = true;
            this.setFormData(user);
        }, err => {
            this.isDataLoaded = true;
            this.isFormLoading = false;
            this.utils.redirectBack();
        })
    }

    setFormData(user) {
        this.userImageUrl = user.img;
        this.formGroup.patchValue({
            ...user,
        });
    }

    setRole() {
        this.rolesService.getAll().subscribe((roles: any) => {
            this.formGroup.patchValue({
                role: roles.find(item => item.name === CompanyUsersService.ROLE_ADMIN),
            });
        }, err => {
            this.isDataLoaded = true;
            this.isFormLoading = false;
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

    getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress = image;
    }

    showPassword() {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.setPasswordValidators();
    }

    onSubmit(form: FormGroup, image: string): void {
        form.value.image = this.formService.processImage(image, this.userImageUrl?._id);
        this.isFormLoading = true;

        if (this.configId) {
            this.companyUsersService.update(form.value).subscribe(data => {
                this.utils.openSnackBar('Se ha actualizado exitosamente');
                setTimeout(() => {
                    this.router.navigateByUrl(this.goBackUrl);
                }, 2100);
            }, err => {
                this.isFormLoading = false;
                this.utils.getSwalError();
            });
        }

        if (!this.configId) {
            this.companyUsersService.create(form.value).subscribe(data => {
                this.utils.openSnackBar('Se ha creado exitosamente');
                setTimeout(() => {
                    this.router.navigateByUrl(this.goBackUrl);
                }, 2100);
            }, err => {
                this.isFormLoading = false;
                this.utils.getSwalError();
            });
        }
    }
}
