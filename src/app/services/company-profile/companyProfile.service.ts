import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from '../API';

@Injectable({
    providedIn: 'root'
})
export class CompanyProfileService {

    constructor(private http: HttpClient) { }

    public getById(companyId: string) {
        return this.http.get(`${AUTH_SERVER}/public/one/id/${ companyId }`, options);
    }

    public update(data, companyId) {
        return this.http.put(`${AUTH_SERVER}/empresa-delivery/${ companyId }`, data, options);
    }
}
