import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { AffiliatedCompanyService } from 'src/app/components/affiliated-company/service/affiliated-company.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { ImageModel } from 'src/app/model/imageModel';
import { Router } from '@angular/router';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnInit {
    @Input() public configId: string;
    @Input() public isFormLoading = false;
    // To export values ​​to a parent component
    @Output() public formGroupEmitter: EventEmitter<FormGroup> = new EventEmitter();

    public formGroup: FormGroup;
    public companyId: string;
    public isDataLoaded = false;
    public companyImage: ImageModel;
    public imgResultAfterCompress: string;
    public goBackUrl = '/settings/company'


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private affiliatedCompanyService: AffiliatedCompanyService,
        private utils: UtilsService,
        private formService: FormService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.companyId = this.authService.getCurrentUser().empresaDelivery;

        this.formGroup = this.fb.group({
            name: ['', [
                Validators.required,
            ]],
            description: ['', [
                Validators.required,
                Validators.maxLength(60),
            ]],
            coordinates: ['', [
                Validators.required,
            ]],
            addresss: ['', [
                Validators.required,
            ]],
            image: ['', [Validators.required]],
            publish: [false],
            deliveryCompany: [this.companyId],
            _id: [this.configId || null],
        });
        if (this.configId)  {
            this.getCompany();
            this.removeImageValidators();
        }
    }

    private getCompany() {
        this.affiliatedCompanyService.getById(this.configId).subscribe((
            {
                name,
                description,
                coordinates,
                addresss,
                publish,
                img
            }: any
        ) => {
            this.companyImage = img;
            this.formGroup.patchValue({
                name,
                description,
                coordinates,
                addresss,
                publish,
            });
            this.isDataLoaded = true;
        }, err => {
            this.isDataLoaded = true;
            this.isFormLoading = false;
            this.utils.redirectBack();
        })
    }

    private removeImageValidators() {
        const imageField = this.formGroup.get('image');
        imageField.setValidators(null);
        imageField.updateValueAndValidity();
    }

    getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress = image;
    }

    onSubmit(form: FormGroup, image: string): void {
        form.value.image = this.formService.processImage(image, this.companyImage?._id);
        this.isFormLoading = true;

        if (this.configId) {
            this.affiliatedCompanyService.update(form.value).subscribe(data => {
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
            this.affiliatedCompanyService.create(form.value).subscribe(data => {
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
