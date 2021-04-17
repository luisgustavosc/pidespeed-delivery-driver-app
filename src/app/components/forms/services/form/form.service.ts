import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { ValidateExistingDataModel } from 'src/app/model/validateExistingData.model';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { CompanyUsersService } from 'src/app/components/users/services/company-users/company-users.service';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    public static readonly AFFILIATED_COMPANY_TYPE: string = 'affiliated_company_form';
    public static readonly DELIVER_FORM_TYPE: string = 'deliver_form';
    public static readonly ADMIN_FORM_TYPE: string = 'admin_form';
    public static readonly IMAGE_CROPPER_TYPE: string = 'image_cropper';
    public static readonly COMPANY_PROFILE_TYPE: string = 'company_profile'

    private emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private spanishLettersPattern = '[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+'
    private textareaPattern = '[a-zA-ZñÑáéíóúÁÉÍÓÚ_.#-\s]*'
    private numericPattern ='[0-9]*';
    private usernamePattern = '[a-z0-9-_.\s]+'

    constructor(private utils: UtilsService) { }

    public getFormType(value: string) {
        let type = null;
        switch (value) {
            case CompanyUsersService.TYPE_DELIVERY:
                type = FormService.DELIVER_FORM_TYPE;
                break;

            case CompanyUsersService.TYPE_COMPANY:
                type = FormService.AFFILIATED_COMPANY_TYPE;
                break;

            case FormService.ADMIN_FORM_TYPE:
                type = FormService.ADMIN_FORM_TYPE;
                break;

            case FormService.IMAGE_CROPPER_TYPE:
                type = FormService.IMAGE_CROPPER_TYPE;
                break;

            case FormService.COMPANY_PROFILE_TYPE:
                type = FormService.COMPANY_PROFILE_TYPE;
                break;

            default:
                type = null
                break;
        }
        return type;
    }

    public isAffiliatedCompanyFormType(type: string): boolean {
        return FormService.AFFILIATED_COMPANY_TYPE === type;
    }

    public isAdminFormType(type: string): boolean {
        return FormService.ADMIN_FORM_TYPE === type;
    }

    public isDeliverFormType(type: string): boolean {
        return FormService.DELIVER_FORM_TYPE === type;
    }

    public isImageCropperType(type: string): boolean {
        return FormService.IMAGE_CROPPER_TYPE === type;
    }

    public isCompanyProfileFormType(type: string): boolean {
        return FormService.COMPANY_PROFILE_TYPE === type;
    }

    public getEmailPattern(): RegExp {
        return this.emailPattern;
    }

    public getSpanishLettersPattern(): string {
        return this.spanishLettersPattern;
    }

    public getTextareaPattern(): string {
        return this.textareaPattern;
    }

    public getNumericPattern(): string {
        return this.numericPattern;
    }

    public getUsernamePattern(): string {
        return this.usernamePattern;
    }

    /**
     *  Data Validation on existing data
     *
     * how to use it:
     *
     * username: ['', [
     *      Validators.required,
     *    ],
     *    this.formService.validateExistingData.bind(this,
     *     {
     *        fieldName: 'telefono',
     *        service: this.companyUsersService,
     *        configId: this.configId,
     *       }
     *    )
     * ]
     *
     */
    public validateExistingData(
        values : ValidateExistingDataModel,
        control:AbstractControl
    ): boolean | null {

        const { fieldName, service, configId } = values;

        const dataToValidate = {
            field: fieldName,
            value: control.value
        };

        return service.getByField(dataToValidate).pipe(
            map((data: any) => {
                if (data) {
                    if (data.id === configId) {
                        return null;
                    }
                    return {
                        isNotAvailable: true
                    };
                }
                // return null for no errors
                return null;
            }),
            catchError(err => of(this.utils.getSwalError()))
        );
    }

    public processImage(
        image: string = null,
        id: string = null,
        folder: string = null,
        update: boolean = false
    ) {
        if (image) {
            const base64Parts = image.split(',');
            const imageMapped = {
                filename: this.getRandomName(),
                filetype: base64Parts[0].split('/')[1].replace(';base64', ''),
                value: base64Parts[1],
                // folder: folder,
                // update: update,
                id
            }

            return imageMapped;
        }

        return id;
    }

    private getRandomName(): string
    {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const random = ('' + Math.random()).substring(2, 8);
        const randomNumber = timestamp + random;

        return randomNumber;
    }
}
