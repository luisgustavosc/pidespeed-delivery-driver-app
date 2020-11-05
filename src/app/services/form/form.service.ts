import { Injectable } from '@angular/core';
import { AbstractControl } from "@angular/forms";
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, retry } from 'rxjs/operators';
import { ActionService } from "src/app/services/action/action.service";

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private companyFormType = 'company_form';
    private userFormType = 'user_form';
    private repartidorFormType = 'repartidor_form';
    private emailPattern: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private spanishLettersPattern: RegExp = /[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/;
    private numericPattern: RegExp = /[0-9]/;
    private usernamePattern: RegExp = /[a-z0-9-*_@$\s]+/;

    constructor(private actionService: ActionService) { }

    public getCompanyFormType(): string {
        return this.companyFormType;
    }

    public getUserFormType(): string {
        return this.userFormType;
    }

    public getRepartidorFormType(): string {
        return this.repartidorFormType;
    }

    public isCompanyFormType(type: string): boolean {
        return this.companyFormType === type;
    }

    public isUserFormType(type: string): boolean {
        return this.userFormType === type;
    }

    public isRepartidorFormType(type: string): boolean {
        return this.repartidorFormType === type;
    }

    public getEmailPattern(): RegExp {
        return this.emailPattern;
    }

    public getSpanishLettersPattern(): RegExp {
        return this.spanishLettersPattern;
    }

    public getNumericPattern(): RegExp {
        return this.numericPattern;
    }

    public getUsernamePattern(): RegExp {
        return this.usernamePattern;
    }

    /**
     *  Validacion para mostrar un error por un dato ya existente.
     *
     * Por alguna razon los parametros de la funcion no vienen
     * en el orden correcto. la funcion se declara en este order:
     *
     * this.formService.validateExistingData.bind(this, this.service.getUserByEmail, 'email');
     *  1. this = $control,
     *  2. this.service = $fetchData,
     * '3. 'email' = $fieldName,
     *
     * ej:
     *      username: ["", [
     *          Validators.required,
     *      ],
     *        this.formService.validateExistingData.bind(this, this.service.getUserByEmail, 'email');
     *      ]
     *
     * y se retorna en el orden siguiente:
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
            catchError(err => of(this.actionService.getErrorSwal()))
        );
    }
}
