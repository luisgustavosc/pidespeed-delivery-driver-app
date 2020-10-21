import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    private companyFormType = 'company_form';
    private userFormType = 'user_form';
    private repartidorFormType = 'repartidor_form';

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

}
