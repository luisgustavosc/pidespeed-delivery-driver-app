import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActionService } from 'src/app/services/action/action.service';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { CompanyProfileService } from 'src/app/services/company-profile/companyProfile.service';
import { LocationService } from 'src/app/services/location/location.service';
import { LocationModel } from 'src/app/model/location.model';
import { MatSelectOptions } from 'src/app/model/matSelectOptions';

@Component({
    selector: 'app-company-profile-form',
    templateUrl: './company-profile-form.component.html',
})
export class CompanyProfileFormComponent implements OnInit {
    @Input() private configId: string;
    @Input() private isFormLoading: boolean = false;
    // To export values ​​to a parent component
    @Output() private formGroupEmitter: EventEmitter<FormGroup> = new EventEmitter();

    private formGroup: FormGroup;
    private isDataLoaded: boolean = false;
    private companyImageUrl: string;
    private imgResultAfterCompress: string;
    public cities : Array<MatSelectOptions> = null;
    public states : Array<MatSelectOptions> = null;
    public citySelected: MatSelectOptions;
    public stateSelected: MatSelectOptions;
    private company = null;

    constructor(
        private fb: FormBuilder,
        private actionService: ActionService,
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
            this.companyImageUrl = company.logo?.url;
            if (this.companyImageUrl) {
                this.removeImageValidators();
            }

            const { nombre, telefono, ciudad, estado } = company;

            this.formGroup.patchValue({
                nombre: nombre,
                telefono: telefono,
                ciudad: { nombre: ciudad.nombre, _id: ciudad._id },
                estado: { nombre: estado.nombre, _id: estado._id },
            });
            this.stateSelected = this.states.find(item => item.value._id === estado._id);
            this.citySelected = this.cities.find(item => item.value._id === ciudad._id);

            this.isDataLoaded = true;
        }, err => {
            this.isDataLoaded = true;
            this.isFormLoading = false;
            this.actionService.back();
        })
    }

    private getCities() {
        this.locationService.getAllCities().subscribe((data: Array<LocationModel>) => {
            this.cities = data.map( ({ nombre, _id  }) => {
                return {
                    title: nombre,
                    value: {
                        nombre: nombre,
                        _id: _id
                    }
                }
            });
        }, err => {
            this.actionService.getSwalError();
        });
    }

    private getStates() {
        this.locationService.getAllStates().subscribe((data: Array<LocationModel>) => {
            this.states = data.map( ({ nombre, _id }) => {
                return {
                    title: nombre,
                    value: {
                        nombre: nombre,
                        _id: _id
                    }
                }
            });
        }, err => {
            this.actionService.getSwalError();
        });
    }


    private removeImageValidators() {
        const imageField = this.formGroup.get('logo');
        imageField.setValidators(null);
        imageField.updateValueAndValidity();
    }

    private getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress = image;
    }

    onSubmit(form: FormGroup, image: string): void {
        form.value.logo = this.formService.processImage(image, this.configId);
        this.formGroupEmitter.emit(form);
    }
}
