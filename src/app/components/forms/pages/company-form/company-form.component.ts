import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { AffiliatedCompanyService } from 'src/app/services/affiliated-company/affiliated-company.service';
import { ActionService } from 'src/app/services/action/action.service';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { imageCropperSettings } from 'src/app/model/imageCropperSettings';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnInit {
    @Input() private configId: string;
    @Input() private isFormLoading: boolean = false;
    // To export values ​​to a parent component
    @Output() private formGroupEmitter: EventEmitter<FormGroup> = new EventEmitter();

    private formGroup: FormGroup;
    private companyId: string;
    private isDataLoaded: boolean = false;
    private companyImageUrl: string;
    private imgResultAfterCompress: string;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private affiliatedCompanyService: AffiliatedCompanyService,
        private actionService: ActionService,
        private formService: FormService,
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
        this.affiliatedCompanyService.getById(this.configId).subscribe((company: any) => {
            this.companyImageUrl = company.img?.url;
            this.formGroup.patchValue({
                name: company.name,
                description: company.description,
                coordinates: company.coordinates,
                addresss: company.addresss,
                publish: company.publish,
            });
            this.isDataLoaded = true;
        }, err => {
            this.isDataLoaded = true;
            this.isFormLoading = false;
            this.actionService.getSwalError();
        })
    }

    private removeImageValidators() {
        const imageField = this.formGroup.get('image');
        imageField.setValidators(null);
        imageField.updateValueAndValidity();
    }

    private getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress = image;
    }

    onSubmit(form: FormGroup, image: string): void {
        form.value.image = this.formService.processImage(image, this.configId);
        this.formGroupEmitter.emit(form);
    }
}
