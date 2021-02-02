import { Injectable } from '@angular/core';
import { AbstractControl } from "@angular/forms";
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { ActionService } from "src/app/services/action/action.service";

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private companyFormType: string = 'company_form';
    private adminFormType: string = 'admin_form';
    private deliverFormType: string = 'deliver_form';
    private imageCropperType: string = 'image_cropper';
    private emailPattern: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private spanishLettersPattern: string = "[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
    private textareaPattern: string = "[a-zA-ZñÑáéíóúÁÉÍÓÚ_.#-\s]*"
    private numericPattern: string ="[0-9]*";
    private usernamePattern: string = "[a-z0-9-_.\s]+"

    constructor(private actionService: ActionService) { }

    public getCompanyFormType(): string {
        return this.companyFormType;
    }

    public getAdminFormType(): string {
        return this.adminFormType;
    }

    public getDeliverFormType(): string {
        return this.deliverFormType;
    }

    public getImageCropperType(): string {
        return this.imageCropperType;
    }

    public isCompanyFormType(type: string): boolean {
        return this.companyFormType === type;
    }

    public isAdminFormType(type: string): boolean {
        return this.adminFormType === type;
    }

    public isDeliverFormType(type: string): boolean {
        return this.deliverFormType === type;
    }

    public isImageCropperType(type: string): boolean {
        return this.imageCropperType === type;
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
     *  Validation for an existing data.
     *
     * For some reason the parameters of the function do not come
     * in the correct order. the function is declared in this order:
     *
     * this.formService.validateExistingData.bind(this, this.service.getUserByEmail, 'email');
     *  1. this = $control,
     *  2. this.service = $fetchData,
     * '3. 'email' = $fieldName,
     *
     * how to use it:
     *      username: ["", [
     *          Validators.required,
     *      ],
     *        this.formService.validateExistingData.bind(this, this.service.getUserByEmail, 'email');
     *      ]
     *
     * and it is returned in the following order:
     *
     * @param {Function} $fetchData
     * @param {string} fieldName
     * @param {AbstractControl} control
     * @returns {Boolean | Null}
     */
    public validateExistingData($fetchData: Function, $fieldName: string, $control: AbstractControl): boolean | null {
        console.log($fetchData)
        const dataToValidate = {
            field: $fieldName,
            value: $control.value
        };
        return $fetchData(dataToValidate).pipe(
            map((response: any) => {
                if (response.length)
                    return {
                        isNotAvailable: true
                    };
                // Return null for no errors
                return null;
            }),
            catchError(err => of(this.actionService.getSwalError()))
        );
    }

    /**
     *
     * @param {String} image
     * @param {String} folder
     * @param {Boolean} update
     * @param {String|Null} id
     */
    public processImage(image: string = null, id: string = null, folder: string = null, update: boolean = false) {
        if (image) {
            const base64Parts = image.split(',');
            const imageMapped = {
                filename: this.getRandomName(),
                filetype: base64Parts[0].split('/')[1].replace(';base64', ''),
                value: base64Parts[1],
                // folder: folder,
                // update: update,
                id: id
            }

            return imageMapped;
        }

        return id;
    }

    private getRandomName() {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        const random = ("" + Math.random()).substring(2, 8);
        const randomNumber = timestamp + random;
        return randomNumber;
    }
}
