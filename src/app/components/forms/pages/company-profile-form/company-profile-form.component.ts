import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { CompanyProfileService } from 'src/app/components/profile/service/companyProfile.service';
import { LocationService } from 'src/app/services/location/location.service';
import { LocationModel } from 'src/app/model/location.model';
import { MatSelectOptions } from 'src/app/model/matSelectOptions';
import { ImageModel } from 'src/app/model/imageModel';

@Component({
    selector: 'app-company-profile-form',
    templateUrl: './company-profile-form.component.html',
})
export class CompanyProfileFormComponent implements OnInit {
    @Input() public configId: string;
    @Input() public isFormLoading = false;
    // To export values ​​to a parent component
    @Output() public formGroupEmitter: EventEmitter<FormGroup> = new EventEmitter();

    public formGroup: FormGroup;
    public isDataLoaded = false;
    public companyImage: ImageModel;
    public imgResultAfterCompress: string;
    public cities : Array<MatSelectOptions> = null;
    public states : Array<MatSelectOptions> = null;
    public citySelected: MatSelectOptions;
    public stateSelected: MatSelectOptions;

    constructor(
        private fb: FormBuilder,
        private utils: UtilsService,
        private formService: FormService,
        private companyProfileService: CompanyProfileService,
        private locationService: LocationService,
    ) { }

    ngOnInit() {
        this.formGroup = this.fb.group({
            nombre: ['', [
                Validators.required,
            ]],
            telefono: ['', [
                Validators.required,
                Validators.maxLength(60),
            ]],
            ciudad: ['', [
                Validators.required,
            ]],
            estado: ['', [
                Validators.required,
            ]],
            logo: ['', [Validators.required]],
            _id: [this.configId],
        });

        this.getCities();
        this.getStates();
        this.getDeliveryCompany();
    }

    private getDeliveryCompany() {
        this.companyProfileService.getById(this.configId).subscribe((company: any) => {
            this.companyImage = company.logo;
            if (this.companyImage?.url) {
                this.removeImageValidators();
            }

            const { nombre, telefono, ciudad, estado } = company;

            this.formGroup.patchValue({
                nombre,
                telefono,
                ciudad: { nombre: ciudad.nombre, _id: ciudad._id },
                estado: { nombre: estado.nombre, _id: estado._id },
            });
            this.stateSelected = this.states.find(item => item.value._id === estado._id);
            this.citySelected = this.cities.find(item => item.value._id === ciudad._id);

            this.isDataLoaded = true;
        }, err => {
            this.isDataLoaded = true;
            this.isFormLoading = false;
            this.utils.back();
        })
    }

    private getCities() {
        this.locationService.getAllCities().subscribe((data: Array<LocationModel>) => {
            this.cities = data.map( ({ nombre, _id  }) => {
                return {
                    title: nombre,
                    value: {
                        nombre,
                        _id
                    }
                }
            });
        }, err => {
            this.utils.getSwalError();
        });
    }

    private getStates() {
        this.locationService.getAllStates().subscribe((data: Array<LocationModel>) => {
            this.states = data.map( ({ nombre, _id }) => {
                return {
                    title: nombre,
                    value: {
                        nombre,
                        _id
                    }
                }
            });
        }, err => {
            this.utils.getSwalError();
        });
    }


    private removeImageValidators() {
        const imageField = this.formGroup.get('logo');
        imageField.setValidators(null);
        imageField.updateValueAndValidity();
    }

    getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress = image;
    }

    onSubmit(form: FormGroup, image: string): void {
        form.value.logo = this.formService.processImage(image, this.companyImage?._id);
        this.isFormLoading = true;
        this.companyProfileService.update(form.value, this.configId).subscribe(data => {
            this.utils.openSnackBar('Se ha actualizado exitosamente');
            this.isFormLoading = false;
        }, err => {
            this.isFormLoading = false;
            this.utils.getSwalError();
        });
    }
}
