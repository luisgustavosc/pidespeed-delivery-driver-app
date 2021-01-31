import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from '../API';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AffiliatedCompanyService {
    private user;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.user = this.authService.getCurrentUser();
    }

    public getAll() {
        return this.http.get(`${AUTH_SERVER}/afiliado-delivery/${this.user.empresaDelivery}`, options);
    }

    public getById(companyId) {
        return this.http.get(`${AUTH_SERVER}/afiliado-delivery/list/one/${companyId}`, options);
    }

    public getByField(data) {
        return this.http.post(`${AUTH_SERVER}/search-partner-field`, data, options);
    }

    public create(data) {
        return this.http.post(`${AUTH_SERVER}/afiliado-delivery/`, data, options);
    }

    public update(data) {
        return this.http.put(`${AUTH_SERVER}/afiliado-delivery/`, data, options);
    }

    public deleteById(companyId) {
        return this.http.delete(`${AUTH_SERVER}/afiliado-delivery/${companyId}`, options);
    }
}
