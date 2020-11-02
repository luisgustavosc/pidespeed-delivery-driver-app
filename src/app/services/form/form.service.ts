import { Injectable } from '@angular/core';
import { PatternValidator } from '@angular/forms';

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

    constructor() { }

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
}
