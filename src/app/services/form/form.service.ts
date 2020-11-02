import { Injectable } from '@angular/core';
import { PatternValidator } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private companyFormType = 'company_form';
    private userFormType = 'user_form';
    private repartidorFormType = 'repartidor_form';
    private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

}
