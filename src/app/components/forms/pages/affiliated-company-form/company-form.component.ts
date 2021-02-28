import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { AffiliatedCompanyService } from 'src/app/services/affiliated-company/affiliated-company.service';
import { ActionService } from 'src/app/services/action/action.service';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { ImageModel } from 'src/app/model/imageModel';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnInit {
    @Input() public configId: string;
    @Input() public isFormLoading: boolean = false;
    // To export values ​​to a parent component
    @Output() public formGroupEmitter: EventEmitter<FormGroup> = new EventEmitter();

    public formGroup: FormGroup;
    public companyId: string;
    public isDataLoaded: boolean = false;
    public companyImage: ImageModel;
    public imgResultAfterCompress: string;

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
            this.companyImage = company.img;
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
            this.actionService.back();
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
        this.formGroupEmitter.emit(form);
    }
}
