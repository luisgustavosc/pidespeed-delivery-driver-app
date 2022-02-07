import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from 'src/app/services/API';

@Injectable({
    providedIn: 'root'
})
export class CompanyProfileService {

    constructor(private http: HttpClient) { }

    public getById(companyId: string) {
        return this.http.get(`${AUTH_SERVER}/empresa-delivery/public/one/_id/${ companyId }`, options);
    }

    public update(data, companyId: string) {
        return this.http.put(`${AUTH_SERVER}/empresa-delivery/${ companyId }`, data, options);
    }
}
