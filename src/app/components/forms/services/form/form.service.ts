import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs/operators';
import { ValidateExistingDataModel } from 'src/app/model/validateExistingData.model';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private spanishLettersPattern = '[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+'
    private textareaPattern = '[a-zA-ZñÑáéíóúÁÉÍÓÚ_.#-\s]*'
    private numericPattern ='[0-9]*';
    private usernamePattern = '[a-z0-9-_.\s]+'

    constructor(private utils: UtilsService) { }

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
